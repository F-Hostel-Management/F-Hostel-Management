import { Button, Card, CardMedia } from '@mui/material'
import React, { FC, useState } from 'react'
import InputField from '../../../../components/Input/InputField'
import { IField } from '../../../../interface/IField'
import * as Styled from './styles'
import { styled } from '@mui/material/styles'
const Input = styled('input')({
    display: 'none',
})
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

interface IHostelFormProps {
    values: any
    setValues: any
    handleInputChange: any
}

const HostelForm: FC<IHostelFormProps> = ({
    values,
    setValues,
    handleInputChange,
}) => {
    const fields: IField[] = [
        {
            label: 'Name',
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            label: 'Address',
            name: 'address',
            type: 'text',
            required: true,
        },
        {
            label: 'Number of rooms',
            name: 'numOfRooms',
            type: 'number',
            required: true,
        },
    ]

    const [image, setImage] = useState<string>()

    const handleChooseImageHostel = (e: any) => {
        setImage(URL.createObjectURL(e.target.files[0]))
    }
    return (
        <Styled.ContainerStep>
            <Styled.LeftSide>
                <Card sx={{ height: '300', width: '100%' }}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={image}
                        alt="Hostel Image"
                    />
                </Card>
                <Styled.UploadButton htmlFor="contained-button-file">
                    <Input
                        accept="image/*"
                        id="contained-button-file"
                        multiple={false}
                        type="file"
                        onChange={handleChooseImageHostel}
                    />
                    <Button
                        variant="contained"
                        color="orange"
                        component="span"
                        size="small"
                        startIcon={<PhotoCameraIcon />}
                    >
                        Upload
                    </Button>
                </Styled.UploadButton>
            </Styled.LeftSide>
            <Styled.RightSide>
                {fields.slice(0, 3).map((field) => (
                    <InputField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={values[field.name]}
                        type={field.type}
                        required={field.required}
                        disabled={field.disabled}
                        endAdornment={field.endAdornment}
                        onChange={handleInputChange}
                    />
                ))}
            </Styled.RightSide>
        </Styled.ContainerStep>
    )
}

export default HostelForm
