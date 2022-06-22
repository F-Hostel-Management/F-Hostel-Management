import { IManagement } from '../interface/IManager'
import { getItem } from '../utils/LocalStorageUtils'
import { ODataCaller } from '../utils/ODataCaller'
const { createBuilder, get } = ODataCaller
export const getHostelAssignmentList = async (
    currentPageSize: number,
    currentPage: number
): Promise<IManagement[]> => {
    const currentHostelId = getItem('currentHostelId')
    // const currentRoomId = getItem('currentRoomId')

    const builder = createBuilder<IManagement>()
        .select('id')
        .expand('manager')
        .filter('hostelId', (hostelId) => hostelId.equals(currentHostelId))
        .paginate(currentPageSize, currentPage)
    const result: IManagement[] = await get('HostelManagements', builder)

    return result
}
