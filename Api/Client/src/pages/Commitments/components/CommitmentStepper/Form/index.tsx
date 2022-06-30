import { InputAdornment, styled } from '@mui/material'
import { ChangeEvent } from 'react'
import { ICommitmentValues } from '../../../../../interface/ICommitment'
import { IField } from '../../../../../interface/IField'
import { IHostel } from '../../../../../interface/IHostel'
import { IRoom } from '../../../../../interface/IRoom'

export const fields: IField[] = [
    {
        label: 'Start Date',
        name: 'startDate',
        type: 'date',
        required: true,
    },
    {
        label: 'End Date',
        name: 'endDate',
        type: 'date',
        required: true,
    },
    {
        label: 'Payment Day',
        name: 'paymentDate',
        type: 'number',
        required: false,
        endAdornment: (
            <InputAdornment position="end">day of month</InputAdornment>
        ),
        inputProps: { min: 1, max: 31 },
    },
    {
        label: 'Price',
        name: 'price',
        type: 'number',
        required: true,
        endAdornment: <InputAdornment position="end">vnd</InputAdornment>,
    },
]

export const Input = styled('input')({
    display: 'none',
})

export function returnFileSize(number: number) {
    if (number < 1024) {
        return number + 'bytes'
    } else if (number >= 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + 'KB'
    } else if (number >= 1048576) {
        return (number / 1048576).toFixed(1) + 'MB'
    }
}

export interface IFormProps {
    values: ICommitmentValues
    setValues: (values: ICommitmentValues) => void
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void

    roomInfo: IRoom
    setRoomInfo: (roomInfo: IRoom) => void
    roomOptions: IRoom[]

    hostelInfo: IHostel
    setHostelInfo: (hostelInfo: IHostel) => void
    hostelOptions: IHostel[]
}
