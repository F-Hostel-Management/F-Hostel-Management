import * as React from 'react'

import Footer from '../../Footer'
import HeaderHome from '../../Header/HeaderHome'

interface IDefaultHomeLayoutProps {
    children: React.ReactElement
}

const DefaultHomeLayout: React.FunctionComponent<IDefaultHomeLayoutProps> = ({
    children,
}) => {
    return (
        <div>
            <HeaderHome />
            {children}
            <Footer />
        </div>
    )
}

export default DefaultHomeLayout
