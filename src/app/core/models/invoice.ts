import { UserDetail } from "./user-detail"

export interface Invoice {
    id:number,
    invoice_number:string,
    total_amount:number,
    purpose:string,
    description:string
    status:string
    payee_id?:number,
    created_by_id?:number
    is_active?:boolean,
    created_at?:Date
    updated_at?:Date
    payee?:UserDetail

}
