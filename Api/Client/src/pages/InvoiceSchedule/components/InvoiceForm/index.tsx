import { Grid, InputAdornment, MenuItem } from '@mui/material'
import * as React from 'react'
import InputField from '../../../../components/Input/InputField'
import { DaysOfTheWeek } from '../../../../constants/Date'
import { InvoiceCron, InvoiceType } from '../../../../constants/Invoice'

import { IField } from '../../../../interface/IField'
import { IInvoice } from '../../../../interface/IInvoice'
import * as Styled from './styles'

interface IInvoiceFormProps {
    values: Record<string, any>
    setValues: React.Dispatch<React.SetStateAction<IInvoice>>
    handleInputChange: (
        event: React.ChangeEvent<HTMLInputElement>,
        isForce?: boolean
    ) => void
    review?: boolean
}

const InvoiceForm: React.FC<IInvoiceFormProps> = ({
    values,
    setValues,
    handleInputChange,
    review = false,
}) => {
    const roomList = ['701', '702', '703', '704', '705']

    const {
        type,
        roomName,
        cron,
        quantity,
        unitPrice,
        price,
        paymentDate,
        createDate,
        overdueDays,
    } = values
    React.useEffect(() => {
        setValues({
            ...values,
            type: type,
            roomName: roomName,
            cron: cron,
            quantity: type === 'Service' ? 1 : quantity,
            unitPrice: type === 'Service' ? 0 : unitPrice,
            paymentDate: paymentDate,
            createDate: createDate,
            overdueDays: overdueDays,
            price:
                type === 'Service'
                    ? price
                    : quantity && unitPrice
                    ? quantity * unitPrice
                    : price,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        type,
        roomName,
        cron,
        quantity,
        unitPrice,
        price,
        paymentDate,
        createDate,
        overdueDays,
    ])

    const fields: IField[] = [
        {
            label: 'Due Date',
            name: 'dueDate',
            type: 'number',
            required: true,
            multiline: false,
        },
        {
            label: 'Amount',
            name: 'price',
            type: 'number',
            required: true,
            endAdornment: <InputAdornment position="end">vnd</InputAdornment>,
            multiline: false,
        },
        {
            label: 'Detail',
            name: 'content',
            type: 'text',
            required: type === 'Service' ? true : false,
            multiline: true,
        },
    ]

    console.log('price: ' + price)
    return (
        <Styled.FormContainer>
            <Grid container>
                <Styled.GridForm item xs={12} md={6}>
                    <div style={{ width: '350px' }}>
                        <InputField
                            label="Room Name"
                            name="roomName"
                            value={roomName}
                            required={true}
                            select
                            onChange={handleInputChange}
                            InputProps={{
                                readOnly: review,
                            }}
                        >
                            {roomList.map((option, index) => (
                                <MenuItem key={index} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </InputField>
                        <InputField
                            label="Type"
                            name="type"
                            value={type}
                            required={true}
                            select
                            onChange={handleInputChange}
                            InputProps={{
                                readOnly: review,
                            }}
                        >
                            {InvoiceType.map((option, index) => (
                                <MenuItem key={index} value={option.name}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </InputField>
                        <InputField
                            label="Repeat by"
                            name="cron"
                            value={cron}
                            required={true}
                            select
                            onChange={handleInputChange}
                            InputProps={{
                                readOnly: review,
                            }}
                        >
                            {InvoiceCron.map((option, index) => (
                                <MenuItem key={index} value={option.name}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </InputField>
                        <InputField
                            label="Date Created"
                            name="createDate"
                            value={createDate}
                            type={cron === 'Month' ? 'number' : 'text'}
                            required
                            select={cron === 'Month' ? false : true}
                            onChange={handleInputChange}
                            inputProps={{ min: 1, max: 31 }}
                        >
                            {DaysOfTheWeek.map((option, index) => (
                                <MenuItem key={index} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </InputField>
                        <InputField
                            label="Payment Date"
                            name="paymentDate"
                            value={paymentDate}
                            type="number"
                            required
                            onChange={handleInputChange}
                            InputProps={{
                                readOnly: review,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        days
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={
                                cron === 'Month'
                                    ? { min: 1, max: 31 }
                                    : { min: 1, max: 7 }
                            }
                        />
                    </div>
                </Styled.GridForm>
                <Styled.GridForm item xs={12} md={6}>
                    <div style={{ width: '350px' }}>
                        <InputField
                            label="Number of days allowed to be overdue"
                            name="overdueDays"
                            value={overdueDays}
                            type="number"
                            required
                            onChange={handleInputChange}
                            InputProps={{
                                readOnly: review,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        days
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={
                                cron === 'Month'
                                    ? { min: 1, max: 31 }
                                    : { min: 0, max: 7 }
                            }
                        />
                        <Grid container>
                            <Grid item xs={6}>
                                <InputField
                                    label="Quantity"
                                    name="quantity"
                                    value={quantity}
                                    type="number"
                                    required
                                    disabled={type === 'Service' ? true : false}
                                    onChange={handleInputChange}
                                    sx={{
                                        width: 140,
                                        ml: 2,
                                        mt: 3,
                                        mb: 2,
                                        '& .MuiInputLabel-root': {
                                            fontSize: '1.6rem',
                                        },
                                        '& .MuiInputBase-input': {
                                            fontSize: '1.6rem',
                                            height: '3rem',
                                        },
                                        '& .MuiInputAdornment-root > .MuiTypography-root':
                                            {
                                                fontSize: '1.3rem',
                                            },
                                    }}
                                    InputProps={{
                                        readOnly: review,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputField
                                    label="Unit Price"
                                    name="unitPrice"
                                    value={unitPrice}
                                    type="number"
                                    required
                                    disabled={type === 'Service' ? true : false}
                                    onChange={handleInputChange}
                                    sx={{
                                        width: 140,
                                        mt: 3,
                                        mb: 2,
                                        '& .MuiInputLabel-root': {
                                            fontSize: '1.6rem',
                                        },
                                        '& .MuiInputBase-input': {
                                            fontSize: '1.6rem',
                                            height: '3rem',
                                        },
                                        '& .MuiInputAdornment-root > .MuiTypography-root':
                                            {
                                                fontSize: '1.3rem',
                                            },
                                    }}
                                    InputProps={{
                                        readOnly: review,
                                    }}
                                />
                            </Grid>
                        </Grid>
                        {fields.slice(1, 3).map((field, index) => (
                            <InputField
                                key={index}
                                label={field.label}
                                name={field.name}
                                value={values[field.name]}
                                type={field.type}
                                required={field.required}
                                disabled={field.disabled}
                                onChange={handleInputChange}
                                endAdornment={field.endAdornment}
                                multiline={field.multiline}
                                rows={field.multiline ? 4 : 1}
                                InputProps={{
                                    readOnly: review,
                                }}
                            />
                        ))}
                    </div>
                </Styled.GridForm>
            </Grid>
        </Styled.FormContainer>
    )
}
export default InvoiceForm
