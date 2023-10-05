export interface UpsertRental {
    rent_amount?:number,
    maintenance_amount?:number,
    deposit_amount?:number,
    occupied_date?:Date,
    vacant_date?:Date,
    agreement_date?:Date,
    agreement_start_date?:Date,
    agreement_end_date?:Date,
    unit_id?:number,
    tenant_id?:number,
    rent_status_id?:number,
    is_online_agreement?:boolean

}
