import React, { FC, ReactNode } from 'react'
import { styled } from '@mui/material/styles'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import { Close } from '@mui/icons-material'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}))

export interface DialogTitleProps {
    id: string
    children?: ReactNode
    onClose: () => void
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <Close />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
}

interface IDialogCustomProps {
    title: string
    openDialog: any
    handleCloseDialog: any
    children: any
    maxWidth?: DialogProps['maxWidth']
}
const DialogCustom: FC<IDialogCustomProps> = ({
    title,
    openDialog,
    handleCloseDialog,
    children,
    maxWidth = 'xl',
}) => {
    return (
        <div>
            <BootstrapDialog
                onClose={handleCloseDialog}
                aria-labelledby="customized-dialog-title"
                open={openDialog}
                fullWidth={true}
                maxWidth={maxWidth}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleCloseDialog}
                >
                    <strong>{title}</strong>
                </BootstrapDialogTitle>
                <DialogContent dividers>{children}</DialogContent>
            </BootstrapDialog>
        </div>
    )
}

export default DialogCustom
