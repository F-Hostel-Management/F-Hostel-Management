import { GridColDef } from '@mui/x-data-grid'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useDialog } from '../../hooks/useDialog'
import { useGridData } from '../../hooks/useGridData'
import { ERole } from '../../utils/enums'
import InvoiceStatus from './components/InvoiceStatus'
import ActionButtons from './components/ActionButtons'
import DataGridCustom from '../../components/DataGridCustom'
import ToolbarChildren from './components/ToolbarChildren'
import CreateInvoiceDialog from './components/CreateInvoiceDialog'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook'
import { setTableInitialState } from '../../slices/tableSlice'
import { fetchInvoices, fetchNumberOfInvoice } from '../../slices/invoiceSlice'
import { IInvoice } from '../../interface/IInvoice'
import { formatDate } from '../../utils/FormatDate'
import { getItem } from '../../utils/LocalStorageUtils'
import { getUserRole } from '../../slices/authSlice'

interface IInvoicesProps {}

const Invoices: FC<IInvoicesProps> = () => {
    const role = useAppSelector(getUserRole)
    const { renderCell, createColumn, renderValueGetter } =
        useGridData<IInvoice>()

    const [loading, setLoading] = useState<boolean>(true)
    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()

    const columns: GridColDef[] = [
        createColumn('invoiceCode', 'Code', 70),
        renderValueGetter(
            'roomName',
            'Room',
            100,
            (params) => params.room?.roomName ?? ''
        ),
        createColumn('invoiceType', 'Type', 100),
        renderValueGetter('date', 'Create date', 150, (params) =>
            formatDate(new Date(params.date ?? ''))
        ),
        renderValueGetter('dueData', 'Due date', 150, (params) =>
            formatDate(new Date(params.dueDate ?? ''))
        ),
        createColumn('price', 'Price', 120),
        renderCell('status', 'Status', 130, InvoiceStatus),
        renderCell('actions', 'Actions', 150, ActionButtons),
    ]

    const rows = useAppSelector(({ invoice }) =>
        invoice.invoiceList.filter((invoice) => invoice.price !== 0)
    )
    const numOfInvoice = useAppSelector(({ invoice }) => invoice.numOfInvoice)
    const currentPage = useAppSelector(({ table }) => table.page)
    const currentPageSize = useAppSelector(({ table }) => table.pageSize)
    const currentHostelId = getItem('currentHostelId')

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTableInitialState())
    }, [dispatch])

    const getInvoicesUI = async () => {
        setLoading(true)
        dispatch(fetchInvoices({ currentPageSize, currentPage }))
        dispatch(fetchNumberOfInvoice())
        setLoading(false)
    }

    useEffect(() => {
        getInvoicesUI()
    }, [dispatch, currentPageSize, currentPage, currentHostelId])
    return (
        <Fragment>
            <DataGridCustom
                loading={loading}
                title="All Invoice"
                rows={rows}
                columns={columns}
                // pageSize={currentPageSize}
                // setPageSize={(pageSize: number) =>
                //     dispatch(setPageSize(pageSize))
                // }
                // page={currentPage}
                // setPage={(page: number) => dispatch(setPage(page))}
                rowsCount={numOfInvoice}
                toolbarChildren={
                    role != ERole.TENANT_ROLE ? (
                        <ToolbarChildren handleOpenCreate={handleOpenCreate} />
                    ) : null
                }
            />

            {openCreate && (
                <CreateInvoiceDialog
                    openDialog={openCreate}
                    handleCloseDialog={handleCloseCreate}
                    reloadData={async () => getInvoicesUI()}
                />
            )}
        </Fragment>
    )
}
export default Invoices
