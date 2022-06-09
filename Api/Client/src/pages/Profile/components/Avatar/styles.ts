import { Paper } from '@mui/material'
import styled from 'styled-components'
export const Avatar = styled(Paper)`
    width: 150px;
    height: 150px;
    overflow-y: hidden;
    border: 1px solid #d8d8d8;
    cursor: pointer;

    position: relative;
    &:hover {
        p {
            display: flex;
        }
    }
`

export const IconAvatar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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

    justify-content: center;
    align-items: center;
`
