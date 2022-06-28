import React, { FC, MouseEventHandler, useEffect, useState } from 'react'

import { Link, useLocation } from 'react-router-dom'

import {
    ArrowRight,
    PermIdentity,
    Key,
    Language,
    ExitToApp,
} from '@mui/icons-material'
import {
    Grid,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListSubheader,
    Tooltip,
    Typography,
} from '@mui/material'

import { ISidebarItem, sidebarItemList } from './sidebarItemList'
import * as Styled from './styles'
import { getUserRole, logOut } from '../../slices/authSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { useSelector } from 'react-redux'
import { AppState } from '../../stores/reduxStore'
import { ERole } from '../../utils/enums'
interface ISidebarProps {
    isShownSidebar: boolean
}
interface IIconButtonListProps {
    icon: React.ReactElement
    path: string
    onClick?: MouseEventHandler<any> | undefined
}
const Sidebar: FC<ISidebarProps> = ({ isShownSidebar = true }) => {
    const role = useAppSelector(getUserRole)
    let location = useLocation()

    const pathName: string = location.pathname

    const [target, setTarget] = useState<
        Array<{
            groupLabel: string
            items: Array<ISidebarItem>
        }>
    >([])
    useEffect(() => {
        if (role == ERole.TENANT_ROLE) {
            setTarget(sidebarItemList['tenant'])
            // setTarget('tenant')
        } else {
            setTarget(sidebarItemList['owner'])
            // setTarget('owner')
        }
    }, [role])

    const currentUser = useSelector((state: AppState) => state.auth.currentUser)
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(logOut())
    }
    const IconButtonList: { items: Array<IIconButtonListProps> } = {
        items: [
            { icon: <PermIdentity />, path: '/home/profile' },
            { icon: <Language />, path: '' },
            { icon: <Key />, path: '' },
            { icon: <ExitToApp />, path: '', onClick: handleLogout },
        ],
    }
    return (
        <Styled.SidebarContainer isShownSidebar={isShownSidebar}>
            {isShownSidebar && (
                <React.Fragment>
                    <Styled.ProfileWrapper>
                        <Styled.ProfileImage url="https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-1/83445388_2423230741323586_2331765335868309504_n.jpg?stp=dst-jpg_s200x200&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=9ZMrP7BsC5IAX-gabWu&tn=Vo_L4bz-6If-eYJC&_nc_ht=scontent-hkg4-1.xx&oh=00_AT8zFM6uCR2q2bs2by-uM84jGSSxGbfyQQkHh48dTWY-hw&oe=62B171F5" />
                        <Typography variant="subtitle1">
                            {currentUser?.name}
                        </Typography>
                        <Typography variant="subtitle2">Owner</Typography>
                    </Styled.ProfileWrapper>
                    <Styled.SidebarActionWrapper>
                        {IconButtonList.items.map((item, index) => (
                            <Link to={item.path} key={index}>
                                <IconButton
                                    size="small"
                                    sx={{ mx: 1 }}
                                    onClick={item.onClick}
                                >
                                    {item.icon}
                                </IconButton>
                            </Link>
                        ))}
                    </Styled.SidebarActionWrapper>
                </React.Fragment>
            )}
            {target.map((group, index) => (
                <List
                    key={index}
                    sx={{
                        width: '100%',
                        maxWidth: 360,
                        margin: 'auto',
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        isShownSidebar ? (
                            <ListSubheader
                                component="div"
                                id="nested-list-subheader"
                            >
                                <strong>{group.groupLabel}</strong>
                            </ListSubheader>
                        ) : null
                    }
                >
                    {group.items.map((item, index) => (
                        <Link to={item.path} key={index} replace={true}>
                            <ListItemButton
                                selected={
                                    pathName.indexOf(item.path) !== -1
                                        ? true
                                        : false
                                }
                                sx={{
                                    margin: '8px 4px',
                                    padding: '10px 12px',
                                    borderRadius: '8px',
                                    maxWidth: '32rem',
                                }}
                            >
                                {isShownSidebar ? (
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                ) : (
                                    <Tooltip
                                        title={item.label}
                                        placement="right"
                                    >
                                        <ListItemIcon sx={{ minWidth: 0 }}>
                                            {item.icon}
                                        </ListItemIcon>
                                    </Tooltip>
                                )}

                                {isShownSidebar && (
                                    <Grid
                                        container
                                        direction="row"
                                        alignItems="center"
                                    >
                                        <Typography
                                            variant="caption"
                                            style={{
                                                flex: 1,
                                            }}
                                        >
                                            {pathName.indexOf(item.path) !==
                                            -1 ? (
                                                <strong>{item.label}</strong>
                                            ) : (
                                                item.label
                                            )}
                                        </Typography>
                                        {pathName.indexOf(item.path) !== -1 && (
                                            <ArrowRight
                                                color="primary"
                                                sx={{
                                                    fontSize: '2.4rem',
                                                }}
                                            />
                                        )}
                                    </Grid>
                                )}
                            </ListItemButton>
                        </Link>
                    ))}
                </List>
            ))}
        </Styled.SidebarContainer>
    )
}

export default Sidebar
