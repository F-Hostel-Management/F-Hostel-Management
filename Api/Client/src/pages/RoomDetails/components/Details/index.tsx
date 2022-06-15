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

interface IDetailsProps {}

const Details: FC<IDetailsProps> = (props) => {
    return (
        <Paper elevation={3}>
            <Styled.Container>
                <Styled.Side>
                    <div>
                        <Typography variant="subtitle1">
                            <strong>Room name: HB Room </strong>
                        </Typography>
                        <Styled.List>
                            <Styled.Item>
                                Area: 25 (m<sup>2</sup>)
                            </Styled.Item>
                            <Styled.Item>Length: 5 (m)</Styled.Item>
                            <Styled.Item>Width: 5 (m)</Styled.Item>
                        </Styled.List>
                    </div>
                    <div>
                        <Button variant="contained" color="primary">
                            View Commitments
                        </Button>
                    </div>
                </Styled.Side>
                <Styled.Side>
                    <Typography variant="subtitle1">
                        <strong>Room Details</strong>
                    </Typography>
                    <Styled.List>
                        <Styled.Item>
                            <SensorDoorOutlinedIcon /> Doors(1)
                        </Styled.Item>
                        <Styled.Item>
                            <WindowIcon />
                            Windows(2)
                        </Styled.Item>
                        <Styled.Item>
                            <BedOutlinedIcon /> Bedrooms(2)
                        </Styled.Item>
                        <Styled.Item>
                            <BathtubOutlinedIcon />
                            Bathrooms(2)
                        </Styled.Item>
                        <Styled.Item>
                            <WcOutlinedIcon /> Toilet(2)
                        </Styled.Item>
                    </Styled.List>
                </Styled.Side>
                <Styled.Side>
                    <Typography variant="subtitle1">
                        <strong>Tenants </strong>
                    </Typography>
                    <Styled.List>
                        <Styled.Item>Bùi Ngọc Huy</Styled.Item>
                        <Styled.Item>Nguyễn Nhật Huy</Styled.Item>
                        <Styled.Item>Đặng Phương Anh</Styled.Item>
                        <Styled.Item>Nguyễn Tâm Đắc</Styled.Item>
                    </Styled.List>
                    <Typography variant="subtitle1">
                        <strong>Managers </strong>
                    </Typography>
                    <Styled.List>
                        <Styled.Item>Lê Xuân Đại</Styled.Item>
                    </Styled.List>
                </Styled.Side>
            </Styled.Container>
        </Paper>
    )
}

export default Details
