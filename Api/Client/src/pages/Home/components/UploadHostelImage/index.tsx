import { Button, Card, CardMedia } from '@mui/material'
import React, { Dispatch, FC, SetStateAction } from 'react'
import * as Styled from './styles'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { styled } from '@mui/material/styles'
import defaultImage from '../../../../assets/images/default_hostel.jpg'
const Input = styled('input')({
    display: 'none',
})

interface IUploadHostelImageProps {
    values: Record<string, any>
    setValues: Dispatch<SetStateAction<any>>
}

const UploadHostelImage: FC<IUploadHostelImageProps> = ({
    values,
    setValues,
}) => {
    const handleChooseImageHostel = (e: any) => {
        setValues({ ...values, image: URL.createObjectURL(e.target.files[0]) })
    }
    return (
        <Styled.Wrapper>
            <Card sx={{ height: '250px', width: '340px' }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={values?.image || defaultImage}
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
            <Styled.Overlay />
        </Styled.Wrapper>
    )
}

export default UploadHostelImage
