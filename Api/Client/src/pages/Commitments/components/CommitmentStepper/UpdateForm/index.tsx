import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import * as Styled from './styles'
import ComboBox from '../../../../../components/ComboBox'
import InputField from '../../../../../components/Input/InputField'
import { IField } from '../../../../../interface/IField'
import {
    Box,
    Button,
    CardMedia,
    InputAdornment,
    styled,
    Typography,
} from '@mui/material'
import { getItem } from '../../../../../utils/LocalStorageUtils'
import { IRoom } from '../../../../../interface/IRoom'
import { IHostel } from '../../../../../interface/IHostel'
import {
    ICommitment,
    ICommitmentValues,
} from '../../../../../interface/ICommitment'
import Icon from '../../../../../components/Icon'
import IconButtonCustom from '../../../../../components/Button/IconButtonCustom'

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

interface ImageProperties {
    id?: string
    imgUrl: string
}

interface IUpdateFormProps {
    values: ICommitmentValues
    setValues: (values: ICommitmentValues) => void
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void

    roomInfo: IRoom
    setRoomInfo: (roomInfo: IRoom) => void
    roomOptions: IRoom[]

    hostelInfo: IHostel
    setHostelInfo: (hostelInfo: IHostel) => void
    hostelOptions: IHostel[]

    commitment: ICommitment
}

const UpdateForm: FC<IUpdateFormProps> = ({
    values,
    setValues,
    handleInputChange,
    roomInfo,
    setRoomInfo,
    roomOptions,
    hostelInfo,
    setHostelInfo,
    hostelOptions,
    commitment,
}) => {
    const [images, setImages] = useState<FileList | null>()
    const [imageUrls, setImageUrls] = useState<ImageProperties[]>(
        commitment.images || []
    )

    const onImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return
        setImages(files)
    }

    useEffect(() => {
        if (!images || images.length < 1) return
        const newImageUrls: ImageProperties[] = imageUrls ? [...imageUrls] : []
        const newImages: Array<File | null> = values.images
            ? [...values.images]
            : []
        Array.from(images).forEach((image) => {
            newImageUrls.push({
                imgUrl: URL.createObjectURL(image),
            })
            newImages.push(image)
        })
        setImageUrls(newImageUrls)
        setValues({ ...values, images: newImages })
    }, [images])

    const handleRemoveImage = (index: number) => {
        // Update id of image is deleted
        const newDeletedImg: string[] = values.deletedImg
            ? [...values.deletedImg]
            : []
        if (imageUrls[index].id) {
            newDeletedImg.push(imageUrls[index].id || '')
        }
        //Delete image
        const newImageUrls: ImageProperties[] = imageUrls ? [...imageUrls] : []
        newImageUrls.splice(index, 1)
        const newImages: Array<File | null> = values.images
            ? [...values.images]
            : []
        newImages.splice(index, 1)
        // Update state
        setImageUrls(newImageUrls)
        setValues({ ...values, images: newImages, deletedImg: newDeletedImg })
    }

    useEffect(() => {
        setValues({ ...values, roomId: roomInfo?.id || '' })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomInfo])

    const currentHostelId = getItem('currentHostelId')
    return (
        <>
            <Styled.ContainerStep>
                <Styled.LeftSide>
                    {fields.slice(0, 3).map((field) => (
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
                        disabled
                        defaultValue={roomOptions?.[0]}
                    />
                    {fields.slice(3, 4).map((field) => (
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
                </Styled.RightSide>
            </Styled.ContainerStep>
            {imageUrls?.map((imageUrl, index) => (
                <Box
                    key={index}
                    sx={{
                        width: 620,
                        m: '16px auto',
                        textAlign: 'center',
                        position: 'relative',
                    }}
                >
                    <IconButtonCustom
                        textColor="#fff"
                        bgrColor="#495057"
                        sx={{
                            width: '2.8rem',
                            height: '2.8rem',
                            position: 'absolute',
                            top: '-2.4rem',
                            right: '-2.8rem',
                        }}
                        onClick={() => handleRemoveImage(index)}
                    >
                        <Icon name="close" sx={{ fontSize: '1.6rem' }} />
                    </IconButtonCustom>
                    <CardMedia
                        component="img"
                        image={
                            imageUrl.id
                                ? imageUrl.imgUrl + '?alt=media'
                                : imageUrl.imgUrl
                        }
                        alt="Commitment Image"
                        sx={{
                            width: 620,
                            height: 877,
                            boxShadow:
                                '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
                        }}
                    />
                </Box>
            ))}

            <Box
                sx={{
                    width: 620,
                    height: 300,
                    border: '1px dashed #000',
                    m: '16px auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ mb: 2, textAlign: 'center' }}>
                    <Icon
                        name="upload"
                        sx={{ width: 50, height: 50, opacity: 0.8 }}
                    />
                    <Typography variant="subtitle1">
                        <strong>Upload your commitment</strong>
                    </Typography>
                    <Typography variant="caption">
                        in .PNG, .JDEG or JPG,
                    </Typography>
                    <label
                        style={{ display: 'block' }}
                        htmlFor="contained-button-file"
                    >
                        <Input
                            id="contained-button-file"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={onImagesChange}
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
                </Box>
            </Box>
        </>
    )
}

export default UpdateForm
