import React, { FC } from 'react'

import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

interface IDonutChartProps {
    labels: string[]
    series: number[]
    colors: string[]
}

const DonutChart: FC<IDonutChartProps> = ({
    labels = [],
    series = [],
    colors = [],
}) => {
    const options: ApexOptions = {
        chart: {
            type: 'donut',
        },
        legend: {
            position: 'bottom',
        },
        labels: labels,
        colors: colors,
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            showAlways: true,
                        },
                    },
                },
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                },
            },
        ],
    }

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="donut" />
        </div>
    )
}

export default DonutChart
