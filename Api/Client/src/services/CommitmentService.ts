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
            'status',
            'joiningCode',
            'paymentDate',
            'price'
        )
        .expand('manager', (e) => e.select('id', 'name'))
        .expand('owner', (e) => e.select('id', 'name'))
        .expand('room', (e) => e.select())
        .expand('images', (q) => q.select('id', 'imgUrl'))
        .expand('hostel', (e) => e.select())
        .paginate(pageSize, page)
    const result = await get(`Hostels/${hostelId}/get-all-commitments`, builder)
    console.log('getAllCommitmentOfHostel: ', result)
    return result
}

const getCommitmentDetails = async (commitmentId = '') => {
    const builder = createBuilder<ICommitment>()
        .filter('id', (e) => e.equals(commitmentId))
        .select(
            'id',
            'commitmentCode',
            'createdDate',
            'startDate',
            'endDate',
            'status',
            'joiningCode',
            'paymentDate',
            'price'
        )
        .expand('manager', (e) => e.select('id', 'name'))
        .expand('owner', (e) => e.select('id', 'name'))
        .expand('room', (e) => e.select())
        .expand('images', (q) => q.select('id', 'imgUrl'))
        .expand('hostel', (e) => e.select())
    const result = await get('Hostels', builder)
    console.log('getTenantOfCommitment: ', result?.[0])
    return result?.[0]
}

// REST Caller
const createCommitment = async (data = {}) => {
    const result = await RestCaller.post('Commitments', data, {
        loading: {
            show: true,
            message: 'Progressing...',
        },
        success: {
            show: true,
            message: 'Commitment is created.',
        },
        error: {
            show: true,
            message: 'Failed! Please, try again.',
        },
    })
    console.log('createCommitment: ', result)
    return result
}

const uploadCommitmentImages = async (id = '', data: FormData) => {
    return await RestCaller.upload(
        `Commitments/${id}/upload-commitment-images`,
        data
    )
}

const deleteCommitmentImage = async (hostelId = '', imgId = '') => {
    return await RestCaller.delete(
        `Commitments/${hostelId}/delete-commitment-image/${imgId}`
    )
}

const updateCommitment = async (id = '', data = {}) => {
    const result = await RestCaller.patch(`Commitments/${id}`, data, {
        loading: {
            show: true,
            message: 'Progressing...',
        },
        success: {
            show: true,
            message: 'Commitment is updated.',
        },
        error: {
            show: true,
            message: 'Failed! Please, try again.',
        },
    })
    console.log('updateCommitment: ', result)
    return result
}

const approveCommitment = async (data = {}) => {
    const response = await RestCaller.patch(
        'Commitments/owner-approved-commitment/status',
        data,
        {
            loading: {
                show: true,
                message: 'Progressing...',
            },
            success: {
                show: true,
                message: 'Commitment is approved.',
            },
            error: {
                show: true,
                message: 'Failed! Please, try again.',
            },
        }
    )
    console.log('approveCommitment: ', response)
    return response
}

const activateCommitment = async (data = {}) => {
    const response = await RestCaller.patch(`Commitments/get-into-room`, data, {
        loading: {
            show: true,
            message: 'Progressing...',
        },
        success: {
            show: true,
            message: 'You have already joined room.',
        },
        error: {
            show: true,
            message: 'Failed! Please, try again.',
        },
    })
    console.log('approveCommitment: ', response)
    return response
}

const getJoiningCode = async (id: string) => {
    const response = await RestCaller.post(
        `Commitments/${id}/create-joining-code`
    )
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

// [Role.TENANT]
const validateJoiningCode = async (data = {}) => {
    const response = await RestCaller.post(
        `Commitments/validate-joiningCode`,
        data
    )
    console.log('validateJoiningCode: ', response)
    return response
}
export {
    getAllCommitmentOfHostel,
    getNumberCommitmentOfHostel,
    getCommitmentDetails,
    createCommitment,
    uploadCommitmentImages,
    deleteCommitmentImage,
    updateCommitment,
    approveCommitment,
    getJoiningCode,
    activateCommitment,
    getCommitmentFromCode,
    validateJoiningCode,
}
