import React, { FC, ReactNode } from 'react'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

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
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
}

interface IDialogCustomProps {
    title: string
    openDialog: boolean
    handleOpenDialog: () => void
    handleCloseDialog: () => void
    children: any
}
const DialogCustom: FC<IDialogCustomProps> = ({
    title,
    openDialog,
    handleOpenDialog,
    handleCloseDialog,
    children,
}) => {
    return (
        <div>
            <Button variant="outlined" onClick={handleOpenDialog}>
                Open dialog
            </Button>
            <BootstrapDialog
                onClose={handleCloseDialog}
                aria-labelledby="customized-dialog-title"
                open={openDialog}
                fullWidth={true}
                maxWidth="xl"
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleCloseDialog}
                >
                    {title}
                </BootstrapDialogTitle>
                <DialogContent dividers>{children}</DialogContent>
            </BootstrapDialog>
        </div>
    )
}

export default DialogCustom
