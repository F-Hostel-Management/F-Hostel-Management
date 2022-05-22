import * as React from 'react'

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
    ListItemText,
    ListSubheader,
    Typography,
} from '@mui/material'

import { sidebarItemList } from '../sidebarItemList'
import * as Styled from './styles'

interface ISidebarFullProps {
    isShownSidebar: boolean
}

const SidebarFull: React.FunctionComponent<ISidebarFullProps> = ({
    isShownSidebar = true,
}) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number
    ) => {
        setSelectedIndex(index)
    }

    return (
        <div style={{ paddingRight: '4px' }}>
            {isShownSidebar && (
                <React.Fragment>
                    <Styled.ProfileWrapper>
                        <Styled.ProfileImage></Styled.ProfileImage>
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
                        bgcolor: 'background.paper',
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
                                selected={selectedIndex === index}
                                onClick={(event) =>
                                    handleListItemClick(event, index)
                                }
                                sx={{
                                    margin: selectedIndex
                                        ? '8px 8px'
                                        : '8px 4px',
                                    padding: selectedIndex
                                        ? '12px 16px'
                                        : '10px 12px',
                                    borderRadius: '8px',
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                {isShownSidebar && (
                                    <Grid
                                        container
                                        direction="row"
                                        alignItems="center"
                                    >
                                        <Typography
                                            variant="body2"
                                            style={{ flex: 1 }}
                                        >
                                            {item.label}
                                        </Typography>
                                        {selectedIndex === index && (
                                            <ArrowRightIcon
                                                color="primary"
                                                style={{ fontSize: '2.4rem' }}
                                            />
                                        )}
                                    </Grid>
                                )}
                            </ListItemButton>
                        </Link>
                    ))}
                </List>
            ))}
        </div>
    )
}

export default SidebarFull
