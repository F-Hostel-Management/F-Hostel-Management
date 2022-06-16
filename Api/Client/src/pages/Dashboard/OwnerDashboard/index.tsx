import React, { FC, Fragment } from 'react'

import StatisticCard from '../../../components/Card/StatisticCard'
import ChartSurvey from '../components/ChartSurvey'
import TenantAgeChart from '../components/TenantAgeChart'
import { AttachMoney, Groups, Hotel, MeetingRoom } from '@mui/icons-material'
import { Grid } from '@mui/material'

interface IOwnerDashboardProps {}

const OwnerDashboard: FC<IOwnerDashboardProps> = (props) => {
    return (
        <Fragment>
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard
                        icon={<MeetingRoom />}
                        label="Total Rooms"
                        count={101}
                        progress={100}
                        bgrColor="#6f42c1"
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard
                        icon={<Hotel />}
                        label="Rooms Available"
                        count={51}
                        progress={50}
                        bgrColor="#fd7e14"
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard
                        icon={<Groups />}
                        label="Total Tenant"
                        count={153}
                        progress={50}
                        bgrColor="#198754"
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard
                        icon={<AttachMoney />}
                        label="Total Revenue"
                        count={22657}
                        progress={70}
                        bgrColor="#0dcaf0"
                    />
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                spacing={2}
                sx={{ marginBottom: '32px' }}
            >
                <Grid item xs={12} lg={8}>
                    <ChartSurvey />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <TenantAgeChart />
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default OwnerDashboard
