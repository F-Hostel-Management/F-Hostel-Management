import React, { useState } from 'react'

import { Grid } from '@mui/material'

import Footer from '../../Footer'
import HeaderDefault from '../../Header/HeaderDefault'
import SidebarFull from '../../Sidebar/SidebarFull'

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
            <Grid container direction="row">
                <Grid item md={isShownSidebar ? 2.5 : 0.5}>
                    <SidebarFull isShownSidebar={isShownSidebar} />
                </Grid>
                <Grid
                    item
                    md={isShownSidebar ? 9.5 : 11.5}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ backgroundColor: 'var(--color-gray-500)' }}
                >
                    {children}
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}

export default DefaultLayout
