export interface UserDetail {
    id:number,
    email:string,
    first_name:string,
    last_name:string,
    address:string,
    contact_number:string
    user_type_id?:number
    is_active?:boolean
}
