import { RestCaller } from './../utils/RestCaller'
import { ICommitment } from '../interface/ICommitment'
import { ODataCaller } from '../utils/ODataCaller'

const { createBuilder, get } = ODataCaller

const getNumberCommitmentOfHostel = async (hostelId: string) => {
    const builder = createBuilder<ICommitment>().select('id')
    const result = await get(`Hostels/${hostelId}/get-all-commitments`, builder)
    console.log('getNumberCommitmentOfHostel: ', result)
    return result?.length
}

const getAllCommitmentOfHostel = async (
    hostelId: string,
    pageSize: number,
    page: number
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
            'joiningCode',
            'isDeleted'
        )
        .expand('manager', (e) => e.select('id', 'name'))
        .expand('tenant', (e) => e.select('id', 'name'))
        .expand('owner', (e) => e.select('id', 'name'))
        .expand('room', (e) => e.select('id', 'roomName'))
        .paginate(pageSize, page)
    const result = await get(`Hostels/${hostelId}/get-all-commitments`, builder)
    console.log('getAllCommitmentOfHostel: ', result)
    return result
}

const createCommitment = async (data = {}) => {
    const result = await RestCaller.post('Commitments', data)
    console.log('createCommitment: ', result)
    return result
}

const approveCommitment = async (data = {}) => {
    const response = await RestCaller.patch(
        'Commitments/owner-approved-commitment/status',
        data
    )
    console.log('approveCommitment: ', response.result)
    return response
}

const getJoiningCode = async (data = {}) => {
    const result = await RestCaller.post('Commitments/joiningCode', data)
    console.log('getJoiningCode: ', result)
    return result
}

export {
    getAllCommitmentOfHostel,
    getNumberCommitmentOfHostel,
    createCommitment,
    approveCommitment,
    getJoiningCode,
}
