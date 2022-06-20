import { Paper } from '@mui/material'
import styled from 'styled-components'

export const Image = styled(Paper)`
    height: 250px;
    max-width: 400px;
    width: 100%;
    padding: 2;
    cursor: pointer;
    border-top: 1px solid #dadada;
    border-bottom: 1px solid #dadada;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
    position: relative;
`

export const Text = styled.p`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    margin: 0;
    text-align: center;
    display: none;
    font-weight: 600;
    cursor: pointer;
    justify-content: center;
    align-items: center;
`

export const Img = styled.div`
    &:hover {
        /* background-color: rgba(0, 0, 0, 0.8); */
        p {
            display: flex;
        }
    }
`
