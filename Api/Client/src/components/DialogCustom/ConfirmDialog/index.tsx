import {
    Button,
    DialogActions,
    DialogContentText,
    DialogProps,
} from '@mui/material'
import React, { FC, Fragment } from 'react'
import DialogCustom from '../../DialogCustom'

interface IConfirmDialogProps {
    title: string
    openDialog: boolean
    handleOpenDialog: () => void
    handleCloseDialog: () => void
    maxWidth?: DialogProps['maxWidth']
    handleConfirm?: () => void
    children?: any
}

const ConfirmDialog: FC<IConfirmDialogProps> = ({
    title,
    openDialog,
    handleCloseDialog,
    children,
    maxWidth = 'md',
    handleConfirm,
}) => {
    return (
        <DialogCustom
            title={title}
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            maxWidth={maxWidth}
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
                    <Button
                        variant="contained"
                        color="orange"
                        size="small"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Fragment>
        </DialogCustom>
    )
}

export default ConfirmDialog
