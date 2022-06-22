import React, { FC, useEffect } from 'react'
import DataGridCustom from '../../components/DataGridCustom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { useGridData } from '../../hooks/useGridData'
import { setTableInitialState } from '../../slices/tableSlice'
import { createColumns } from './components/Table/Columns'
import { getItem } from '../../utils/LocalStorageUtils'
import { fetchTenantList } from '../../slices/tenantSlide'
import { IRoomTenant } from '../../interface/IRoomTenant'

interface ITenantProps {}

const Tenant: FC<ITenantProps> = (props) => {
    const dispatch = useAppDispatch()
    // table props
    const loading = useAppSelector(({ tenant }) => tenant.isFetchingTenants)
    const rows = useAppSelector(({ tenant }) => tenant.tenantList)
    const columns = createColumns(useGridData<IRoomTenant>())
    const page = useAppSelector(({ table }) => table.page)
    const pageSize = useAppSelector(({ table }) => table.pageSize)
    const numOfTenant = useAppSelector(({ tenant }) => tenant.numOfTenants)

    // reset page and pageSize of table
    useEffect(() => {
        dispatch(setTableInitialState())
    }, [dispatch])

    // fetch data when page or pageSize changes
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
                rowsCount={numOfTenant}
            />
        </>
    )
}

export default Tenant
