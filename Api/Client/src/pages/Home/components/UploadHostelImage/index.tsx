import { Button, Card, CardMedia } from '@mui/material'
import React, {
    ChangeEvent,
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useState,
} from 'react'
import * as Styled from './styles'
import { PhotoCamera } from '@mui/icons-material'
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
    const handleChooseImageHostel = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, image: e?.target?.files?.[0] })
        console.log('file: ', e?.target?.files?.[0])
    }

    const [urlImage, setUrlImage] = useState<string>()

    useEffect(() => {
        if (values?.image) {
            const reader = new FileReader()
            reader.onload = () => {
                setUrlImage(reader.result as string)
            }
            reader.readAsDataURL(values.image)
        } else {
            setUrlImage(undefined)
        }
    }, [values?.image])

    return (
        <Styled.Wrapper>
            <Card sx={{ height: '250px', width: '340px' }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={urlImage || defaultImage}
                    alt="Hostel Image"
                />
            </Card>
            <Styled.UploadButton htmlFor="contained-button-file">
                <Input
                    accept="image/png, image/jpeg"
                    id="contained-button-file"
                    type="file"
                    onChange={(e) => handleChooseImageHostel(e)}
                />
                <Button
                    variant="contained"
                    color="orange"
                    component="span"
                    size="small"
                    startIcon={<PhotoCamera />}
                >
                    Upload
                </Button>
            </Styled.UploadButton>
            <Styled.Overlay />
        </Styled.Wrapper>
    )
}

export default UploadHostelImage
