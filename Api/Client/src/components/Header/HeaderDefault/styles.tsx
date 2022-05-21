import styled from 'styled-components'

export const Navbar = styled.nav`
    display: flex;
    align-items: center;
    height: var(--nav-height);
    max-width: 1200px;
    margin: auto;
`

export const NavbarLogo = styled.div`
    width: 24rem;
`

export const NavbarMain = styled.nav`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    }
`
