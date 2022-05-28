import { Button, Paper } from '@mui/material'
import styled from 'styled-components'
import { down } from 'styled-breakpoints'
import login from '../../assets/images/login.png'

export const Login = styled.body`
    background-image: url(${login});
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
`

export const Form = styled.div`
    position: absolute;
    margin: 0 10%;
    width: 30%;

    ${down('lg')} {
        width: 60%;
        margin: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`

export const PaperLogin = styled(Paper)`
    padding: 10% 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
`