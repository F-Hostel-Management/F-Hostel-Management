import React, { FC, useEffect } from 'react'
import DataGridCustom from '../../components/DataGridCustom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { useGridData } from '../../hooks/useGridData'
import {
    setPage,
    setPageSize,
    setTableInitialState,
} from '../../slices/tableSlice'
import { createColumns } from './components/Table/Columns'
import { getItem } from '../../utils/LocalStorageUtils'
import { fetchTenantList } from '../../slices/tenantSlide'
import { IRoomTenant } from '../../interface/IRoomTenant'

interface ITenantProps {}

const Tenant: FC<ITenantProps> = (props) => {
    const dispatch = useAppDispatch()
    const role = useAppSelector(({ auth }) => auth.currentUser?.role)
    // table props
    const loading = useAppSelector(({ tenant }) => tenant.isFetchingTenants)
    const rows = useAppSelector(({ tenant }) => tenant.tenantList)
    const columns = createColumns(useGridData<IRoomTenant>())
    const page = useAppSelector(({ table }) => table.page)
    const pageSize = useAppSelector(({ table }) => table.pageSize)
    const numOfTenant = useAppSelector(({ tenant }) => tenant.numOfTenants)
    console.log(rows)
    useEffect(() => {
        dispatch(setTableInitialState())
    }, [dispatch])

    useEffect(() => {
        const hostelId = getItem('currentHostelId')
        dispatch(fetchTenantList({ hostelId, pageSize, page }))
    }, [dispatch, pageSize, page])

    return (
        <>
            <DataGridCustom
                loading={loading}
                title="All Tenants"
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                setPageSize={(pageSize: number) =>
                    dispatch(setPageSize(pageSize))
                }
                page={page}
                setPage={(page: number) => dispatch(setPage(page))}
                rowsCount={numOfTenant}
            />
        </>
    )
}

export default Tenant
