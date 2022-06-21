import { IRoomTenant } from '../interface/IRoomTenant'
import { ODataCaller } from '../utils/ODataCaller'
const { createBuilder, get } = ODataCaller

const getAllTenants = async (
    hostelId: string,
    pageSize: number,
    page: number
) => {
    const builder = createBuilder<IRoomTenant>()
        .select('id', 'tenant', 'room')
        .expand('tenant', (tenant) => tenant.select())
        .expand('room', (room) => room.select('hostelId', 'roomName'))
        .paginate(pageSize, page)

    const result: IRoomTenant[] = await get('RoomTenants', builder)
    console.log(
        'getAllTenants: ',
        result.filter((roomTenant) => roomTenant.room.hostelId === hostelId)
    )
    return result.filter((roomTenant) => roomTenant.room.hostelId === hostelId)
}

const countTenantsOfHostel = async (hostelId: string) => {
    const builder = createBuilder<IRoomTenant>()
        .select('id', 'tenant', 'room')
        .expand('tenant', (tenant) => tenant.select())
        .expand('room', (room) => room.select('hostelId', 'roomName'))

    const result = await get('RoomTenants', builder)

    return result.filter(
        (roomTenant: IRoomTenant) => roomTenant.room.hostelId === hostelId
    ).length
}

export { getAllTenants, countTenantsOfHostel }
