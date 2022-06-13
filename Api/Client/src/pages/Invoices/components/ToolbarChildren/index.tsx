import { Button } from '@mui/material'
import React, { FC } from 'react'
import { AddCircle } from '@mui/icons-material'

interface IToolbarChildrenProps {
    handleOpenCreate: () => void
}

const ToolbarChildren: FC<IToolbarChildrenProps> = ({ handleOpenCreate }) => {
    return (
        <Button
            variant="contained"
            startIcon={<AddCircle />}
            size="small"
            sx={{ margin: '8px' }}
            onClick={handleOpenCreate}
        >
            Create
        </Button>
    )
}

export default ToolbarChildren
