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
import React, { FC } from 'react'
import { Delete as DeleteICon } from '@mui/icons-material'
import Icon from '../../../../components/Icon'
interface ITenantListProps {}

const TenantList: FC<ITenantListProps> = (props) => {
    return (
        <Paper elevation={3}>
            <Card sx={{ minWidth: '100%' }}>
                <CardHeader
                    title={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Icon name="tenant" sx={{ marginRight: '8px' }} />
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
                        {[1, 2, 3, 4].map((item) => (
                            <>
                                <Divider variant="middle" component="li" />
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{
                                                width: 36,
                                                height: 36,
                                                filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))',
                                            }}
                                        >
                                            T
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Typography variant="body2">
                                                <strong>Le Xuan Dai</strong>
                                            </Typography>
                                        }
                                        secondary={
                                            <Typography variant="caption">
                                                0352654331
                                            </Typography>
                                        }
                                    />
                                    <IconButton
                                        aria-label="delete"
                                        color="orange"
                                        size="large"
                                    >
                                        <DeleteICon sx={{ fontSize: '2rem' }} />
                                    </IconButton>
                                </ListItem>
                            </>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Paper>
    )
}

export default TenantList
