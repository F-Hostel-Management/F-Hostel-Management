import { IHostel } from '../interface/IHostel'
import { ODataCaller } from '../utils/ODataCaller'

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

export { getListHostel, getHostelById }
