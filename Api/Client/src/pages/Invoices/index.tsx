import { GridColDef } from '@mui/x-data-grid'
import React, { FC, Fragment, useEffect, useState } from 'react'
import { useDialog } from '../../hooks/useDialog'
import { useGridData } from '../../hooks/useGridData'
import { IInvoice } from '../../interface/IInvoice'
import { ERole } from '../../utils/enums'
import InvoiceStatus from './components/InvoiceStatus'
import ActionButtons from './components/ActionButtons'
import DataGridCustom from '../../components/DataGridCustom'
import ToolbarChildren from './components/ToolbarChildren'
import { getData, invoices } from '../../utils/MockData'
import CreateInvoiceDialog from './components/CreateInvoiceDialog'

interface IInvoicesProps {}

const Invoices: FC<IInvoicesProps> = () => {
    const role: ERole = 1
    const { renderCell, createColumn } = useGridData()

    const [pageSize, setPageSize] = useState<number>(5)
    const [page, setPage] = useState<number>(0)
    const [rows, setRows] = useState<IInvoice[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()

    const columns: GridColDef[] = [
        createColumn('id', 'Code', 70),
        createColumn('roomName', 'Room Name', 100),
        createColumn('type', 'Type', 100),
        createColumn('createDate', 'Create Date', 150),
        createColumn('paymentTerm', 'Payment Term', 150),
        createColumn('price', 'Price', 120),
        renderCell('status', 'Status', 130, InvoiceStatus),
        renderCell('actions', 'Actions', 150, ActionButtons),
    ]

    useEffect(() => {
        setLoading(true)
        const FetchData = async () => {
            const data = getData(page + 1, pageSize, invoices)
            setRows(data)
            setLoading(false)
        }
        FetchData()
    }, [page, pageSize])
    return (
        <Fragment>
            <DataGridCustom
                loading={loading}
                title="All Facilities"
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                setPageSize={setPageSize}
                page={page}
                setPage={setPage}
                rowsCount={27}
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
                    // reloadData={() =>)}
                />
            )}
        </Fragment>
    )
}
export default Invoices
