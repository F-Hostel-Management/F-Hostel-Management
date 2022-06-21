import React, { ChangeEvent, FC, useState } from 'react'
import DialogCustom from '../../../../components/DialogCustom'
import CommitmentStepper from '../CommitmentStepper'
import { useForm } from '../../../../hooks/useForm'
import {
    ICommitment,
    ICommitmentValues,
} from '../../../../interface/ICommitment'
import {
    approveCommitment,
    getJoiningCode,
    updateCommitment,
} from '../../../../services/CommitmentService'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHook'
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
        dateOverdue: commitment.dateOverdue || 0,
        compensation: commitment.compensation || 0,
        price: commitment.price || 0,
        paymentDate: commitment.paymentDate || 0,
    }

    const { values, setValues, handleInputChange, resetForm } =
        useForm<ICommitmentValues>(initialValues)
    const [timeSpan, setTimeSpan] = useState<number>(0)
    const [sixDigitsCode, setSixDigitsCode] = useState<any>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTimeSpan(Number(e.target.value))
    }

    // create commitment
    const handleSubmitStep2 = async () => {
        const response = await updateCommitment(commitment.id, values)
        if (!response.isError) {
            const currentHostelId = getItem('currentHostelId')
            dispatch(fetchCommitments({ currentHostelId, pageSize, page }))
        }
    }

    const handleSubmitStep3 = async () => {
        let response = await approveCommitment({
            commitmentId: commitment.id,
        })
        if (!response.isError) {
            const currentHostelId = getItem('currentHostelId')
            dispatch(fetchCommitments({ currentHostelId, pageSize, page }))
        }

        response = await getJoiningCode({
            commitmentId: commitment.id,
            timeSpan,
        })
        setSixDigitsCode(response.result.sixDigitsCode)
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
                handleSubmitStep2={handleSubmitStep2}
                handleSubmitStep3={handleSubmitStep3}
                timeSpan={timeSpan}
                handleChange={handleChange}
                sixDigitsCode={sixDigitsCode}
                commitment={commitment}
            />
        </DialogCustom>
    )
}

export default UpdateCommitmentDialog
