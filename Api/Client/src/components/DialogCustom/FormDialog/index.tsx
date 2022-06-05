import { Button } from '@mui/material'
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
    [x: string | number | symbol]: unknown
}

const FormDialog: React.FunctionComponent<IFormDialogProps> = ({
    title,
    action,
    openDialog,
    handleCloseDialog,
    handleSubmit,
    children,
    ...others
}) => {
    return (
        <DialogCustom
            title={title}
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            {...others}
        >
            <form onSubmit={handleSubmit}>
                <div style={{ paddingBottom: '16px' }}>{children}</div>
                <Styled.GroupButton>
                    <Button variant="contained" color="secondary" size="small">
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
