import * as React from 'react'

import Footer from '../../Footer'
import HeaderDefault from '../../Header/HeaderDefault'
import SidebarFull from '../../Sidebar/SidebarFull'

interface IDefaultLayoutProps {
    children: React.ReactElement
}

const DefaultLayout: React.FunctionComponent<IDefaultLayoutProps> = ({
    children,
}) => {
    return (
        <div>
            <HeaderDefault />
            <SidebarFull />
            {children}
            <Footer />
        </div>
    )
}

export default DefaultLayout
