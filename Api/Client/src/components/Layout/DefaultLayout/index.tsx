import React, { FC, ReactElement, useState } from 'react'

import { up } from 'styled-breakpoints'
import { useBreakpoint } from 'styled-breakpoints/react-styled'

import { Grid, Typography } from '@mui/material'

import Breadcrumb from '../../Breadcrumd'
import Footer from '../../Footer'
import HeaderDefault from '../../Header/HeaderDefault'
import Loading from '../../Loading'
import Sidebar from '../../Sidebar'
import * as Styled from './styles'

interface IDefaultLayoutProps {
    children: ReactElement
}

const DefaultLayout: FC<IDefaultLayoutProps> = ({ children }) => {
    const screen = useBreakpoint(up('lg'))
    const [isShownSidebar, setIsShownSidebar] = useState<boolean>(true)
    const [isSidebarMobile, setIsSidebarMobile] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    setTimeout(() => setLoading(false), 2000)

    return loading ? (
        <Loading />
    ) : (
        <Styled.Container>
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
                <Styled.GridSidebar
                    item
                    lg={isShownSidebar ? 2.5 : 0.5}
                    isSidebarMobile={isSidebarMobile}
                >
                    {isSidebarMobile || screen ? (
                        <React.Fragment>
                            <Styled.Overlay
                                onClick={() => setIsSidebarMobile(false)}
                            />
                            <Sidebar isShownSidebar={isShownSidebar} />
                        </React.Fragment>
                    ) : null}
                </Styled.GridSidebar>
                <Styled.GridMain
                    item
                    lg={isShownSidebar ? 9.5 : 11.5}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
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
        </Styled.Container>
    )
}

export default DefaultLayout
