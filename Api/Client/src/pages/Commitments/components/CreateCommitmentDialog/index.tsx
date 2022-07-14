import React, { FC, useState } from 'react'
import DialogCustom from '../../../../components/DialogCustom'
import CommitmentStepper from '../CommitmentStepper'
import { useForm } from '../../../../hooks/useForm'
import {
    ICommitment,
    ICommitmentValues,
} from '../../../../interface/ICommitment'
import {
    createCommitment,
    getJoiningCode,
    uploadCommitmentImages,
} from '../../../../services/CommitmentService'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHook'
import { getItem } from '../../../../utils/LocalStorageUtils'
import { fetchCommitments } from '../../../../slices/commitmentSlice'
import { createInvoice } from '../../../../services/InvoiceService'
interface ICreateCommitmentDialogProps {
    openDialog: boolean
    handleCloseDialog: () => void
}

const CreateCommitmentDialog: FC<ICreateCommitmentDialogProps> = ({
    openDialog,
    handleCloseDialog,
}) => {
    const dispatch = useAppDispatch()
    const page = useAppSelector(({ table }) => table.page)
    const pageSize = useAppSelector(({ table }) => table.pageSize)

    const initialValues: ICommitmentValues = {
        startDate: '',
        endDate: '',
        roomId: '',
        price: 0,
        paymentDate: 1,
        images: [],
        electric: 0,
        water: 0,
    }

    const [commitment, setCommitment] = useState<ICommitment>()
    const { values, setValues, handleInputChange, resetForm } =
        useForm<ICommitmentValues>(initialValues)

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
        let resCreate = await createCommitment(values)
        if (!resCreate.isError) {
            // initial electric and water
            createInvoice({
                roomId: values.roomId,
                invoiceType: 'Electric',
                content: `initial electric of Commitment ${resCreate.result}`,
                dueDate: new Date(),
                price: 0,
                quantity: values.electric,
                unitPrice: 0,
            })
            createInvoice({
                roomId: values.roomId,
                invoiceType: 'Water',
                content: `initial electric of Commitment ${resCreate.result}`,
                dueDate: new Date(),
                price: 0,
                quantity: values.water,
                unitPrice: 0,
            })

            formData.append('HostelId', resCreate.result)
            // if imageList is not empty, system will upload list image
            if (values.images?.length) {
                const resUpload = await uploadCommitmentImages(
                    resCreate.result,
                    formData
                )
                if (resUpload.isError) return false
            }

            // reload list commitment
            const hostelId = getItem('currentHostelId')
            dispatch(fetchCommitments({ hostelId, pageSize, page }))

            // get code to create QR Code
            const resCode = await getJoiningCode(resCreate.result)
            if (!resCode.isError) {
                setCommitment(resCode.result)
                return true
            } else return false
        }
        return false
    }

    return (
        <DialogCustom
            title="Create Commitment"
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
                commitment={commitment}
            />
        </DialogCustom>
    )
}

export default CreateCommitmentDialog
