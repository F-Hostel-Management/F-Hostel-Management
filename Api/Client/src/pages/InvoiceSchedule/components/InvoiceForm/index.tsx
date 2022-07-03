import { Grid, InputAdornment, MenuItem } from '@mui/material'
import * as React from 'react'
import InputField from '../../../../components/Input/InputField'
import { DaysOfTheWeek } from '../../../../constants/Date'
import { InvoiceCron, InvoiceScheduleType } from '../../../../constants/Invoice'

import { IField } from '../../../../interface/IField'
import { IRoom } from '../../../../interface/IRoom'
import { getRoomNamesByHostelId } from '../../../../services/HostelService'
import { formatPrice } from '../../../../utils/FormatPrice'
import { getItem } from '../../../../utils/LocalStorageUtils'
import { IInvoiceScheduleProps } from '../../interfaces/IInvoiceScheduleProps'
import * as Styled from './styles'

interface IInvoiceFormProps<T> {
    values: T
    setValues: React.Dispatch<React.SetStateAction<T>>
    handleInputChange: (
        event: React.ChangeEvent<HTMLInputElement>,
        isForce?: boolean
    ) => void
    review?: boolean
    isUpdate?: boolean
}

const InvoiceForm: React.FC<IInvoiceFormProps<IInvoiceScheduleProps>> = ({
    values,
    setValues,
    handleInputChange,
    review = false,
    isUpdate,
}) => {
    const [roomList, setRoomList] = React.useState<IRoom[]>([])

    React.useEffect(() => {
        ;(async () => {
            const currentHostelId = getItem('currentHostelId')
            const result = await getRoomNamesByHostelId(currentHostelId)
            setRoomList(result ?? [])
        })()
    }, [])

    const { invoiceType, roomId, price, cron, createDate, paymentDate } = values

    React.useEffect(() => {
        setValues({
            ...values,
            invoiceType: invoiceType,
            roomId: roomId,
            price: price,
        })
    }, [invoiceType, roomId, price])

    const fields: IField[] = [
        {
            label: 'Amount',
            name: 'price',
            type: 'string',
            required: true,
            endAdornment: <InputAdornment position="end">vnd</InputAdornment>,
            multiline: false,
        },
        {
            label: 'Detail',
            name: 'content',
            type: 'text',
            required: invoiceType === 'Service' ? true : false,
            multiline: true,
        },
    ]

    return (
        <Styled.FormContainer>
            <Grid container>
                <Styled.GridForm item xs={12} md={6}>
                    <div style={{ width: '350px' }}>
                        <InputField
                            label="Room Name"
                            name="roomId"
                            value={roomId}
                            required={true}
                            select
                            onChange={handleInputChange}
                            InputProps={{
                                readOnly: review || isUpdate,
                            }}
                        >
                            {roomList.map((room) => (
                                <MenuItem key={room?.id} value={room?.id}>
                                    {room?.roomName}
                                </MenuItem>
                            ))}
                        </InputField>
                        <InputField
                            label="Type"
                            name="invoiceType"
                            value={invoiceType}
                            required={true}
                            select
                            onChange={handleInputChange}
                            InputProps={{
                                readOnly: review,
                            }}
                        >
                            {InvoiceScheduleType.map((option, index) => (
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
                            InputProps={{
                                readOnly: review,
                                endAdornment:
                                    cron === 'Month' ? (
                                        <InputAdornment position="end">
                                            day of every month
                                        </InputAdornment>
                                    ) : (
                                        ''
                                    ),
                            }}
                        >
                            {DaysOfTheWeek.map((option, index) => (
                                <MenuItem key={index} value={index}>
                                    {option}
                                </MenuItem>
                            ))}
                        </InputField>
                    </div>
                </Styled.GridForm>
                <Styled.GridForm item xs={12} md={6}>
                    <div style={{ width: '350px' }}>
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
                        />
                        {fields.map((field, index) => (
                            <InputField
                                key={index}
                                label={field.label}
                                name={field.name}
                                value={
                                    field.name === 'unitPrice' ||
                                    field.name === 'price'
                                        ? formatPrice(values[field.name]) //string
                                        : (values[field.name] as any)
                                }
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
