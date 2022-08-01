import React, { FC, Fragment, useEffect, useState } from 'react'

import StatisticCard from '../../../components/Card/StatisticCard'
import ChartSurvey from '../components/ChartSurvey'
import TenantAgeChart from '../components/TenantAgeChart'
import { AttachMoney, Groups, Hotel, MeetingRoom } from '@mui/icons-material'
import { Grid } from '@mui/material'
import { getItem } from '../../../utils/LocalStorageUtils'
import { countRooms, countTenants, getRevenue } from '../../../services/ReportService'
import { ERoomStatus } from '../../../utils/enums'
import { IRoom } from '../../../interface/IRoom'

interface IOwnerDashboardProps {}

const OwnerDashboard: FC<IOwnerDashboardProps> = (props) => {
    const [countAllRooms, setCountRooms] = useState<number>(0)
    const [countAvailableRooms, setCountAvailableRooms] = useState<number>(0)
    const [totalRevenue, setTotalRevenue] = useState<number>(0)
    const [countMembers, setCountMembers] = useState<number>(0)

    useEffect(() => {
        const hostelId = getItem('currentHostelId')
        ;(async () => {
            let rooms = countRooms(hostelId)
            let revenue = getRevenue(hostelId)
            let tenants = countTenants(hostelId)
            Promise.all([rooms, revenue, tenants]).then((values) => {
                const [rooms, revenue, tenants] = values
                setCountRooms(rooms.length)
                setCountAvailableRooms(
                    rooms.filter(
                        (room: IRoom) => room.status === ERoomStatus.Available
                    ).length
                )
                setTotalRevenue(revenue.result)
                setCountMembers(tenants.length)
            })
        })()
    }, [])

    return (
        <Fragment>
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard
                        icon={<MeetingRoom />}
                        label="Total Rooms"
                        count={countAllRooms}
                        progress={100}
                        bgrColor="#6f42c1"
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard
                        icon={<Hotel />}
                        label="Rooms Available"
                        count={countAvailableRooms}
                        progress={100}
                        bgrColor="#fd7e14"
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard
                        icon={<Groups />}
                        label="Total Tenant"
                        count={countMembers}
                        progress={100}
                        bgrColor="#198754"
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard
                        icon={<AttachMoney />}
                        label="Total Revenue"
                        count={totalRevenue}
                        progress={100}
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
