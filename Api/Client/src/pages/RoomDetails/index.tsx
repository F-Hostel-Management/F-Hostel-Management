import React, { FC } from 'react'
import Details from './components/Details'
import FacilitiesTable from './components/FacilitiesTable'
import * as Styled from './styles'
interface IRoomDetailsProps {}

const RoomDetails: FC<IRoomDetailsProps> = (props) => {
    return (
        <div>
            <Styled.Wrapper>
                <Details />
            </Styled.Wrapper>
            <Styled.Wrapper>
                <FacilitiesTable />
            </Styled.Wrapper>
        </div>
    )
}

export default RoomDetails
