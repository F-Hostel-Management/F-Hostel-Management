import styled from 'styled-components'
import { Grid, Paper } from '@mui/material'

export const ProfilePaper = styled(Paper)`
    height: 100%;
    overflow-y: auto;
`

export const ProfileHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5%;
`

export const Avatar = styled(Paper)`
    width: 150px;
    height: 150px;
    overflow-y: hidden;
`
export const GridPaper = styled(Grid)`
    padding: 4% 2%;
`
