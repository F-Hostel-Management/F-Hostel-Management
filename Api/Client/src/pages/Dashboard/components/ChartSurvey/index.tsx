import React, { FC, Fragment } from 'react'

import { ApexOptions } from 'apexcharts'
import Chart from 'react-apexcharts'

import CardShorten from '../../../../components/Card/CardShorten'
import { Typography } from '@mui/material'

import * as Styled from './styles'

interface IChartSurveyProps {}

const ChartSurvey: FC<IChartSurveyProps> = (props) => {
    const options: ApexOptions = {
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            curve: 'smooth',
        },
        labels: [
            'Dec 01',
            'Dec 02',
            'Dec 03',
            'Dec 04',
            'Dec 05',
            'Dec 06',
            'Dec 07',
            'Dec 08',
            'Dec 09 ',
            'Dec 10',
            'Dec 11',
            'Dec 12',
        ],
        markers: {
            size: 0,
        },
        xaxis: {
            type: 'category',
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'July',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ],
        },
        tooltip: {
            x: {
                show: true,
                format: 'dd/MM/yy HH:mm',
            },
        },
    }
    const series = [
        {
            name: '2021',
            data: [50, 35, 80, 51, 49, 45, 70, 90, 69, 50, 55, 45],
        },
        {
            name: '2022',
            data: [40, 32, 75, 55, 60],
        },
    ]
    return (
        <CardShorten title="Income Survey Chart">
            <Fragment>
                <Styled.IncomeStatisticWrapper>
                    <Styled.IncomeStatistic>
                        <Typography variant="body1">
                            <strong>$20</strong>
                        </Typography>
                        <Typography variant="body2">
                            This Month's Income
                        </Typography>
                    </Styled.IncomeStatistic>
                    <Styled.IncomeStatistic>
                        <Typography variant="body1">
                            <strong>$600</strong>
                        </Typography>
                        <Typography variant="body2">
                            This Quarter's Income
                        </Typography>
                    </Styled.IncomeStatistic>
                    <Styled.IncomeStatistic>
                        <Typography variant="body1">
                            <strong>$1357</strong>
                        </Typography>
                        <Typography variant="body2" color="gray">
                            This Year's Income
                        </Typography>
                    </Styled.IncomeStatistic>
                </Styled.IncomeStatisticWrapper>
                <div className="mixed-chart">
                    <Chart
                        options={options}
                        series={series}
                        type="area"
                        height="300"
                    />
                </div>
            </Fragment>
        </CardShorten>
    )
}

export default ChartSurvey
