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

export { getAllRoomOfTenant, getHostelOfRoom, getRoomById }
