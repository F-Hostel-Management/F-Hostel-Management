import { Chip } from '@mui/material'
import * as React from 'react'
import { IInvoice } from '../../../../interface/IInvoice'
import { EInvoiceStatus as Status } from '../../../../utils/enums'

interface IInvoiceStatusProps {
    rowData: IInvoice
}

const InvoiceStatus: React.FunctionComponent<IInvoiceStatusProps> = ({
    rowData,
}) => {
    let color = 'default'
    switch (rowData?.status) {
        case Status.Unpaid: {
            color = 'warning'
            break
        }
        case Status.Paid: {
            color = 'green'
            break
        }
        case Status.Overdue: {
            color = 'error'
            break
        }
    }
    return (
        <Chip
            label={rowData?.status}
            color={color}
            variant="filled"
            sx={{ width: 90 }}
        />
    )
}

export default InvoiceStatus
