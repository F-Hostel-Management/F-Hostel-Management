import * as React from 'react'

import { up } from 'styled-breakpoints'
import { useBreakpoint } from 'styled-breakpoints/react-styled'

import MailOutlineIcon from '@mui/icons-material/MailOutline'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SettingsIcon from '@mui/icons-material/Settings'
import { Avatar, Badge, Grid, IconButton, Typography } from '@mui/material'
import * as colorTheme from '@mui/material/colors'

import logo from '../../../assets/images/logo.png'
import * as Styled from './styles'
import Logo from '../../Logo'

interface IHeaderDefaultProps {
    isShownSidebar: boolean
    setIsShownSidebar: any
    setIsSidebarMobile: any
}

const HeaderDefault: React.FunctionComponent<IHeaderDefaultProps> = ({
    isShownSidebar,
    setIsShownSidebar,
    setIsSidebarMobile,
}) => {
    const screen = useBreakpoint(up('lg'))
    const handleShowSidebar = () => {
        if (screen) {
            setIsShownSidebar()
            setIsSidebarMobile(false)
        } else {
            setIsSidebarMobile()
            setIsShownSidebar(true)
        }
    }
    return (
        <Styled.Navbar>
            <Grid container direction="row">
                <Styled.LogoGrid
                    md={isShownSidebar ? 2.5 : 0.5}
                    container
                    item
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Styled.NavbarLogo>
                        {isShownSidebar ? (
                            <Logo />
                        ) : (
                            <img
                                src={logo}
                                alt="logo"
                                style={{ height: '50px' }}
                            />
                        )}
                    </Styled.NavbarLogo>
                </Styled.LogoGrid>
                <Styled.NavbarMainGrid
                    md={isShownSidebar ? 9.5 : 11.5}
                    container
                    item
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Styled.NavbarMain>
                        <IconButton
                            color="gray"
                            style={{ marginLeft: '16px' }}
                            onClick={handleShowSidebar}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Styled.NavbarMain>
                    <Styled.NavActionList>
                        <li>
                            <Badge
                                badgeContent={10}
                                color="pink"
                                max={9}
                                sx={{ margin: '0 8px' }}
                            >
                                <NotificationsNoneIcon color="action" />
                            </Badge>
                        </li>
                        <li>
                            <Badge
                                badgeContent={4}
                                color="success"
                                max={9}
                                sx={{ margin: '0 8px' }}
                            >
                                <MailOutlineIcon color="action" />
                            </Badge>
                        </li>
                        <li>
                            <Styled.AvatarWrapper>
                                <Avatar
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        bgcolor: colorTheme.deepOrange[500],
                                    }}
                                >
                                    H
                                </Avatar>
                                <Typography variant="caption">HuyB</Typography>
                            </Styled.AvatarWrapper>
                        </li>
                        <li>
                            <IconButton color="gray">
                                <SettingsIcon />
                            </IconButton>
                        </li>
                    </Styled.NavActionList>
                </Styled.NavbarMainGrid>
            </Grid>
            <Styled.NavbarLogoResponsive>
                <Logo />
            </Styled.NavbarLogoResponsive>
        </Styled.Navbar>
    )
}

export default HeaderDefault
