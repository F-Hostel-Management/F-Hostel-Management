import { Divider, Typography } from '@mui/material'
import moment from 'moment'
import React, { FC } from 'react'
import DialogCustom from '../../../../components/DialogCustom'
import { useForm } from '../../../../hooks/useForm'
import { IDialogOperator } from '../../../../interface/IDialogOperator'
import { IInvoice } from '../../../../interface/IInvoice'
import { getInvoiceStatus } from '../../../../services/InvoiceService'
import { formatDate } from '../../../../utils/FormatDate'
import { IInvoiceProps } from '../../interfaces/IInvoiceProps'
import InvoiceForm from '../InvoiceForm'
import InvoiceStatus from '../InvoiceStatus'
import { Payment } from '../Payment'
import * as Styled from './styles'

interface IInvoiceDetailsProps extends IDialogOperator {
    rowData: IInvoice
}

const InvoiceDetails: FC<IInvoiceDetailsProps> = ({
    openDialog,
    handleCloseDialog,
    rowData,
}) => {
    const { values, setValues, handleInputChange } = useForm<IInvoiceProps>({
        content: rowData?.content ?? '',
        dueDate: moment(new Date(rowData.dueDate ?? '')).format('YYYY-MM-DD'),
        invoiceType: rowData.invoiceType ?? '',
        roomId: rowData?.room?.id ?? '',
        price: rowData?.price ?? 0,
        quantity: rowData.quantity ?? 0,
        lastQuantity: 0,
        unitPrice: rowData?.unitPrice ?? 0,
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
                {getInvoiceStatus(rowData).label != 'Unpaid' ? (
                    <InvoiceStatus rowData={rowData}></InvoiceStatus>
                ) : (
                    <Payment invoiceId={rowData?.id} />
                )}
            </Styled.Payment>
            <Divider variant="middle" sx={{ m: 4 }} />
            <InvoiceForm
                id={rowData?.id ?? ''}
                values={values}
                setValues={setValues}
                handleInputChange={handleInputChange}
                review={true}
            />
        </DialogCustom>
    )
}

export default InvoiceDetails
