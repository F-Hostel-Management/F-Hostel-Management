import { IHostel } from '../interface/IHostel'
import { ODataCaller } from '../utils/ODataCaller'
import { RestCaller } from '../utils/RestCaller'
const { createBuilder, get } = ODataCaller

const getListHostel = async () => {
    const builder = createBuilder<IHostel>().select(
        'id',
        'address',
        'name',
        'numOfRooms',
        'imgPath'
    )
    return await get('./Hostels/get-hostels-by-owner', builder)
}

const getHostelById = async (hostelId = '') => {
    const builder = createBuilder<IHostel>().select(
        'id',
        'address',
        'name',
        'numOfRooms',
        'imgPath'
    )
    return await get(`./Hostels/${hostelId}`, builder)
}

const createHostel = async (data = {}) => {
    return await RestCaller.post('Hostels/create-hostel', data)
}

const uploadImage = async (data = {}) => {
    return await RestCaller.post('Hostels/upload-hostel-image', data)
}
export { getListHostel, getHostelById, createHostel, uploadImage }
