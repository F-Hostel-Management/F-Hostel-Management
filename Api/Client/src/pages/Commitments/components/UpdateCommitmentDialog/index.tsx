import React, { FC, useState } from 'react'
import DialogCustom from '../../../../components/DialogCustom'
import CommitmentStepper from '../CommitmentStepper'
import { useForm } from '../../../../hooks/useForm'
import {
    ICommitment,
    ICommitmentValues,
} from '../../../../interface/ICommitment'

import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHook'
import {
    getJoiningCode,
    updateCommitment,
    uploadCommitmentImages,
} from '../../../../services/CommitmentService'
import { getItem } from '../../../../utils/LocalStorageUtils'
import { fetchCommitments } from '../../../../slices/commitmentSlice'
interface IUpdateCommitmentDialogProps {
    commitment: ICommitment
    openDialog: boolean
    handleCloseDialog: () => void
}

const UpdateCommitmentDialog: FC<IUpdateCommitmentDialogProps> = ({
    commitment,
    openDialog,
    handleCloseDialog,
}) => {
    const dispatch = useAppDispatch()
    const page = useAppSelector(({ table }) => table.page)
    const pageSize = useAppSelector(({ table }) => table.pageSize)

    const initialValues: ICommitmentValues = {
        startDate: moment(new Date(commitment.startDate || ''))
            .format('YYYY-MM-DD')
            .toString(),
        endDate: moment(new Date(commitment.endDate || ''))
            .format('YYYY-MM-DD')
            .toString(),
        roomId: commitment.roomId || '',
        price: commitment.price || 0,
        paymentDate: commitment.paymentDate || 0,
        images: commitment?.images?.map(() => null),
        deletedImg: [],
    }

    const { values, setValues, handleInputChange, resetForm } =
        useForm<ICommitmentValues>(initialValues)
    const [sixDigitsCode, setSixDigitsCode] = useState<any>(null)

    // create commitment
    const handleSubmit = async () => {
        // append list image to form data
        const formData = new FormData()
        if (values.images?.length) {
            for (let file of values?.images) {
                if (file) {
                    formData.append('ImgsFormFiles', file)
                }
            }
        }
        // create commitment and get commitmentId
        let resCreate = await updateCommitment(commitment.id, values)
        if (!resCreate.isError) {
            formData.append('HostelId', commitment.id || '')
            // if imageList is not empty, system will upload list image
            if (values.images?.length) {
                const resUpload = await uploadCommitmentImages(
                    commitment.id,
                    formData
                )
            }

            // Delete image

            // Reload list commitment
            const hostelId = getItem('currentHostelId')
            dispatch(fetchCommitments({ hostelId, pageSize, page }))

            // get code to create QR Code
            const resCode = await getJoiningCode(commitment.id || '')
            if (!resCode.isError) {
                setSixDigitsCode(resCode.result.sixDigitsCode)
                return true
            }
        }
        return false
    }

    return (
        <DialogCustom
            title="Update Commitment"
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
        >
            <CommitmentStepper
                handleCloseDialog={handleCloseDialog}
                values={values}
                setValues={setValues}
                handleInputChange={handleInputChange}
                resetForm={resetForm}
                handleSubmit={handleSubmit}
                commitment={{ ...commitment, sixDigitsCode }}
            />
        </DialogCustom>
    )
}

export default UpdateCommitmentDialog
