import { down, up } from 'styled-breakpoints'
import styled from 'styled-components'

import { Grid } from '@mui/material'

export const Navbar = styled.nav`
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
    ${down('md')} {
        display: none !important;
    }
    ${up('xl')} {
        padding-left: calc(calc(100vw - 1400px) / 2);
    }
`

export const NavbarMainGrid = styled(Grid)`
    ${up('xl')} {
        padding-right: calc(calc(100vw - 1400px) / 2);
    }
    border-left: 1px solid var(--color-gray-500);
`

export const NavbarLogo = styled.div``

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
