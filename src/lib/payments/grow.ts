/**
 * Grow / Meshulam — Israeli hosted checkout (the "Light Server" API).
 *
 * We use the gateway's HOSTED payment page (PCI-light): we create a payment
 * process, then redirect the customer to the returned URL. The hosted page
 * offers credit cards, Bit, and installments (תשלומים) per the merchant's
 * account configuration.
 *
 * All credentials come from env vars. With placeholder creds the gateway is
 * treated as NOT configured and checkout falls back to a clear placeholder
 * flow, so the site stays deployable until the client adds real keys.
 *
 * This module is intentionally the only place that knows the gateway's shape —
 * swapping to PayPlus / Tranzila / Cardcom means editing only this file.
 */

export interface CheckoutCustomer {
  fullName?: string;
  email?: string;
  phone?: string;
}

export interface CheckoutLineInput {
  name: string;
  quantity: number;
  price: number; // whole shekels
}

export interface CreateCheckoutInput {
  amount: number; // total, whole shekels
  description: string;
  lines: CheckoutLineInput[];
  customer?: CheckoutCustomer;
  orderId: string;
  maxInstallments: number;
  successUrl: string;
  cancelUrl: string;
}

export type CheckoutResult =
  | { ok: true; url: string; processId?: string }
  | { ok: false; configured: false }
  | { ok: false; configured: true; error: string };

export function isGrowConfigured(): boolean {
  const { GROW_API_BASE, GROW_USER_ID, GROW_PAGE_CODE, GROW_API_KEY } = process.env;
  return Boolean(
    GROW_API_BASE &&
      GROW_USER_ID &&
      GROW_PAGE_CODE &&
      GROW_API_KEY &&
      !GROW_USER_ID.startsWith('your-') &&
      !GROW_PAGE_CODE.startsWith('your-') &&
      !GROW_API_KEY.startsWith('your-'),
  );
}

export async function createCheckout(input: CreateCheckoutInput): Promise<CheckoutResult> {
  if (!isGrowConfigured()) {
    return { ok: false, configured: false };
  }

  const base = process.env.GROW_API_BASE!.replace(/\/$/, '');
  const params = new URLSearchParams();
  params.set('pageCode', process.env.GROW_PAGE_CODE!);
  params.set('userId', process.env.GROW_USER_ID!);
  params.set('apiKey', process.env.GROW_API_KEY!);
  params.set('sum', String(input.amount));
  params.set('description', input.description);
  params.set('chargeType', '1'); // immediate charge
  // Installments (תשלומים): allow 1..max on the hosted page.
  params.set('paymentNum', '1');
  params.set('maxPaymentNum', String(Math.max(1, input.maxInstallments)));
  params.set('successUrl', input.successUrl);
  params.set('cancelUrl', input.cancelUrl);
  // Our order id round-trips back to the webhook for reconciliation.
  params.set('cField1', input.orderId);
  if (input.customer?.fullName) params.set('pageField[fullName]', input.customer.fullName);
  if (input.customer?.phone) params.set('pageField[phone]', input.customer.phone);
  if (input.customer?.email) params.set('pageField[email]', input.customer.email);

  try {
    const res = await fetch(`${base}/createPaymentProcess`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      cache: 'no-store',
    });

    if (!res.ok) {
      return { ok: false, configured: true, error: `Gateway HTTP ${res.status}` };
    }

    const json: GrowResponse = await res.json();
    if (json.status !== 1 || !json.data?.url) {
      return { ok: false, configured: true, error: json.err?.message ?? 'Gateway rejected the request' };
    }

    return { ok: true, url: json.data.url, processId: json.data.processId };
  } catch (err) {
    return { ok: false, configured: true, error: err instanceof Error ? err.message : 'Network error' };
  }
}

interface GrowResponse {
  status: number;
  data?: { url?: string; processId?: string; processToken?: string };
  err?: { message?: string };
}

/**
 * Validate a webhook callback. Grow posts transaction data back server-to-server.
 * We require the shared secret to match before trusting the payload.
 */
export function verifyWebhook(payload: Record<string, string>): boolean {
  const secret = process.env.GROW_WEBHOOK_SECRET;
  if (!secret || secret === 'change-me') return false;
  // Grow echoes a configurable custom field / token; require it to match.
  return payload.secret === secret || payload.webhookSecret === secret;
}
