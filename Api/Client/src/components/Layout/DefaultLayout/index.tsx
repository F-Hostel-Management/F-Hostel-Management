import React, { useState } from 'react'

import { Grid } from '@mui/material'

import Footer from '../../Footer'
import HeaderDefault from '../../Header/HeaderDefault'
import SidebarFull from '../../Sidebar/SidebarFull'
import * as Styled from './styles'

interface IDefaultLayoutProps {
    children: React.ReactElement
}

const DefaultLayout: React.FunctionComponent<IDefaultLayoutProps> = ({
    children,
}) => {
    const [isShownSidebar, setIsShownSidebar] = useState<boolean>(true)
    return (
        <div>
            <HeaderDefault
                isShownSidebar={isShownSidebar}
                setIsShownSidebar={() => setIsShownSidebar(!isShownSidebar)}
            />
            <Grid container direction="row" sx={{zIndex: 1}}>
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
                    {children}
                </Styled.GridMain>
            </Grid>
            <Footer />
        </div>
    )
}

export default DefaultLayout
