import { Card, CardContent, Paper, Typography } from '@mui/material'
import styled from 'styled-components'
import { down } from 'styled-breakpoints'

export const Container = styled.body`
    background-color: #f5f6fa;
    background-size: cover;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const MyPaper = styled(Paper)`
    padding: 5% 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85%;
    height: 90%;
`

export const Step = styled.div`
    margin: 1%;
    width: 80%;
    ${down('lg')} {
        width: 90%;
    }
    ${down('md')} {
        width: 100%;
    }
`
export const ImgRole = styled.img``

export const RoleCardContent = styled(CardContent)`
    :hover {
        background-color: #ffffff;
    }
`

export const RoleName = styled(Typography)`
    padding: 5% 0;
    color: #444f60;
    text-align: center;
    width: 30vh;
    font-weight: 700;
    ${down('lg')} {
        width: 25vh;
    }
    ${down('md')} {
        width: 20vh;
    }
`

export const MainStep = styled.div`
    padding: 5% 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const RoleCard = styled(Card)`
    width: 30vh;

    display: flex;
    justify-content: center;
    align-items: center;
    ${down('lg')} {
        width: 25vh;
    }
    ${down('md')} {
        width: 20vh;
        height: 150px;
    }
    /* :hover {
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11),
            0 4px 4px rgba(0, 0, 0, 0.11), 0 6px 8px rgba(0, 0, 0, 0.11),
            0 8px 16px rgba(0, 0, 0, 0.11);
    } */
`
