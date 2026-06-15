import { NextResponse } from 'next/server';
import { verifyWebhook } from '@/lib/payments/grow';
import { updateOrderStatus } from '@/lib/orders';

export const runtime = 'nodejs';

/**
 * Server-to-server callback from Grow / Meshulam after a payment attempt.
 * Accepts form-encoded or JSON. We reconcile by our order id (echoed in cField1)
 * and only trust the payload once the shared secret matches.
 */
export async function POST(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';
  let payload: Record<string, string> = {};

  try {
    if (contentType.includes('application/json')) {
      payload = flatten(await request.json());
    } else {
      const form = await request.formData();
      for (const [k, v] of form.entries()) payload[k] = String(v);
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'Unreadable payload' }, { status: 400 });
  }

  if (!verifyWebhook(payload)) {
    return NextResponse.json({ ok: false, error: 'Unverified' }, { status: 401 });
  }

  const orderId = payload['cField1'] ?? payload['data[cField1]'] ?? payload['orderId'];
  if (!orderId) {
    return NextResponse.json({ ok: false, error: 'Missing order reference' }, { status: 400 });
  }

  const statusCode = payload['statusCode'] ?? payload['data[statusCode]'] ?? payload['status'];
  const gatewayRef =
    payload['transactionId'] ?? payload['data[transactionId]'] ?? payload['data[asmachta]'];

  // Grow signals success with statusCode "2" (approved) on the Light API.
  const status = statusCode === '2' || statusCode === '1' ? 'paid' : 'failed';
  await updateOrderStatus(orderId, status, gatewayRef);

  return NextResponse.json({ ok: true });
}

/** Flatten a nested JSON webhook body into dotted/bracketed string keys. */
function flatten(obj: unknown, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      const key = prefix ? `${prefix}[${k}]` : k;
      if (v && typeof v === 'object') Object.assign(out, flatten(v, key));
      else out[key] = String(v);
    }
  }
  return out;
}
