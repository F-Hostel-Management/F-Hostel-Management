import { Typography } from '@mui/material'
import * as React from 'react'
import * as Styled from './styles'
import logo from '../../assets/images/logo.png'
interface ILogoProps {}

const Logo: React.FunctionComponent<ILogoProps> = () => {
    return (
        <Styled.NavbarLogo>
            <img src={logo} alt="logo" />
            <Typography
                variant="subtitle1"
                color="primary"
                sx={{ marginLeft: '4px' }}
            >
                F-Hostel
            </Typography>
        </Styled.NavbarLogo>
    )
}

export default Logo
