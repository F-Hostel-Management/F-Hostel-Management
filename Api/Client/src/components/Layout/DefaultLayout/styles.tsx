import { down } from 'styled-breakpoints'
import styled from 'styled-components'

import { Grid } from '@mui/material'

export const GridSidebar = styled(Grid)`
    ${down('lg')} {
        position: absolute;
        z-index: 100;
    }
    box-shadow: 0 8px 10px 0 rgb(183 192 206 / 20%);
    width: 100%;
    height: calc(100vh - var(--nav-height));
    overflow-x: hidden;
    overflow-y: scroll;
`
export const GridMain = styled(Grid)`
    ${down('lg')} {
        width: 100%;
    }
    padding: 32px;
    box-shadow: 5px 7px 26px -5px #cdd4e7;
    height: calc(100vh - var(--nav-height));
    overflow: hidden;
    overflow-y: scroll;
`
export const BodyHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 16px;
`
export const BodyTitle = styled.div``
export const Breadcrumb = styled.div`
    background-color: var(--color-gray-500);
    padding: 12px 24px;
    border-radius: 50px;
`
export const Overlay = styled.div`
    ${down('lg')} {
        position: absolute;
        z-index: -1;

        width: 200vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.4);
    }
`
