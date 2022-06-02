import { Button, DialogActions, DialogContentText } from '@mui/material'
import React, { FC, Fragment } from 'react'
import DialogCustom from '../../DialogCustom'

interface IConfirmDialogProps {
    openDialog: boolean | any
    handleOpenDialog: any
    handleCloseDialog: any
    children: any
}

const ConfirmDialog: FC<IConfirmDialogProps> = ({
    openDialog,
    handleCloseDialog,
    children,
}) => {
    return (
        <DialogCustom
            title="Delete Commitment"
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            maxWidth="md"
        >
            <Fragment>
                <DialogContentText>{children}</DialogContentText>
                <DialogActions>
                    <Button
                        autoFocus
                        variant="contained"
                        onClick={handleCloseDialog}
                        color="gray"
                        size="small"
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" color="orange" size="small">
                        Confirm
                    </Button>
                </DialogActions>
            </Fragment>
        </DialogCustom>
    )
}

export default ConfirmDialog
