import React, { FC, useEffect } from 'react'
import * as Styled from './styles'
import ComboBox from '../../../../../components/ComboBox'
import InputField from '../../../../../components/Input/InputField'
import { IField } from '../../../../../interface/field'

const fields: IField[] = [
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
    },
    {
        label: 'Compensation Money',
        name: 'compensation',
        type: 'number',
        required: true,
    },
    {
        label: 'Type',
        name: 'type',
        type: 'text',
        required: false,
        disabled: true,
    },
    {
        label: 'Area',
        name: 'area',
        type: 'number',
        required: false,
        disabled: true,
    },
    {
        label: 'Price',
        name: 'price',
        type: 'number',
        required: false,
        disabled: true,
    },
]
interface IStep1Props {
    values: any
    setValues: any
    handleInputChange: any
    roomInfo: Record<string, any>
    setRoomInfo: any
    roomOptions: Array<any>
}
const Step1: FC<IStep1Props> = ({
    values,
    setValues,
    handleInputChange,
    roomInfo,
    setRoomInfo,
    roomOptions,
}) => {
    useEffect(() => {
        console.log('Autocomplete: ', roomInfo)
        console.log('Values: ', values)
        setValues({ ...values, roomId: roomInfo?.id })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomInfo])

    return (
        <Styled.ContainerStep>
            <Styled.LeftSide>
                {fields.slice(0, 4).map((field) => (
                    <InputField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={values[field.name]}
                        onChange={handleInputChange}
                        type={field.type}
                        required={field.required}
                        disabled={field.disabled}
                    />
                ))}
            </Styled.LeftSide>
            <Styled.RightSide>
                <ComboBox
                    label="Rooms"
                    options={roomOptions}
                    optionLabel="roomNumber"
                    valueAutocomplete={roomInfo}
                    setValueAutocomplete={setRoomInfo}
                />
                {fields.slice(4, 7).map((field) => (
                    <InputField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={roomInfo?.[field.name]}
                        type={field.type}
                        required={field.required}
                        disabled={field.disabled}
                    />
                ))}
            </Styled.RightSide>
        </Styled.ContainerStep>
    )
}

export default Step1
