import { down } from 'styled-breakpoints'
import styled from 'styled-components'

export const SidebarContainer = styled.div<{ isShownSidebar: boolean }>`
    height: 100%;
    padding: ${(props) => (props.isShownSidebar ? '16px 4px' : '8px 0px')};
    box-shadow: 0 8px 10px 0 rgb(183 192 206 / 20%);
    background-color: #fff;

    ${down('lg')} {
        width: 320px;
    }
`

export const ProfileWrapper = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const ProfileImage = styled.div<{ url: string }>`
    width: 7.5rem;
    height: 7.5rem;
    background-image: url(${(props) => props.url});
    background-position: center;
    background-size: contain;

    border: 1px solid #ffffff;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 8px;
`
export const SidebarActionWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    & > button {
        margin: 0 12px;
    }
`
