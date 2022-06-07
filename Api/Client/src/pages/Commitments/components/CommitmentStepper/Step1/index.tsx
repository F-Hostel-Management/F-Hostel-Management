import React, { FC, useEffect } from 'react'
import * as Styled from './styles'
import ComboBox from '../../../../../components/ComboBox'
import InputField from '../../../../../components/Input/InputField'
import { IField } from '../../../../../interface/IField'
import { InputAdornment } from '@mui/material'
interface IStep1Props {
    values: any
    setValues: any
    handleInputChange: any
    roomInfo: Record<string, any>
    setRoomInfo: any
    roomOptions: Array<any>
    hostelInfo: Record<string, any>
    setHostelInfo: any
    hostelOptions: Array<any>
}
const Step1: FC<IStep1Props> = ({
    values,
    setValues,
    handleInputChange,
    roomInfo,
    setRoomInfo,
    roomOptions,
    hostelInfo,
    setHostelInfo,
    hostelOptions,
}) => {
    const fields: IField[] = [
        {
            label: 'Create Date',
            name: 'createdDate',
            type: 'date',
            disabled: true,
            required: true,
        },
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
            label: 'Allowed of days overdue',
            name: 'overdueDays',
            type: 'number',
            required: true,
            endAdornment: <InputAdornment position="end">days</InputAdornment>,
        },
        {
            label: 'Compensation Money',
            name: 'compensation',
            type: 'number',
            required: true,
            endAdornment: <InputAdornment position="end">vnd</InputAdornment>,
        },
        {
            label: 'Maximum People',
            name: 'maximumPeople',
            type: 'number',
            required: false,
            disabled: true,
        },
        {
            label: 'Area',
            name: 'area',
            type: 'number',
            required: false,
            disabled: true,
            endAdornment: (
                <InputAdornment position="end">
                    <div style={{ fontSize: '1.3rem' }}>
                        m<sup>2</sup>
                    </div>
                </InputAdornment>
            ),
        },
        {
            label: 'Price',
            name: 'price',
            type: 'number',
            required: false,
            disabled: true,
            endAdornment: <InputAdornment position="end">vnd</InputAdornment>,
        },
    ]

    useEffect(() => {
        setValues({ ...values, roomId: roomInfo?.id })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomInfo])

    console.log('test: ', values)

    return (
        <Styled.ContainerStep>
            <Styled.LeftSide>
                {fields.slice(0, 5).map((field) => (
                    <InputField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={values[field.name]}
                        onChange={handleInputChange}
                        type={field.type}
                        required={field.required}
                        disabled={field.disabled}
                        endAdornment={field.endAdornment}
                    />
                ))}
            </Styled.LeftSide>
            <Styled.RightSide>
                <ComboBox
                    label="Hostel"
                    options={hostelOptions}
                    optionLabel="name"
                    valueAutocomplete={hostelInfo}
                    setValueAutocomplete={setHostelInfo}
                    defaultValue={hostelOptions?.[0]}
                />
                <ComboBox
                    label="Room"
                    options={roomOptions}
                    optionLabel="roomName"
                    valueAutocomplete={roomInfo}
                    setValueAutocomplete={setRoomInfo}
                    disabled={!hostelInfo || !Object.keys(hostelInfo).length}
                    defaultValue={roomOptions?.[0]}
                />
                {fields.slice(5, 8).map((field) => (
                    <InputField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={roomInfo?.[field.name]}
                        type={field.type}
                        required={field.required}
                        disabled={field.disabled}
                        endAdornment={field.endAdornment}
                    />
                ))}
            </Styled.RightSide>
        </Styled.ContainerStep>
    )
}

export default Step1
