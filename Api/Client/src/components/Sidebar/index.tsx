import React, { FC } from 'react'

import { Link } from 'react-router-dom'

import ArrowRightIcon from '@mui/icons-material/ArrowRight'
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

import { sidebarItemList } from './sidebarItemList'
import * as Styled from './styles'
import { useSelector } from 'react-redux'
import { AppState } from '../../stores/reduxStore'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import KeyIcon from '@mui/icons-material/Key'
import LanguageIcon from '@mui/icons-material/Language'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
interface ISidebarProps {
    isShownSidebar: boolean
}
interface IIconButtonListProps {
    icon: React.ReactElement
    path: string
}
const Sidebar: FC<ISidebarProps> = ({ isShownSidebar = true }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const currentUser = useSelector((state: AppState) => state.auth.currentUser)
    const handleListItemClick = (index: number) => {
        setSelectedIndex(index)
    }
    console.log(currentUser)
    const IconButtonList: { items: Array<IIconButtonListProps> } = {
        items: [
            {
                icon: <PermIdentityIcon />,
                path: `/home/profile/${currentUser?.id}`,
            },
            { icon: <LanguageIcon />, path: '' },
            { icon: <KeyIcon />, path: '' },
            { icon: <ExitToAppIcon />, path: '' },
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
                                <IconButton size="small" sx={{ mx: 1 }}>
                                    {item.icon}
                                </IconButton>
                            </Link>
                        ))}
                    </Styled.SidebarActionWrapper>
                </React.Fragment>
            )}
            {sidebarItemList['owner'].map((group, index) => (
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
                                    selectedIndex === index ? true : false
                                }
                                onClick={() => handleListItemClick(index)}
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
                                            {selectedIndex === index ? (
                                                <strong>{item.label}</strong>
                                            ) : (
                                                item.label
                                            )}
                                        </Typography>
                                        {selectedIndex === index && (
                                            <ArrowRightIcon
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
