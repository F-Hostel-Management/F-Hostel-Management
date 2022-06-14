import { IHostel } from '../interface/IHostel'
import { IRoom } from '../interface/IRoom'
import { ODataCaller } from '../utils/ODataCaller'
import { RestCaller } from '../utils/RestCaller'
const { createBuilder, get } = ODataCaller

const getListHostel = async () => {
    const builder = createBuilder<IHostel>().select(
        'id',
        'address',
        'name',
        'numOfRooms',
        'imgPath',
        'ownerId'
    )
    const result = await get('Hostels', builder)
    console.log('getListHostel: ', result)
    return result
}

const getHostelById = async (hostelId = '') => {
    const builder = ODataCaller.createBuilder<IHostel>()
        .filter('id', (e) => e.equals(hostelId))
        .select('id', 'address', 'name', 'numOfRooms', 'imgPath', 'ownerId')
    const result = await get('Hostels/', builder)
    console.log('getHostelById: ', result?.[0])
    return result?.[0]
}

const getRoomOfHostel = async (hostelId: string) => {
    const builder = createBuilder<IHostel>()
        .filter('id', (e) => e.equals(hostelId))
        .select('rooms')
        .expand('rooms', (room) =>
            room.select(
                'id',
                'roomName',
                'numOfWindows',
                'numOfDoors',
                'numOfBedRooms',
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
    const result = await get('Hostels/', builder)
    console.log('getRoomOfHostel: ', result?.[0].rooms)
    return result?.[0].rooms
}

const getOwnerOfHostel = async (hostelId = '') => {
    const builder = createBuilder<IHostel>()
        .filter('id', (e) => e.equals(hostelId))
        .select('owner')
        .expand('owner', (owner) => owner.select())
    const result = await get('Hostels', builder)
    console.log('getRoomOfHostel: ', result?.[0].owner)
    return result?.[0].owner
}

const createHostel = async (data = {}) => {
    return await RestCaller.post('Hostels/create-hostel', data)
}

const uploadImage = async (data: FormData) => {
    return await RestCaller.upload('Hostels/upload-hostel-image', data)
}

const getRoomNamesByHostelId = async (hostelId: string): Promise<IRoom[]> => {
    const builder = createBuilder<IHostel>()
        .filter('id', (e) => e.equals(hostelId))
        .expand('rooms', (q) => q.select('id', 'roomName'))
    const result = await get('Hostels', builder, { error: { show: false } })
    const { rooms } = result[0]
    return rooms
}
export {
    getListHostel,
    getHostelById,
    createHostel,
    uploadImage,
    getRoomOfHostel,
    getOwnerOfHostel,
    getRoomNamesByHostelId,
}
