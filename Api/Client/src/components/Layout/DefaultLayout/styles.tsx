import { down } from 'styled-breakpoints'
import styled from 'styled-components'

import { Grid } from '@mui/material'

export const Container = styled.div<{ loading: boolean }>`
    animation: var(--animation-transitionsIn) 1s;
    display: ${(props) => (props.loading ? 'none' : 'block')};
`

export const GridSidebar = styled(Grid)<{ isSidebarMobile: boolean }>`
    ${down('lg')} {
        height: auto;
        position: absolute;
        z-index: 100;
        transform: ${(props) =>
            props.isSidebarMobile ? `translateX(0)` : `translateX(-100vw)`};
        transition: all 0.3s linear;
    }

    box-shadow: 0 8px 10px 0 rgb(183 192 206 / 20%);
    width: 100%;
    height: calc(100vh - var(--nav-height));

    overflow-x: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`
export const GridMain = styled(Grid)`
    padding: 32px;
    height: calc(100vh - var(--nav-height));
    background-color: #f0f3fb;
    box-shadow: var(--bgr-shadow) inset;
    box-shadow: 10px 8px 10px rgb(183 192 206 / 20%) inset;

    overflow-x: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }

    ${down('lg')} {
        width: 100%;
    }
`
export const BodyHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 16px;

    ${down('md')} {
        flex-direction: column;
    }
`
export const BodyTitle = styled.div``
export const Breadcrumb = styled.div`
    background-color: var(--color-gray-500);
    padding: 12px 24px;
    border-radius: 50px;

    ${down('md')} {
        margin-top: 8px;
    }
`
export const Overlay = styled.div`
    ${down('lg')} {
        position: absolute;
        z-index: -1;

        width: 100vw;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
    }
`
