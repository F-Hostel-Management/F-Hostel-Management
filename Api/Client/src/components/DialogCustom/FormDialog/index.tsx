import { Button, DialogProps } from '@mui/material'
import * as React from 'react'
import DialogCustom from '..'
import * as Styled from './styles'

interface IFormDialogProps {
    title: string
    action: string
    openDialog: boolean
    handleCloseDialog: () => void
    handleSubmit: React.FormEventHandler<HTMLFormElement>
    children: any
    [x: string | number | symbol]: unknown
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
    ...others
}) => {
    const handlerWrapper = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (handleSubmit) handleSubmit(e)
    }
    return (
        <DialogCustom
            title={title}
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            maxWidth={maxWidth}
            {...others}
        >
            <form onSubmit={handlerWrapper}>
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
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                    >
                        {action}
                    </Button>
                </Styled.GroupButton>
            </form>
        </DialogCustom>
    )
}

export default FormDialog
