export interface UpsertInvoice {
    invoice_number:string,
    total_amount:number,
    purpose:string,
    description:string
    status:string
    payee_id?:number,
    created_by_id?:number
    is_active?:boolean|null,
}
