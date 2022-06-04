import { IHostel } from '../interface/IHostel'
import { ODataCaller } from '../utils/ODataCaller'

const { createBuilder, get } = ODataCaller

export const getListHostel = async () => {
    const builder = createBuilder<IHostel>().select(
        'id',
        'address',
        'name',
        'numOfRooms',
        'imgPath'
    )
    const hostels = await get('./Hostels/get-hostels-by-owner', builder)
    return hostels
}
