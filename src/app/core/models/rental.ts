import { RentalStatus } from "./rental-status";
import { UnitInfo } from "./unit-info";
import { UserDetail } from "./user-detail";

export interface Rental {
    id:number,
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
    status?:RentalStatus,
    is_online_agreement?:boolean,
    is_active?:boolean,
    created_at?:Date,
    updated_at?:Date,
    unit_info?:UnitInfo,
    tenant?:UserDetail,
    owner?:UserDetail
}
