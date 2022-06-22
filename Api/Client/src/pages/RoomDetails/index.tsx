import { Grid } from '@mui/material'
import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { fetchRoomDetails } from '../../slices/roomDetailsSlice'
import { ERole } from '../../utils/enums'
import { getItem } from '../../utils/LocalStorageUtils'
import Details from './components/Details'
import FacilitiesTable from './components/FacilitiesTable'
import TenantList from './components/TenantList'
import * as Styled from './styles'
interface IRoomDetailsProps {}

const RoomDetails: FC<IRoomDetailsProps> = (props) => {
    const role = useAppSelector(({ auth }) => auth.currentUser?.role)
    const roomDetails = useAppSelector(
        ({ roomDetails }) => roomDetails.roomDetails
    )
    const params = useParams()
    const roomId =
        role === ERole.TENANT_ROLE ? getItem('currentRoomId') : params.roomId

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchRoomDetails(roomId || ''))
    }, [dispatch])

    return (
        <Styled.Container>
            <Styled.Wrapper>
                <Details />
            </Styled.Wrapper>
            <Styled.Wrapper>
                <FacilitiesTable
                    rows={roomDetails?.facilityManagements}
                    numOfFacilities={roomDetails?.facilityManagements?.length}
                />
            </Styled.Wrapper>
            <Styled.Wrapper>
                <Grid container>
                    <Grid item xs={4}>
                        <TenantList />
                    </Grid>
                    <Grid item xs={8}></Grid>
                </Grid>
            </Styled.Wrapper>
        </Styled.Container>
    )
}

export default RoomDetails
