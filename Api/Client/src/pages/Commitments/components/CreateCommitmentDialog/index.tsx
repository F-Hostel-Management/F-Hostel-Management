import React, { ChangeEvent, FC, useState } from 'react'
import DialogCustom from '../../../../components/DialogCustom'
import CommitmentStepper from '../CommitmentStepper'
import { useForm } from '../../../../hooks/useForm'
import { ICommitmentValues } from '../../../../interface/ICommitment'
import {
    createCommitment,
    approveCommitment,
    getJoiningCode,
} from '../../../../services/CommitmentService'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHook'
import { getItem } from '../../../../utils/LocalStorageUtils'
import { fetchCommitments } from '../../../../slices/commitmentSlice'
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
        dateOverdue: 0,
        compensation: 0,
        price: 0,
        paymentDate: 1,
    }

    const [commitmentId, setCommitmentId] = useState<any>(null)
    const { values, setValues, handleInputChange, resetForm } =
        useForm<ICommitmentValues>(initialValues)
    const [timeSpan, setTimeSpan] = useState<number | null>(0)
    const [sixDigitsCode, setSixDigitsCode] = useState<string | number>('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTimeSpan(Number(e.target.value))
    }

    // create commitment
    const handleSubmitStep2 = async () => {
        const response = await createCommitment(values)
        if (!response.isError) {
            setCommitmentId(response.result)
            const currentHostelId = getItem('currentHostelId')
            dispatch(fetchCommitments({ currentHostelId, pageSize, page }))
        }
    }

    const handleSubmitStep3 = async () => {
        let response = await approveCommitment({
            commitmentId: commitmentId,
        })

        if (!response.isError) {
            response = await getJoiningCode({
                commitmentId: commitmentId,
                timeSpan,
            })
            if (!response.isError) {
                setSixDigitsCode(response.result.sixDigitsCode)
                const currentHostelId = getItem('currentHostelId')
                dispatch(fetchCommitments({ currentHostelId, pageSize, page }))
            }
        }
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
                handleSubmitStep2={handleSubmitStep2}
                handleSubmitStep3={handleSubmitStep3}
                timeSpan={timeSpan}
                handleChange={handleChange}
                sixDigitsCode={sixDigitsCode}
            />
        </DialogCustom>
    )
}

export default CreateCommitmentDialog
