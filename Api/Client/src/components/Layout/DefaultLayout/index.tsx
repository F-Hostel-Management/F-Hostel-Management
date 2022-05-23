import React, { useState } from 'react'

import { Grid, Typography } from '@mui/material'

import Breadcrumb from '../../Breadcrumd'
import Footer from '../../Footer'
import HeaderDefault from '../../Header/HeaderDefault'
import SidebarFull from '../../Sidebar/SidebarFull'
import * as Styled from './styles'
import Loading from '../../Loading'

interface IDefaultLayoutProps {
    children: React.ReactElement
}

const DefaultLayout: React.FunctionComponent<IDefaultLayoutProps> = ({
    children,
}) => {
    const [isShownSidebar, setIsShownSidebar] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(true)

    setTimeout(() => setLoading(false), 2000)

    return loading ? (
        <Loading />
    ) : (
        <React.Fragment>
            <HeaderDefault
                isShownSidebar={isShownSidebar}
                setIsShownSidebar={() => setIsShownSidebar(!isShownSidebar)}
            />
            <Grid container direction="row" sx={{ zIndex: 1 }}>
                <Styled.GridSidebar item lg={isShownSidebar ? 2.5 : 0.5}>
                    <SidebarFull isShownSidebar={isShownSidebar} />
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
            <Footer />
        </React.Fragment>
    )
}

export default DefaultLayout
