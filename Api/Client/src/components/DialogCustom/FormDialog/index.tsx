import { Button, DialogProps } from '@mui/material'
import * as React from 'react'
import DialogCustom from '..'
import * as Styled from './styles'

interface IFormDialogProps {
    title: string
    action: string
    openDialog: boolean
    handleCloseDialog: () => void
    handleSubmit: () => void
    children: any
    maxWidth?: DialogProps['maxWidth']
}

const FormDialog: React.FunctionComponent<IFormDialogProps> = ({
    title,
    action,
    openDialog,
    handleCloseDialog,
    handleSubmit,
    children,
    maxWidth = 'xl',
}) => {
    return (
        <DialogCustom
            title={title}
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            maxWidth={maxWidth}
        >
            <form onSubmit={handleSubmit}>
                <div style={{ paddingBottom: '16px' }}>{children}</div>
                <Styled.GroupButton>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={handleCloseDialog}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" size="small">
                        {action}
                    </Button>
                </Styled.GroupButton>
            </form>
        </DialogCustom>
    )
}

export default FormDialog
