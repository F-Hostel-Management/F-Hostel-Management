import React, { useState } from 'react'
import FormDialog from '../../../../components/DialogCustom/FormDialog'
import InputField from '../../../../components/Input/InputField'
import { IDialogOperator } from '../../../../interface/IDialogOperator'
import { showError } from '../../../../utils/Toast'
import * as Styled from '../../style'
interface IAssignmentDialogProps extends IDialogOperator {}

export const AssignmentDialog = ({
    openDialog,
    handleCloseDialog,
}: IAssignmentDialogProps) => {
    const [value, setState] = useState('')
    const handleSubmitAssignment = () => {
        showError('asd')
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
