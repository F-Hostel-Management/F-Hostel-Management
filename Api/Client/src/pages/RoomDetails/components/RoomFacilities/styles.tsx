import { Paper } from '@mui/material'
import styled from 'styled-components'

export const Container = styled.div`
    width: 80%;
    min-height: 350px;
    margin: auto;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
export const PaperMUI = styled(Paper)`
    width: 100%;
    flex: 1;
`
export const GroupButton = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & button {
        margin: 8px;
    }
`
