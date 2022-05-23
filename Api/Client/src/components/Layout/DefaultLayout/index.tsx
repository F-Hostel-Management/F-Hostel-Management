import React, { useState } from 'react'

import { up } from 'styled-breakpoints'
import { useBreakpoint } from 'styled-breakpoints/react-styled'

import { Grid, Typography } from '@mui/material'

import Breadcrumb from '../../Breadcrumd'
import Footer from '../../Footer'
import HeaderDefault from '../../Header/HeaderDefault'
import Loading from '../../Loading'
import SidebarFull from '../../Sidebar/SidebarFull'
import * as Styled from './styles'

interface IDefaultLayoutProps {
    children: React.ReactElement
}

const DefaultLayout: React.FunctionComponent<IDefaultLayoutProps> = ({
    children,
}) => {
    const screen = useBreakpoint(up('lg'))
    const [isShownSidebar, setIsShownSidebar] = useState<boolean>(true)
    const [isSidebarMobile, setIsSidebarMobile] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    setTimeout(() => setLoading(false), 2000)

    return loading ? (
        <Loading />
    ) : (
        <React.Fragment>
            <HeaderDefault
                isShownSidebar={isShownSidebar}
                setIsShownSidebar={() => setIsShownSidebar(!isShownSidebar)}
                setIsSidebarMobile={() => setIsSidebarMobile(!isSidebarMobile)}
            />
            <Grid
                container
                direction="row"
                sx={{
                    zIndex: 1,
                    height: 'calc(100vh - 60px)',
                    overflow: 'hidden',
                }}
            >
                <Styled.GridSidebar item lg={isShownSidebar ? 2.5 : 0.5}>
                    {isSidebarMobile || screen ? (
                        <React.Fragment>
                            <Styled.Overlay />
                            <SidebarFull isShownSidebar={isShownSidebar} />
                        </React.Fragment>
                    ) : null}
                </Styled.GridSidebar>
                <Styled.GridMain
                    item
                    lg={isShownSidebar ? 9.5 : 11.5}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ backgroundColor: '#f0f3fb' }}
                >
                    <React.Fragment>
                        <Styled.BodyHeader>
                            <Styled.BodyTitle>
                                <Typography variant="h4">
                                    <strong>Dashboard</strong>
                                </Typography>
                            </Styled.BodyTitle>
                            <Styled.Breadcrumb>
                                <Breadcrumb />
                            </Styled.Breadcrumb>
                        </Styled.BodyHeader>
                    </React.Fragment>
                    {children}
                </Styled.GridMain>
            </Grid>
        </React.Fragment>
    )
}

export default DefaultLayout
