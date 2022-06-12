import { Grid, InputAdornment, MenuItem } from '@mui/material'
import * as React from 'react'
import InputField from '../../../../components/Input/InputField'
import { InvoiceCron, InvoiceType } from '../../../../constants/Invoice'
import { IField } from '../../../../interface/IField'
import * as Styled from './styles'

interface IInvoiceFormProps {
    values: any
    setValues: any
    handleInputChange: any
    review?: boolean
}

const InvoiceForm: React.FC<IInvoiceFormProps> = ({
    values,
    setValues,
    handleInputChange,
    review = false,
}) => {
    const roomList = ['701', '702', '703', '704', '705']

    const { type, roomName, cron, quantity, unitPrice, price } = values
    React.useEffect(() => {
        setValues({
            ...values,
            type: type,
            roomName: roomName,
            cron: cron,
            quantity: type === 'Service' ? 1 : quantity,
            unitPrice: type === 'Service' ? 0 : unitPrice,
            price: type === 'Service' ? price : quantity * unitPrice,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, roomName, cron, quantity, unitPrice, price])

    const fields: IField[] = [
        {
            label: 'Due Date',
            name: 'dueDate',
            type: 'date',
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
                        {fields.slice(0, 1).map((field, index) => (
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
                                InputProps={{
                                    readOnly: review,
                                }}
                            />
                        ))}
                    </div>
                </Styled.GridForm>
                <Styled.GridForm item xs={12} md={6}>
                    <div style={{ width: '350px' }}>
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
