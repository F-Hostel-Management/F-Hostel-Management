import { Chip } from '@mui/material'
import * as React from 'react'
import { IInvoice } from '../../../../interface/IInvoice'

interface IInvoiceStatusProps {
    rowData: IInvoice
}

const InvoiceStatus: React.FunctionComponent<IInvoiceStatusProps> = ({
    rowData,
}) => {
    let color = 'default'
    let label = ''

    if (new Date(rowData.dueDate ?? '').getTime() < new Date().getTime()) {
        color = 'error'
        label = 'Overdue'
    } else if (!rowData.tenantPaid) {
        color = 'warning'
        label = 'Unpaid'
    } else {
        color = 'green'
        label = 'Paid'
    }

    return (
        <Chip
            label={label}
            color={color}
            variant="outlined"
            sx={{ width: 90 }}
        />
    )
}

export default InvoiceStatus
