import { Divider, Typography } from '@mui/material'
import moment from 'moment'
import React, { FC } from 'react'
import DialogCustom from '../../../../components/DialogCustom'
import { useForm } from '../../../../hooks/useForm'
import { IInvoice } from '../../../../interface/IInvoice'
import { formatDate } from '../../../../utils/FormatDate'
import { parseContent } from '../../../../utils/InvoiceUtils'
import { IInvoiceProps } from '../../interfaces/IInvoiceProps'
import InvoiceForm from '../InvoiceForm'
import InvoiceStatus from '../InvoiceStatus'
import { Payment } from '../Payment'
import * as Styled from './styles'

interface IInvoiceDetailsProps {
    openDialog: boolean
    handleOpenDialog: () => void
    handleCloseDialog: () => void
    rowData: IInvoice
}

const InvoiceDetails: FC<IInvoiceDetailsProps> = ({
    openDialog,
    handleCloseDialog,
    rowData,
}) => {
    const initial = parseContent(rowData.content ?? '')

    const { values, setValues, handleInputChange } = useForm<IInvoiceProps>({
        content: initial.content,
        dueDate: moment(new Date(rowData.dueDate ?? '')).format('YYYY-MM-DD'),
        invoiceType: rowData.invoiceType ?? '',
        roomId: rowData?.room?.id ?? '',
        price: rowData?.price ?? 0,
        quantity: initial.quantity,
        unitPrice: initial.unitPrice,
    })
    const handleSubmit = async () => {
        //api
        handleCloseDialog()
    }
    return (
        <DialogCustom
            title="Invoice Details"
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            maxWidth="md"
        >
            <Styled.InfoDetail>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'grey.600',
                        mr: 2,
                        flexGrow: 1,
                        textAlign: 'center',
                    }}
                >
                    Creator: {rowData.manager?.name}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'grey.600',
                        mr: 2,
                        flexGrow: 1,
                        textAlign: 'center',
                    }}
                >
                    Create Date: {formatDate(new Date(rowData.date ?? ''))}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'grey.600',
                        flexGrow: 1,
                        textAlign: 'center',
                    }}
                >
                    Tenant Paid:{' '}
                    {rowData.tenantPaid ? rowData.tenantPaid?.name : 'None'}
                </Typography>
            </Styled.InfoDetail>
            <Styled.Payment>
                {rowData.tenantPaid ? (
                    <InvoiceStatus rowData={rowData}></InvoiceStatus>
                ) : (
                    <Payment invoiceId={rowData?.id} />
                )}
            </Styled.Payment>
            <Divider variant="middle" sx={{ m: 4 }} />
            <InvoiceForm
                values={values}
                setValues={setValues}
                handleInputChange={handleInputChange}
                review={true}
            />
        </DialogCustom>
    )
}

export default InvoiceDetails
