import React, { FC, Fragment, ReactElement, useState } from 'react'

import { FooterLandingPage as Footer } from '../../Footer/FooterLandingPage'
import { HeaderLandingPage as Header } from '../../Header/HeaderLandingPage'
import Loading from '../../Loading'
import * as Styled from './styles'

interface IHomeLayoutProps {
    children: ReactElement
}

export const HomeLayout: FC<IHomeLayoutProps> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true)
    setTimeout(() => setLoading(false), 2000)
    return (
        <Fragment>
            <Loading loading={loading} />
            <Styled.Container loading={loading}>
                <Header />
                <Styled.BodyWrapper>{children}</Styled.BodyWrapper>
                <Footer />
            </Styled.Container>
        </Fragment>
    )
}

export default HomeLayout
