import React, { useState } from 'react'
import FormDialog from '../../../../components/DialogCustom/FormDialog'
import InputField from '../../../../components/Input/InputField'
import { IDialogOperator } from '../../../../interface/IDialogOperator'
import * as Styled from '../../style'
import { RestCaller } from '../../../../utils/RestCaller'
import { getItem } from '../../../../utils/LocalStorageUtils'
interface IAssignmentDialogProps extends IDialogOperator {}

export const AssignmentDialog = ({
    openDialog,
    handleCloseDialog,
}: IAssignmentDialogProps) => {
    const [value, setState] = useState('')
    const hostelId = getItem('currentHostelId')
    // const [loading, setLoading] = useState(false)
    const handleSubmitAssignment = async () => {
        // setLoading(true)
        const result = await RestCaller.post(
            'HostelManagements/assign',
            {
                hostelId: hostelId,
                email: value,
            },
            { loading: { show: true }, success: { show: true } }
        )
        // setLoading(false)
        // if (result.isError) showError(result.result)
    }
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.currentTarget.value)
    }
    return (
        <FormDialog
            title="Manager Assignment"
            action="Assign Manager"
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            handleSubmit={handleSubmitAssignment}
            maxWidth="md"
        >
            <Styled.AssignmentContainer>
                <InputField
                    label="Email"
                    name="email"
                    type="text"
                    required
                    value={value}
                    onChange={handleEmailChange}
                />
            </Styled.AssignmentContainer>
        </FormDialog>
    )
}
