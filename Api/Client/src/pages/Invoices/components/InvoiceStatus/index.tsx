import { Chip } from '@mui/material'
import * as React from 'react'
import { IInvoice } from '../../../../interface/IInvoice'
import { getInvoiceStatus } from '../../../../services/InvoiceService'

interface IInvoiceStatusProps {
    rowData: IInvoice
}

const InvoiceStatus: React.FunctionComponent<IInvoiceStatusProps> = ({
    rowData,
}) => {
    // let color = 'default'
    // let label = ''
    let status = getInvoiceStatus(rowData)
    // if (new Date(rowData.dueDate ?? '').getTime() < new Date().getTime()) {
    //     color = 'error'
    //     label = 'Overdue'
    // } else if (!rowData.tenantPaid) {
    //     color = 'warning'
    //     label = 'Unpaid'
    // } else {
    //     color = 'green'
    //     label = 'Paid'
    // }

    return (
        <Chip
            label={status.label}
            color={status.color}
            variant="outlined"
            sx={{ width: 90 }}
        />
    )
}

export default InvoiceStatus
