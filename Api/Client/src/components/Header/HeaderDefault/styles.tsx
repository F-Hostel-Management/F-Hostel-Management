import { down } from 'styled-breakpoints'
import styled from 'styled-components'

import { Grid } from '@mui/material'

export const Navbar = styled.nav`
    z-index: 2;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: var(--nav-height);

    ${down('md')} {
        height: calc(var(--nav-height) * 2);
    }
`

export const LogoGrid = styled(Grid)`
    height: var(--nav-height);
    ${down('md')} {
        display: none !important;
    }
`

export const NavbarMainGrid = styled(Grid)`
    height: var(--nav-height);
    //border-left: 1px solid var(--color-gray-500);
    box-shadow: 5px 7px 26px -5px #cdd4e7;
`

export const NavbarLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #fff;
    width: 100%;
    height: 100%;

    & > img {
        height: 50px;
        width: auto;
    }
`

export const NavbarMain = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--nav-height);
`
export const NavActionList = styled.ul`
    display: flex;

    & > li {
        margin: 0 6px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`
export const AvatarWrapper = styled.div`
    display: flex;
    align-items: center;

    & > span {
        margin-left: 4px;

        ${down('sm')} {
            display: none;
        }
    }
`
export const NavbarLogoResponsive = styled.div`
    width: 100%;
    height: var(--nav-height);
    display: none;
    background-color: var(--color-secondary);

    ${down('md')} {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`
