import { Divider, Typography } from '@mui/material'
import React, { FC } from 'react'
import DialogCustom from '../../../../components/DialogCustom'
import { useForm } from '../../../../hooks/useForm'
import { IInvoice } from '../../../../interface/IInvoice'
import InvoiceForm from '../InvoiceForm'
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
    const { values, setValues, handleInputChange, resetForm } =
        useForm<IInvoice>(rowData)
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
                    Creator: Panh {/*userName*/}
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
                    Create Date: 3/4/2021 {/*Create Date*/}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'grey.600',
                        flexGrow: 1,
                        textAlign: 'center',
                    }}
                >
                    Tenant Paid: Panh {/**/}
                </Typography>
            </Styled.InfoDetail>
            <Payment />
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
