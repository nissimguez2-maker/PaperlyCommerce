import { getSupabaseAdmin } from './supabase';

export interface OrderInput {
  id: string;
  locale: string;
  total: number;
  currency: 'ILS';
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  items: Array<{ productSlug: string; variantId: string; name: string; qty: number; price: number }>;
  customer?: { fullName?: string; email?: string; phone?: string };
  gatewayReference?: string;
}

/**
 * Persist an order. When Supabase is configured, write to the `orders` table;
 * otherwise log to the server console so the flow is still observable in dev.
 */
export async function saveOrder(order: OrderInput): Promise<void> {
  const admin = getSupabaseAdmin();
  if (!admin) {
    console.info('[orders] Supabase not configured — order not persisted:', order.id, order.status);
    return;
  }
  const { error } = await admin.from('orders').upsert(
    {
      id: order.id,
      locale: order.locale,
      total: order.total,
      currency: order.currency,
      status: order.status,
      items: order.items,
      customer: order.customer ?? null,
      gateway_reference: order.gatewayReference ?? null,
    },
    { onConflict: 'id' },
  );
  if (error) console.error('[orders] failed to save order', order.id, error.message);
}

export async function updateOrderStatus(
  id: string,
  status: OrderInput['status'],
  gatewayReference?: string,
): Promise<void> {
  const admin = getSupabaseAdmin();
  if (!admin) {
    console.info('[orders] Supabase not configured — status update skipped:', id, status);
    return;
  }
  const { error } = await admin
    .from('orders')
    .update({ status, gateway_reference: gatewayReference ?? null, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) console.error('[orders] failed to update order', id, error.message);
}
