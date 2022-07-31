import { IHostel } from '../interface/IHostel'
import { IRoomTenant } from '../interface/IRoomTenant'
import { ODataCaller } from '../utils/ODataCaller'
const { createBuilder, get } = ODataCaller
import { RestCaller } from '../utils/RestCaller'

const countRooms = async (hostelId: string) => {
    const builder = createBuilder<IHostel>()
        .filter('id', (e) => e.equals(hostelId))
        .select('rooms')
        .expand('rooms', (room) => room.select('id', 'status'))

    const result = await get('Hostels/', builder)
    console.log('getRoomOfHostel: ', result?.[0].rooms)
    return result?.[0].rooms
}

const getRevenue = async (hostelId = '') => {
    const result = await RestCaller.get(`Hostels/${hostelId}/revenue`)
    console.log('removeTenantFromRoom: ', result)
    return result
}

const countTenants = async (hostelId: string) => {
    const builder = createBuilder<IRoomTenant>()
        .select('id', 'tenant', 'room')
        .expand('tenant', (tenant) => tenant.select('id'))
        .expand('room', (room) => room.select('hostelId', 'roomName'))

    const result: IRoomTenant[] = await get('RoomTenants', builder)
    console.log(
        'getAllTenants: ',
        result.filter((roomTenant) => roomTenant.room.hostelId === hostelId)
    )
    return result.filter((roomTenant) => roomTenant.room.hostelId === hostelId)
}

export { countRooms, getRevenue, countTenants }
