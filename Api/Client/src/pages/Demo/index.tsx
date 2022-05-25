import React, { useState, FC, useEffect, Fragment } from 'react'

import HostelCard from '../../components/Card/HostelCard'
import RoomCard from '../../components/Card/RoomCard'
import StatisticCard from '../../components/Card/StatisticCard'
import DataGridCustom from '../../components/DataGridCustom'
import Loading from '../../components/Loading'
import { Grid, Typography } from '@mui/material'
import {
    GridColDef,
    GridColumnHeaderParams,
    GridValueGetterParams,
} from '@mui/x-data-grid'

import { getRows, IData } from './MockData'
import * as Styled from './styles'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        width: 150,
        editable: false,
        renderHeader: (params: GridColumnHeaderParams) => (
            <strong>First Name</strong>
        ),
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: false,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: false,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
]

interface IDemoProps {}

const Demo: FC<IDemoProps> = (props) => {
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(2)
    const [rows, setRows] = useState<IData[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setRows(getRows(page + 1, pageSize))
    }, [page, pageSize])

    return (
        <React.Fragment>
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <StatisticCard />
                </Grid>
            </Grid>
            <DataGridCustom
                loading={loading}
                rows={rows}
                columns={columns}
                page={page}
                setPage={setPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
                rowsCount={9}
            />
        </React.Fragment>

        // <DataGridCustom
        //     loading={loading}
        //     rows={rows}
        //     columns={columns}
        //     page={page}
        //     setPage={setPage}
        //     pageSize={pageSize}
        //     setPageSize={setPageSize}
        //     rowsCount={9}
        // />
        // <React.Fragment>
        //     <Grid container direction="row" spacing={3}>
        //         <Grid item xs={12} md={6} lg={3}>
        //             <StatisticCard />
        //         </Grid>
        //         <Grid item xs={12} md={6} lg={3}>
        //             <StatisticCard />
        //         </Grid>
        //         <Grid item xs={12} md={6} lg={3}>
        //             <StatisticCard />
        //         </Grid>
        //         <Grid item xs={12} md={6} lg={3}>
        //             <StatisticCard />
        //         </Grid>
        //     </Grid>
        //     <HostelCard />
        //     <RoomCard />
        // </React.Fragment>
    )
}

export default Demo
