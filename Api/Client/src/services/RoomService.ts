import { IHostel } from '../interface/IHostel'
import { IRoom } from '../interface/IRoom'
import { ODataCaller } from '../utils/ODataCaller'
const { createBuilder, get } = ODataCaller

const getAllRoomOfTenant = async () => {
    const builder = createBuilder<IRoom>().select(
        'id',
        'roomName',
        'numOfWindows',
        'numOfDoors',
        'numOfBathRooms',
        'numOfWCs',
        'area',
        'length',
        'width',
        'height',
        'hostelId',
        'status',
        'maximumPeople'
    )
    const result = await get('Rooms', builder)
    console.log('getAllRoomOfTenant: ', result)
    return result
}

const getAllRoomOfHostel = async (
    hostelId: string,
    pageSize: number,
    page: number
) => {
    const builder = createBuilder<IHostel>()
        .filter('id', (e) => e.equals(hostelId))
        .select('rooms')
        .expand('rooms', (room) =>
            room.select(
                'id',
                'roomName',
                'roomTypeId',
                'numOfWindows',
                'numOfDoors',
                'numOfBathRooms',
                'numOfWCs',
                'area',
                'length',
                'width',
                'height',
                'status',
                'maximumPeople'
            )
        )
        .paginate(pageSize, page)
    const result = await get('Hostels/', builder)
    console.log('getRoomOfHostel: ', result?.[0].rooms)
    return result?.[0].rooms
}

const countRoomOfHostel = async (hostelId: string) => {
    const builder = createBuilder<IHostel>()
        .filter('id', (e) => e.equals(hostelId))
        .select('rooms')
        .expand('rooms', (room) => room.select('id'))
        .count()
    const result = await get('Hostels/', builder)
    console.log('countRoomOfHostel: ', result[0].rooms.length)
    return result[0].rooms.length
}

const getRoomById = async (roomId = '') => {
    const builder = createBuilder<IRoom>()
        .filter('id', (e) => e.equals(roomId))
        .select()
    const result = await get('Rooms', builder)
    console.log('getRoomById: ', result[0].hostel)
    return result[0]
}

const getHostelOfRoom = async (roomId = '') => {
    const builder = createBuilder<IRoom>()
        .filter('id', (e) => e.equals(roomId))
        .select('hostel')
        .expand('hostel', (hostel) =>
            hostel.select(
                'id',
                'address',
                'name',
                'numOfRooms',
                'imgPath',
                'ownerId'
            )
        )
    const result = await get('Rooms', builder)
    console.log('getHostelOfRoom: ', result[0].hostel)
    return result[0].hostel
}

export {
    getAllRoomOfTenant,
    getHostelOfRoom,
    getRoomById,
    getAllRoomOfHostel,
    countRoomOfHostel,
}
