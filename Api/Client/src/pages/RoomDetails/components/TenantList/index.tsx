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
} from '@mui/material'
import React, { FC } from 'react'
import { Delete as DeleteICon } from '@mui/icons-material'
interface ITenantListProps {}

const TenantList: FC<ITenantListProps> = (props) => {
    return (
        <Paper elevation={3}>
            <Card sx={{ minWidth: '100%' }}>
                <CardHeader title="Tenant List" sx={{ paddingBottom: 0 }} />
                <CardContent sx={{ padding: 0 }}>
                    <List>
                        {[1, 2, 3, 4].map((item) => (
                            <>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{
                                                width: 32,
                                                height: 32,
                                                filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))',
                                            }}
                                        >
                                            T
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        sx={{
                                            '& .MuiListItemText-multiline': {
                                                fontSize: '1.3rem',
                                            },
                                        }}
                                        secondary="Le Xuan Dai"
                                    />
                                    <IconButton
                                        aria-label="delete"
                                        color="orange"
                                    >
                                        <DeleteICon
                                            sx={{ fontSize: '1.6rem' }}
                                        />
                                    </IconButton>
                                    {/* <IconButtonCustom
                                        textColor="#fff"
                                        bgrColor="#f96332"
                                        sx={{
                                            width: '2.8rem',
                                            height: '2.8rem',
                                        }}
                                    >
                                        <Tooltip title="Delete" placement="top">
                                            <DeleteICon
                                                sx={{ fontSize: '1.6rem' }}
                                            />
                                        </Tooltip>
                                    </IconButtonCustom> */}
                                </ListItem>
                                <Divider variant="middle" component="li" />
                            </>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Paper>
    )
}

export default TenantList
