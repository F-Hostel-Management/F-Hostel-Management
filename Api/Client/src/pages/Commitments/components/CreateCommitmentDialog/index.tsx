import React, { FC } from 'react'
import DialogCustom from '../../../../components/DialogCustom'
import CreateCommitmentStepper from '../CreateCommitmentStepper'

interface ICreateCommitmentDialogProps {
    openDialog: boolean | any
    handleOpenDialog: any
    handleCloseDialog: any
}

const CreateCommitmentDialog: FC<ICreateCommitmentDialogProps> = ({
    openDialog,
    handleOpenDialog,
    handleCloseDialog,
}) => {
    return (
        <DialogCustom
            title="Create Commitment"
            openDialog={openDialog}
            handleOpenDialog={handleOpenDialog}
            handleCloseDialog={handleCloseDialog}
        >
            <CreateCommitmentStepper handleCloseDialog={handleCloseDialog} />
        </DialogCustom>
    )
}

export default CreateCommitmentDialog
