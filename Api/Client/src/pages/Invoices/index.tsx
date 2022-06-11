import { GridColDef } from '@mui/x-data-grid'
import React, { FC, useEffect, useState } from 'react'
import { useDialog } from '../../hooks/useDialog'
import { useGridData } from '../../hooks/useGridData'
import { IInvoice } from '../../interface/IInvoice'
import { ERole } from '../../utils/enums'
import InvoiceStatus from './components/InvoiceStatus'

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
        createColumn('id', 'Code', 50),
        createColumn('roomNumber', 'Room Name', 120),
        createColumn('type', 'Type', 100),
        createColumn('numberOfBathRoom', 'BathRoom', 100),
        createColumn('numberOfToilet', 'Toilet', 100),
        createColumn('area', 'Area', 100),
        createColumn('price', 'Price', 120),
        renderCell('status', 'Status', 130, InvoiceStatus),
        // renderCell('actions', 'Actions', 130, ActionButtons),
    ]

    useEffect(() => {
        setLoading(true)
        const FetchData = async () => {}
        FetchData()
    }, [page, pageSize])
    return (
        <div>
            <h1>Invoices</h1>
        </div>
    )
}
export default Invoices
