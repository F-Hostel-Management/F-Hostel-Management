import { ICommitment } from '../interface/ICommitment'
import { ODataCaller } from '../utils/ODataCaller'

const { createBuilder, get } = ODataCaller

const getAllCommitmentOfHostel = async (
    hostelId = '',
    pageSize = 0,
    page = 0
) => {
    const builder = createBuilder<ICommitment>()
        .select(
            'id',
            'commitmentCode',
            'createdDate',
            'startDate',
            'endDate',
            'dateOverdue',
            'compensation',
            'status',
            'commitmentScaffoldingId',
            'managerId',
            'tenantId',
            'ownerId',
            'roomId',
            'joiningCode',
            'isDeleted'
        )
        .paginate(pageSize, page)
    return await get(
        `./Commitments/get-commitments-by-hostel/${hostelId}`,
        builder
    )
}

export { getAllCommitmentOfHostel }
