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
interface IUpdateCommitmentDialogProps {
    openDialog: boolean
    handleCloseDialog: () => void
}

const UpdateCommitmentDialog: FC<IUpdateCommitmentDialogProps> = ({
    openDialog,
    handleCloseDialog,
}) => {
    const initialValues: ICommitmentValues = {
        startDate: '',
        endDate: '',
        roomId: '',
        overdueDays: 0,
        compensation: 0,
        price: 0,
        paymentDate: 1,
    }

    const [commitment, setCommitment] = useState<any>(null)
    const { values, setValues, handleInputChange, resetForm } =
        useForm<ICommitmentValues>(initialValues)
    const [timeSpan, setTimeSpan] = useState<number>(0)
    const [sixDigitsCode, setSixDigitsCode] = useState<any>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTimeSpan(Number(e.target.value))
    }

    // create commitment
    const handleSubmitStep2 = async () => {
        const response = await createCommitment(values)
        setCommitment(response.result)
    }

    const handleSubmitStep3 = async () => {
        await approveCommitment({
            commitmentId: commitment?.id,
        })
        const response = await getJoiningCode({
            commitementId: commitment?.id,
            timeSpan,
        })
        setSixDigitsCode(response.result.sixDigitsCode)
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

export default UpdateCommitmentDialog
