import { Button } from '@mui/material'
import React, { FC } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'

interface IToolbarChildrenProps {
    handleOpenCreate: any
}

const ToolbarChildren: FC<IToolbarChildrenProps> = ({ handleOpenCreate }) => {
    return (
        <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            size="small"
            sx={{ margin: '8px' }}
            onClick={handleOpenCreate}
        >
            Create
        </Button>
    )
}

export default ToolbarChildren
