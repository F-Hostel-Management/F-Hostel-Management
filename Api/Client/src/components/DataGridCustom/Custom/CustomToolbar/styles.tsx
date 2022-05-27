import { down } from 'styled-breakpoints'
import styled from 'styled-components'

import { Typography } from '@mui/material'
import { GridToolbarContainer } from '@mui/x-data-grid'

export const GridToolbar = styled(GridToolbarContainer)`
    background-color: var(--color-gray-500);
    color: var(--text-color-light);
    display: flex;
    padding: 0.4rem 0;

    ${down('sm')} {
        display: block;
    }
`

export const WrapperLeft = styled.div`
    flex: 1;
    height: 100%;
    padding: 0.8rem 1.6rem;

    display: flex;
    align-items: center;
`

export const Title = styled(Typography)`
    padding-right: 1.6rem;
    ${down('md')} {
        display: none;
    }
`

export const WrapperRight = styled.div`
    height: 100%;
`
