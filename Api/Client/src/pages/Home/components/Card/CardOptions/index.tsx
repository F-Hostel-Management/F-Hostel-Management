import React, { FC, Fragment, useState } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material'
import ConfirmDialog from '../../../../../components/DialogCustom/ConfirmDialog'
import { useDialog } from '../../../../../hooks/useDialog'
import UpdateHostelDialog from '../../Dialog/UpdateHostelDialog'

interface ICardOptionsProps {}

const CardOptions: FC<ICardOptionsProps> = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const [openDelete, handleOpenDelete, handleCloseDelete] = useDialog()
    const [openUpdate, handleOpenUpdate, handleCloseUpdate] = useDialog()

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Fragment>
            <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleOpenUpdate}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2">Update</Typography>
                </MenuItem>
                <MenuItem onClick={handleOpenDelete}>
                    <ListItemIcon>
                        <DeleteForeverIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2">Delete</Typography>
                </MenuItem>
            </Menu>

            {openUpdate && (
                <UpdateHostelDialog
                    openDialog={openUpdate}
                    handleCloseDialog={handleCloseUpdate}
                />
            )}

            {openDelete && (
                <ConfirmDialog
                    title="Delete Hostel"
                    openDialog={openDelete}
                    handleOpenDialog={handleOpenDelete}
                    handleCloseDialog={handleCloseDelete}
                >
                    <div style={{ minHeight: '100px' }}>
                        <Typography variant="h3" mb={1}>
                            Are you sure ?
                        </Typography>
                        <Typography variant="body1">
                            Do yo really want to delete this hostel. This
                            process can not be undone.
                        </Typography>
                    </div>
                </ConfirmDialog>
            )}
        </Fragment>
    )
}

export default CardOptions
