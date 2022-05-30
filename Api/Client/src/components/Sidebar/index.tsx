import React, { FC } from 'react'

import { Link } from 'react-router-dom'

import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import KeyIcon from '@mui/icons-material/Key'
import LanguageIcon from '@mui/icons-material/Language'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
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

interface ISidebarProps {
    isShownSidebar: boolean
}

const Sidebar: FC<ISidebarProps> = ({ isShownSidebar = true }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number
    ) => {
        setSelectedIndex(index)
    }
    return (
        <Styled.SidebarContainer isShownSidebar={isShownSidebar}>
            {isShownSidebar && (
                <React.Fragment>
                    <Styled.ProfileWrapper>
                        <Styled.ProfileImage url="https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-1/83445388_2423230741323586_2331765335868309504_n.jpg?stp=dst-jpg_s200x200&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=9ZMrP7BsC5IAX-gabWu&tn=Vo_L4bz-6If-eYJC&_nc_ht=scontent-hkg4-1.xx&oh=00_AT8zFM6uCR2q2bs2by-uM84jGSSxGbfyQQkHh48dTWY-hw&oe=62B171F5" />
                        <Typography variant="subtitle1">
                            Bui Ngoc Huy
                        </Typography>
                        <Typography variant="subtitle2">Owner</Typography>
                    </Styled.ProfileWrapper>
                    <Styled.SidebarActionWrapper>
                        <IconButton size="small">
                            <PermIdentityIcon />
                        </IconButton>
                        <IconButton size="small">
                            <LanguageIcon />
                        </IconButton>
                        <IconButton size="small">
                            <KeyIcon />
                        </IconButton>
                        <IconButton size="small">
                            <ExitToAppIcon />
                        </IconButton>
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
                        <Link to={item.path} key={index}>
                            <ListItemButton
                                selected={
                                    selectedIndex === index ? true : false
                                }
                                onClick={(event) =>
                                    handleListItemClick(event, index)
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
