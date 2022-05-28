import React, { FC, Fragment } from 'react'

import CardShorten from '../../../../components/Card/CardShorten'
import DonutChart from '../../../../components/Chart/DonutChart'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import { Typography } from '@mui/material'

import * as Styled from './styles'

interface ITenantAgeChartProps {}

const TenantAgeChart: FC<ITenantAgeChartProps> = (props) => {
    const colors = ['#adb5bd', '#0dcaf0', '#ffc107', '#dc3545']
    const labels = ['<18', '18-24', '25-40', '>40']
    const series = [18, 95, 30, 10]
    return (
        <CardShorten title="Tenant Age Chart">
            <Fragment>
                <DonutChart labels={labels} colors={colors} series={series} />
            </Fragment>
            <Styled.ChartDetails>
                {labels.map((label, index) => {
                    return (
                        <Styled.Item>
                            <Styled.LeftPartItem>
                                <FiberManualRecordIcon
                                    sx={{ color: colors[index] }}
                                />
                                <Typography variant="caption">
                                    {label}
                                </Typography>
                            </Styled.LeftPartItem>
                            <Typography variant="caption">
                                {series[index]}
                            </Typography>
                        </Styled.Item>
                    )
                })}
            </Styled.ChartDetails>
        </CardShorten>
    )
}

export default TenantAgeChart
