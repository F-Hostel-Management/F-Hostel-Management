import { Grid, InputAdornment, MenuItem } from '@mui/material'
import * as React from 'react'
import InputField from '../../../../components/Input/InputField'
import { InvoiceType } from '../../../../constants/Invoice'
import { useAppSelector } from '../../../../hooks/reduxHook'
import { IField } from '../../../../interface/IField'
import { IRoom } from '../../../../interface/IRoom'
import { getRoomNamesByHostelId } from '../../../../services/HostelService'
import { getItem } from '../../../../utils/LocalStorageUtils'
import { compareDateInvoiceFunction } from '../../actions/compareDateInvoiceFunction'
import { IInvoiceProps } from '../../interfaces/IInvoiceProps'
import _ from 'lodash'
import * as Styled from './styles'
import { formatPrice } from '../../../../utils/FormatPrice'

interface IInvoiceFormProps<T> {
    id?: string
    values: T
    setValues: React.Dispatch<React.SetStateAction<T>>
    handleInputChange: (
        event: React.ChangeEvent<HTMLInputElement>,
        isForce?: boolean
    ) => void
    review?: boolean
}

const InvoiceForm: React.FC<IInvoiceFormProps<IInvoiceProps>> = ({
    id,
    values,
    setValues,
    handleInputChange,
    review = false,
}) => {
    const [roomList, setRoomList] = React.useState<IRoom[]>([])
    const format = {
        unitPrice: '0',
        price: '',
    }
    const [unitPriceFormat, setUnitPriceFormat] = React.useState<string>('0')
    const [priceFormat, setPriceFormat] = React.useState<string>()
    const valueFormat = [{ name: unitPriceFormat }, { name: priceFormat }]

    React.useEffect(() => {
        ;(async () => {
            const currentHostelId = getItem('currentHostelId')
            const result = await getRoomNamesByHostelId(currentHostelId)
            setRoomList(result ?? [])
        })()
    }, [])

    const { invoiceType, roomId, quantity, lastQuantity, unitPrice, price } =
        values
    const invoices = useAppSelector(({ invoice }) => {
        if (id)
            return invoice.invoiceList.filter(
                (i) =>
                    i.invoiceType === invoiceType &&
                    i.room?.id == roomId &&
                    i.id != id
            )
        else
            return invoice.invoiceList.filter(
                (i) => i.invoiceType === invoiceType && i.room?.id == roomId
            )
    })
    React.useEffect(() => {
        const sortedDateInvoices = invoices.sort(compareDateInvoiceFunction)
        const _lastQuantity = _.first(sortedDateInvoices)?.quantity ?? 0
        setValues({ ...values, lastQuantity: _lastQuantity })
    }, [invoices])

    React.useEffect(() => {
        setValues({
            ...values,
            invoiceType: invoiceType,
            roomId: roomId,
            quantity:
                invoiceType === 'Service' || invoiceType === 'House'
                    ? 1
                    : quantity,
            lastQuantity:
                invoiceType === 'Service' || invoiceType === 'House'
                    ? 0
                    : lastQuantity,
            unitPrice: unitPrice,
            price: (quantity - lastQuantity) * unitPrice,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [invoiceType, roomId, quantity, unitPrice, price])

    const fields: IField[] = [
        {
            label: 'Due Date',
            name: 'dueDate',
            type: 'date',
            required: true,
            multiline: false,
        },
        {
            label: 'Unit Price',
            name: 'unitPrice',
            type: 'string',
            disabled: false,
            required: true,
            endAdornment: <InputAdornment position="end">vnd</InputAdornment>,
            multiline: false,
        },
        {
            label: 'Amount',
            name: 'price',
            type: 'string',
            disabled: true,
            required: true,
            endAdornment: <InputAdornment position="end">vnd</InputAdornment>,
            multiline: false,
        },
        {
            label: 'Detail',
            name: 'content',
            type: 'text',
            required: invoiceType === 'Service' ? true : false,
            multiline: false,
        },
    ]

    // console.log('price: ' + formatPrice(price))
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
                                readOnly: review || id,
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
                            {InvoiceType.map((option, index) => (
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
                                    disabled={
                                        invoiceType === 'Service' ||
                                        invoiceType === 'House'
                                            ? true
                                            : false
                                    }
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
                                    label="Last quantity"
                                    name="lastQuantity"
                                    value={lastQuantity}
                                    type="number"
                                    disabled={true}
                                    onChange={handleInputChange}
                                    sx={{
                                        width: 140,
                                        ml: 0,
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
                        {fields.slice(1, 4).map((field, index) => (
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
                                onChange={(e) => {
                                    handleInputChange(e)
                                }}
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
