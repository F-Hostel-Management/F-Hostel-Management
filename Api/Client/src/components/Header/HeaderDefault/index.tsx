import * as React from 'react'

import MailOutlineIcon from '@mui/icons-material/MailOutline'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SettingsIcon from '@mui/icons-material/Settings'
import {
    Avatar,
    Badge,
    Divider,
    Grid,
    IconButton,
    Typography,
} from '@mui/material'
import * as colorTheme from '@mui/material/colors'

import * as Styled from './styles'

interface IHeaderDefaultProps {
    isShownSidebar: boolean
    setIsShownSidebar: any
}

const HeaderDefault: React.FunctionComponent<IHeaderDefaultProps> = ({
    isShownSidebar = true,
    setIsShownSidebar = () => {},
}) => {
    return (
        <Styled.Navbar>
            <Grid container direction="row">
                <Styled.LogoGrid
                    md={isShownSidebar ? 2.5 : 0.5}
                    container
                    item
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Styled.NavbarLogo>
                        <div>Logo here</div>
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
                            onClick={setIsShownSidebar}
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
                                style={{ margin: '0 8px' }}
                            >
                                <NotificationsNoneIcon color="action" />
                            </Badge>
                        </li>
                        <li>
                            <Badge
                                badgeContent={4}
                                color="success"
                                max={9}
                                style={{ margin: '0 8px' }}
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
                <div>Logo here</div>
            </Styled.NavbarLogoResponsive>
        </Styled.Navbar>
    )
}

export default HeaderDefault
