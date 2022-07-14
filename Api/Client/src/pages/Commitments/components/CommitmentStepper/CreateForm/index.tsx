import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import * as Styled from './styles'
import ComboBox from '../../../../../components/ComboBox'
import InputField from '../../../../../components/Input/InputField'
import { Box, Button, CardMedia, Typography } from '@mui/material'
import { getItem } from '../../../../../utils/LocalStorageUtils'
import Icon from '../../../../../components/Icon'
import IconButtonCustom from '../../../../../components/Button/IconButtonCustom'
import { fields, Input, returnFileSize, IFormProps } from '../Form'

interface ImageProperties {
    url: string
    name: string
    size: string
}

const CreateForm: FC<IFormProps> = ({
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
    // images state to handle file image change when creating
    // imageUrls state to handle url of image change when creating
    const [images, setImages] = useState<FileList | null>(null)
    const [imageUrls, setImageUrls] = useState<ImageProperties[]>()

    useEffect(() => {}, [])

    const onImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return
        setImages(files)
    }

    // add new image to list
    useEffect(() => {
        if (!images || images.length < 1) return
        const newImageUrls: ImageProperties[] = imageUrls ? [...imageUrls] : []
        const newImages: Array<File | null> = values.images
            ? [...values.images]
            : []
        Array.from(images).forEach((image) => {
            newImageUrls.push({
                url: URL.createObjectURL(image),
                name: image.name,
                size: returnFileSize(image.size)?.toString() || '',
            })
            newImages.push(image)
        })
        setImageUrls(newImageUrls)
        setValues({ ...values, images: newImages })
    }, [images])

    // delete image from list
    const handleRemoveImage = (index: number) => {
        const newImageUrls: ImageProperties[] = imageUrls ? [...imageUrls] : []
        newImageUrls.splice(index, 1)
        const newImages: Array<File | null> = values.images
            ? [...values.images]
            : []
        newImages.splice(index, 1)
        setImageUrls(newImageUrls)
        setValues({ ...values, images: newImages })
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
                        disabled={
                            !hostelInfo || !Object.keys(hostelInfo).length
                        }
                        defaultValue={roomOptions?.[0]}
                        required={true}
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
                        image={imageUrl.url}
                        alt="Commitment Image"
                        sx={{
                            width: 620,
                            height: 877,
                            boxShadow:
                                '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
                        }}
                    />
                    <Typography variant="caption">
                        <i>
                            {imageUrl.name} ({imageUrl.size})
                        </i>
                    </Typography>
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

export default CreateForm
