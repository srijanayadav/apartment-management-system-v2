export interface UnitInfo {
    id:number,
    title:string,
    unit_number:string,
    floor_number:number,
    bedroom:number,
    bathroom:number,
    balcony:number,
    description:string,
    carpet_area:number,
    parking_slot:string,
    unit_type_id:number,
    block_id:number,
    owner_id?:number,
    is_active?:boolean

}
