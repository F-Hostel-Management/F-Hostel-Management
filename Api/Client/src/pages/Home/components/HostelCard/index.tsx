import React, { FC } from 'react'
import CardWithImage from '../../../../components/Card/CardWithImage'
import { Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ERole } from '../../../../utils/enums'
import CardOptions from '../CardOptions'
import * as Styled from './styles'
import { IHostel } from '../../../../interface/IHostel'
import { useDispatch } from 'react-redux'
import { setCurrentHostel } from '../../../../slices/hostelSlice'
import { setItem } from '../../../../utils/LocalStorageUtils'
interface IHostelCardProps {
    hostelInfo: IHostel
}
const role: ERole = 2
const HostelCard: FC<IHostelCardProps> = ({ hostelInfo }) => {
    let navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClickDetail = () => {
        dispatch(setCurrentHostel(hostelInfo))
        setItem('currentHostelId', hostelInfo?.id)
        navigate('dashboard')
    }
    return (
        <CardWithImage
            image={{
                src: hostelInfo?.imgPath || '',
                alt: 'Hostel image',
            }}
            content={
                <React.Fragment>
                    <Typography variant="h4" mb={1}>
                        <strong>{hostelInfo.name}</strong>
                    </Typography>
                    <Typography variant="subtitle1" mb={1}>
                        <span
                            style={{
                                width: '100px',
                                display: 'inline-block',
                            }}
                        >
                            Adress:
                        </span>
                        {hostelInfo.address}
                    </Typography>
                    <Typography variant="body2" mb={1}>
                        <span
                            style={{
                                width: '100px',
                                display: 'inline-block',
                            }}
                        >
                            {role == ERole.OWNER_ROLE ? ' Manager:' : 'Owner'}
                        </span>
                        Le Xuan Dai
                    </Typography>
                    <Typography variant="body2" mb={1}>
                        <span
                            style={{
                                width: '150px',
                                display: 'inline-block',
                            }}
                        >
                            Number of rooms:
                        </span>
                        {hostelInfo.numOfRooms}
                    </Typography>
                </React.Fragment>
            }
            actions={
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickDetail}
                >
                    Details
                </Button>
            }
        >
            <Styled.OptionWrapper>
                <CardOptions />
            </Styled.OptionWrapper>
        </CardWithImage>
    )
}

export default HostelCard
