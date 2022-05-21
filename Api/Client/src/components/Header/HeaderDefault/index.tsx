import * as React from 'react'

import MailOutlineIcon from '@mui/icons-material/MailOutline'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SettingsIcon from '@mui/icons-material/Settings'
import { Avatar, Badge, Divider, IconButton, Typography } from '@mui/material'
import * as colorTheme from '@mui/material/colors'

import * as Styled from './styles'

interface IHeaderDefaultProps {}

const HeaderDefault: React.FunctionComponent<IHeaderDefaultProps> = (props) => {
    return (
        <Styled.Navbar>
            <Styled.NavbarLogo>
                <div>Logo here</div>
            </Styled.NavbarLogo>
            <Divider sx={{ height: 40, m: 0.5 }} orientation="vertical" />
            <Styled.NavbarMain>
                <IconButton color="gray">
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
        </Styled.Navbar>
    )
}

export default HeaderDefault
