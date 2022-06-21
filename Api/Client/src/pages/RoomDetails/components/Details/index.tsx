import { Button, Paper, Typography } from '@mui/material'
import React, { FC } from 'react'
import * as Styled from './styles'
import {
    SensorDoorOutlined as SensorDoorOutlinedIcon,
    Window as WindowIcon,
    BedOutlined as BedOutlinedIcon,
    BathtubOutlined as BathtubOutlinedIcon,
    WcOutlined as WcOutlinedIcon,
} from '@mui/icons-material'
import { useAppSelector } from '../../../../hooks/reduxHook'

interface IDetailsProps {}

const Details: FC<IDetailsProps> = (props) => {
    const roomDetails = useAppSelector(
        ({ roomDetails }) => roomDetails.roomDetails
    )
    console.log(roomDetails)
    return (
        <Paper elevation={3}>
            <Styled.Container>
                <Styled.Side>
                    <div>
                        <Typography variant="subtitle1">
                            <strong>Name: {roomDetails.roomName} </strong>
                        </Typography>
                        <Styled.List>
                            <Styled.Item>
                                Area: {roomDetails.area} (m<sup>2</sup>)
                            </Styled.Item>
                            <Styled.Item>
                                Length: {roomDetails.length} (m)
                            </Styled.Item>
                            <Styled.Item>
                                Width: {roomDetails.width} (m)
                            </Styled.Item>
                        </Styled.List>
                    </div>
                </Styled.Side>
                <Styled.Side>
                    <Typography variant="subtitle1">
                        <strong>Room Details:</strong>
                    </Typography>
                    <Styled.List>
                        <Styled.Item>
                            <SensorDoorOutlinedIcon />: Doors (
                            {roomDetails.numOfDoors})
                        </Styled.Item>
                        <Styled.Item>
                            <WindowIcon />: Windows({roomDetails.numOfWindows})
                        </Styled.Item>
                        <Styled.Item>
                            <BedOutlinedIcon />: Bedrooms(
                            {roomDetails.numOfBedRooms})
                        </Styled.Item>
                        <Styled.Item>
                            <BathtubOutlinedIcon />: Bathrooms(
                            {roomDetails.numOfBathRooms})
                        </Styled.Item>
                        <Styled.Item>
                            <WcOutlinedIcon />: Toilet({roomDetails.numOfWCs})
                        </Styled.Item>
                    </Styled.List>
                </Styled.Side>
                <div style={{ marginTop: '32px' }}>
                    <Button variant="outlined" color="primary">
                        View Commitment
                    </Button>
                </div>
            </Styled.Container>
        </Paper>
    )
}

export default Details
