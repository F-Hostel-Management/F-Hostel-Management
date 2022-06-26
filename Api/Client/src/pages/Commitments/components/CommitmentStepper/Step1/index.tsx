import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import * as Styled from './styles'
import ComboBox from '../../../../../components/ComboBox'
import InputField from '../../../../../components/Input/InputField'
import { IField } from '../../../../../interface/IField'
import {
    Avatar,
    Box,
    Button,
    InputAdornment,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    styled,
    Typography,
} from '@mui/material'
import { getItem } from '../../../../../utils/LocalStorageUtils'
import { IRoom } from '../../../../../interface/IRoom'
import { IHostel } from '../../../../../interface/IHostel'
import { ICommitmentValues } from '../../../../../interface/ICommitment'
import defaultImage from '../../../../../assets/images/default-placeholder.png'
interface IStep1Props {
    values: ICommitmentValues
    setValues: (values: ICommitmentValues) => void
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void

    roomInfo: IRoom
    setRoomInfo: (roomInfo: IRoom) => void
    roomOptions: IRoom[]

    hostelInfo: IHostel
    setHostelInfo: (hostelInfo: IHostel) => void
    hostelOptions: IHostel[]

    isUpdate: boolean
}

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

const Input = styled('input')({
    display: 'none',
})

function returnFileSize(number: number) {
    if (number < 1024) {
        return number + 'bytes'
    } else if (number >= 1024 && number < 1048576) {
        return (number / 1024).toFixed(1) + 'KB'
    } else if (number >= 1048576) {
        return (number / 1048576).toFixed(1) + 'MB'
    }
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
    isUpdate,
}) => {
    const [imageUrlList, setImageUrlList] = useState<string[]>()

    const handleChooseImageHostel = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return

        let imageList = values.images || []
        imageList.push(files[0])
        setValues({ ...values, images: imageList })
    }

    useEffect(() => {
        setValues({ ...values, roomId: roomInfo?.id || '' })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomInfo])
    const currentHostelId = getItem('currentHostelId')
    return (
        <Styled.ContainerStep>
            <Styled.LeftSide>
                {!currentHostelId && (
                    <ComboBox
                        label="Hostel"
                        options={hostelOptions}
                        optionLabel="name"
                        valueAutocomplete={hostelInfo}
                        setValueAutocomplete={setHostelInfo}
                        defaultValue={hostelOptions?.[0]}
                    />
                )}

                <ComboBox
                    label="Room"
                    options={roomOptions}
                    optionLabel="roomName"
                    valueAutocomplete={roomInfo}
                    setValueAutocomplete={setRoomInfo}
                    disabled={
                        !hostelInfo ||
                        !Object.keys(hostelInfo).length ||
                        isUpdate
                    }
                    defaultValue={roomOptions?.[0]}
                />
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
                        endAdornment={field.endAdornment}
                        inputProps={field.inputProps}
                    />
                ))}
            </Styled.LeftSide>
            <Styled.RightSide>
                <Paper
                    elevation={3}
                    sx={{
                        width: 400,
                        height: 400,
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">
                            <strong>Upload your commitment</strong>
                        </Typography>
                        <Typography variant="caption">
                            in .PNG, .JDEG or JPG,
                        </Typography>
                    </Box>
                    <label htmlFor="contained-button-file">
                        <Input
                            accept="image/png, image/jpeg"
                            id="contained-button-file"
                            type="file"
                            onChange={(e) => handleChooseImageHostel(e)}
                        />
                        <Button
                            component="span"
                            variant="contained"
                            color="purple"
                            sx={{ width: 300, mb: 2, alignSelf: 'center' }}
                        >
                            Upload
                        </Button>
                    </label>

                    <List
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            overflowY: 'scroll',
                            '::-webkit-scrollbar': {
                                width: 0,
                            },
                        }}
                    >
                        {values.images?.map((image, index) => {
                            console.log('Image: ', image)
                            return (
                                <Link
                                    href="#"
                                    key={index}
                                    color="inherit"
                                    underline="none"
                                >
                                    <ListItem
                                        sx={{
                                            m: 1,
                                            width: 300,
                                            borderRadius: '4px',
                                            boxShadow:
                                                '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
                                        }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                src={defaultImage}
                                                variant="square"
                                                sx={{
                                                    width: 32,
                                                    height: 32,
                                                    filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))',
                                                }}
                                            ></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Typography variant="body2">
                                                    {image.name}
                                                </Typography>
                                            }
                                        />
                                        <Typography variant="caption">
                                            {returnFileSize(image.size)}
                                        </Typography>
                                    </ListItem>
                                </Link>
                            )
                        })}
                    </List>
                </Paper>
            </Styled.RightSide>
        </Styled.ContainerStep>
    )
}

export default Step1
