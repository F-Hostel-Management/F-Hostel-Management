import React, { FC, Fragment, ReactElement, useState } from 'react'

import { up } from 'styled-breakpoints'
import { useBreakpoint } from 'styled-breakpoints/react-styled'

import { Grid, Typography } from '@mui/material'

import Breadcrumb from '../../Breadcrumd'
import HeaderDefault from '../../Header/HeaderDefault'
import Loading from '../../Loading'
import Sidebar from '../../Sidebar'
import * as Styled from './styles'

interface IDefaultLayoutProps {
    title: string
    children: ReactElement
}

const DefaultLayout: FC<IDefaultLayoutProps> = ({ title, children }) => {
    // breakpoints of screen
    const screen = useBreakpoint(up('lg'))

    // isShownSidebar = true, show full sidebar
    // isShowSidebar = false, show only icon
    const [isShownSidebar, setIsShownSidebar] = useState<boolean>(true)

    //isSidebarMobile = true, sidebar with overlay
    const [isSidebarMobile, setIsSidebarMobile] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    setTimeout(() => setLoading(false), 2000)

    return (
        <Fragment>
            <Loading loading={loading} />
            <Styled.Container loading={loading}>
                <HeaderDefault
                    isShownSidebar={isShownSidebar}
                    setIsShownSidebar={(state = !isShownSidebar) =>
                        setIsShownSidebar(state)
                    }
                    setIsSidebarMobile={(state = !isSidebarMobile) =>
                        setIsSidebarMobile(state)
                    }
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
                        <React.Fragment>
                            {isSidebarMobile && (
                                <Styled.Overlay
                                    onClick={() => setIsSidebarMobile(false)}
                                />
                            )}
                            <Sidebar isShownSidebar={isShownSidebar} />
                        </React.Fragment>
                    </Styled.GridSidebar>
                    <Styled.GridMain item lg={isShownSidebar ? 9.5 : 11.5}>
                        <React.Fragment>
                            <Styled.BodyHeader>
                                <Styled.BodyTitle>
                                    <Typography variant="h4">
                                        <strong>{title}</strong>
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
        </Fragment>
    )
}

export default DefaultLayout
