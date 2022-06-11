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
}

const InvoiceForm: React.FC<IInvoiceFormProps> = ({
    values,
    setValues,
    handleInputChange,
}) => {
    const roomList = ['701', '702', '703', '704', '705']
    const fields: IField[] = [
        {
            label: 'Payment Term',
            name: 'paymentTerm',
            type: 'date',
            required: true,
            multiline: false,
        },
        {
            label: 'Price',
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
            required: true,
            multiline: true,
        },
    ]
    const { type, roomName, cron } = values
    React.useEffect(() => {
        setValues({ ...values, type: type, roomName: roomName, cron: cron })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type])
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
                            />
                        ))}
                    </div>
                </Styled.GridForm>
                <Styled.GridForm item xs={12} md={6}>
                    <div style={{ width: '350px' }}>
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
                                rows={field.multiline ? 6 : 1}
                            />
                        ))}
                    </div>
                </Styled.GridForm>
            </Grid>
        </Styled.FormContainer>
    )
}
export default InvoiceForm
