import React, { FC } from 'react'

import StatisticCard from '../../components/Card/StatisticCard'
import RoomCard from './components/RoomCard'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import GroupsIcon from '@mui/icons-material/Groups'
import HotelIcon from '@mui/icons-material/Hotel'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import { Grid } from '@mui/material'

interface IHomeProps {}

const Home: FC<IHomeProps> = (props) => {
    return (
        <React.Fragment>
            <Grid container direction="row" spacing={3} item xs={9.5}>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard
                        icon={<MeetingRoomIcon />}
                        label="Total Rooms"
                        count={95}
                        progress={95}
                        bgrColor="#6777ef"
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard
                        icon={<HotelIcon />}
                        label="Rooms Available"
                        count={55}
                        progress={55}
                        bgrColor="#fd7e14"
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard
                        icon={<GroupsIcon />}
                        label="New Customers"
                        count={145}
                        progress={60}
                        bgrColor="#198754"
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard
                        icon={<AttachMoneyIcon />}
                        label="Total Revenue"
                        count={22567}
                        progress={80}
                        bgrColor="#0dcaf0"
                    />
                </Grid>
            </Grid>
            <RoomCard />
        </React.Fragment>
    )
}

export default Home
