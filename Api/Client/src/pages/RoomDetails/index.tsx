import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { fetchRoomDetails } from '../../slices/roomDetailsSlice'
import Details from './components/Details'
import FacilitiesTable from './components/FacilitiesTable'
import * as Styled from './styles'
interface IRoomDetailsProps {}

const RoomDetails: FC<IRoomDetailsProps> = (props) => {
    const roomDetails = useAppSelector(
        ({ roomDetails }) => roomDetails.roomDetails
    )

    const dispatch = useAppDispatch()
    const { roomId } = useParams()

    useEffect(() => {
        dispatch(fetchRoomDetails(roomId || ''))
    }, [dispatch])

    return (
        <div>
            <Styled.Wrapper>
                <Details />
            </Styled.Wrapper>
            <Styled.Wrapper>
                <FacilitiesTable
                    rows={roomDetails?.facilityManagements}
                    numOfFacilities={roomDetails?.facilityManagements?.length}
                />
            </Styled.Wrapper>
        </div>
    )
}

export default RoomDetails
