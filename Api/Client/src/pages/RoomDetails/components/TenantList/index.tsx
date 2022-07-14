import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { Delete as DeleteICon } from '@mui/icons-material'
import Icon from '../../../../components/Icon'
import { useAppSelector } from '../../../../hooks/reduxHook'
import {
    getAllTenantsOfRoom,
    removeTenantFromRoom,
} from '../../../../services/TenantService'
import { IRoomTenant } from '../../../../interface/IRoomTenant'
import { useDialog } from '../../../../hooks/useDialog'
import ConfirmDialog from '../../../../components/DialogCustom/ConfirmDialog'
interface ITenantListProps {}

const TenantList: FC<ITenantListProps> = (props) => {
    const roomDetails = useAppSelector(
        ({ roomDetails }) => roomDetails.roomDetails
    )

    const [currentTenant, setCurrentTenant] = useState<IRoomTenant>()
    const [tenantList, setTenantList] = useState<IRoomTenant[]>()
    const [openDelete, handleOpenDelete, handleCloseDelete] = useDialog()

    const handleKickTenant = async () => {
        ;(async () => {
            const response = await removeTenantFromRoom(currentTenant?.id)
        })()
    }

    const handleClickDelete = (tenant: IRoomTenant) => {
        handleOpenDelete()
        setCurrentTenant(tenant)
    }

    useEffect(() => {
        if (!roomDetails.hostelId || !roomDetails.id) return
        ;(async () => {
            const tenants: IRoomTenant[] = await getAllTenantsOfRoom(
                roomDetails.hostelId,
                roomDetails.id
            )
            setTenantList(tenants)
        })()
    }, [roomDetails])

    return (
        <>
            <Paper elevation={3}>
                <Card sx={{ minWidth: '100%' }}>
                    <CardHeader
                        title={
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Icon
                                    name="tenant"
                                    sx={{ marginRight: '8px' }}
                                />
                                <Typography variant="subtitle2">
                                    <strong>Tenant List</strong>
                                </Typography>
                            </div>
                        }
                        sx={{
                            paddingBottom: 0,
                        }}
                    />
                    <CardContent sx={{ padding: 0 }}>
                        <List>
                            {tenantList &&
                                tenantList.map((item) => (
                                    <>
                                        <Divider
                                            variant="middle"
                                            component="li"
                                        />
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar
                                                    sx={{
                                                        width: 36,
                                                        height: 36,
                                                        filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))',
                                                    }}
                                                >
                                                    {item.tenant?.name?.charAt(
                                                        0
                                                    )}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="body2">
                                                        <strong>
                                                            {item.tenant?.name}
                                                        </strong>
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography variant="caption">
                                                        {item.tenant?.phone}
                                                    </Typography>
                                                }
                                            />
                                            <IconButton
                                                aria-label="delete"
                                                color="orange"
                                                size="large"
                                                onClick={() =>
                                                    handleClickDelete(item)
                                                }
                                            >
                                                <DeleteICon
                                                    sx={{ fontSize: '2rem' }}
                                                />
                                            </IconButton>
                                        </ListItem>
                                    </>
                                ))}
                        </List>
                    </CardContent>
                </Card>
            </Paper>

            {openDelete && (
                <ConfirmDialog
                    title="Kick Tenant"
                    openDialog={openDelete}
                    handleOpenDialog={handleOpenDelete}
                    handleCloseDialog={handleCloseDelete}
                    handleConfirm={handleKickTenant}
                >
                    <div style={{ minHeight: '100px' }}>
                        <Typography variant="h3" mb={1}>
                            Are you sure ?
                        </Typography>
                        <Typography variant="body1">
                            Do yo really want to kick{' '}
                            {currentTenant?.tenant.name} from{' '}
                            {currentTenant?.room.roomName}. This process can not
                            be undone.
                        </Typography>
                    </div>
                </ConfirmDialog>
            )}
        </>
    )
}

export default TenantList
