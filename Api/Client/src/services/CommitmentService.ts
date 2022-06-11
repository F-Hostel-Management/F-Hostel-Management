import { RestCaller } from '../utils/RestCaller'
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
            'paymentDate',
            'price'
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

const getCommitmentDetails = async (commitmentId = '') => {
    const builder = createBuilder<ICommitment>()
        .filter('id', (e) => e.equals(commitmentId))
        .select('owner', 'tenant', 'room', 'hostel')
        .expand('owner', (owner) => owner.select())
        .expand('tenant', (tenant) => tenant.select())
        .expand('room', (room) => room.select())
        .expand('hostel', (hostel) => hostel.select())
    const result = await get('Hostels', builder)
    console.log('getTenantOfCommitment: ', result?.[0])
    return result?.[0]
}

const getTenantOfCommitment = async (commitmentId = '') => {
    const builder = createBuilder<ICommitment>()
        .filter('id', (e) => e.equals(commitmentId))
        .select('tenant')
        .expand('tenant', (tenant) => tenant.select())
    const result = await get('Hostels', builder)
    console.log('getTenantOfCommitment: ', result?.[0].tenant)
    return result?.[0].tenant
}

// REST Caller
const createCommitment = async (data = {}) => {
    const result = await RestCaller.post('Commitments', data)
    console.log('createCommitment: ', result)
    return result
}

const updateCommitment = async (id = '', data = {}) => {
    const result = await RestCaller.patch(`Commitments/${id}`, data)
    console.log('updateCommitment: ', result)
    return result
}

const approveCommitment = async (data = {}) => {
    const response = await RestCaller.patch(
        'Commitments/owner-approved-commitment/status',
        data
    )
    console.log('approveCommitment: ', response)
    return response
}

const activateCommitment = async (data = {}) => {
    const response = await RestCaller.patch(
        'Commitments/tenant-activate-commitment/status',
        data
    )
    console.log('approveCommitment: ', response)
    return response
}

const getJoiningCode = async (data = {}) => {
    const response = await RestCaller.post('Commitments/joiningCode', data)
    console.log('getJoiningCode: ', response)
    return response
}

const getCommitmentFromCode = async (code: string) => {
    const response = await RestCaller.get(
        `Commitments/get-commitment-by-joiningCode/${code}`
    )
    console.log('getCommitmentFromCode: ', response)
    return response
}

export {
    getAllCommitmentOfHostel,
    getNumberCommitmentOfHostel,
    getCommitmentDetails,
    createCommitment,
    updateCommitment,
    approveCommitment,
    getJoiningCode,
    activateCommitment,
    getCommitmentFromCode,
}
