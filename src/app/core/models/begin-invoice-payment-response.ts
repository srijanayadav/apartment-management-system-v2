import { PaymentOrderMeta } from "./payment-order-meta";

export interface BeginInvoicePaymentResponse {
    order_id:string,
    payment_session_id:string,
    mode:string,
    order_meta:PaymentOrderMeta
}
