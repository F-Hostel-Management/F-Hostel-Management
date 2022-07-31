import React, { FC } from 'react'
import CardWithImage from '../../../../../components/Card/CardWithImage'
import { Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import CardOptions from '../CardOptions'
import * as Styled from './styles'
import { IHostel } from '../../../../../interface/IHostel'
import { useDispatch } from 'react-redux'
import { setCurrentHostel } from '../../../../../slices/homeSlice'
import { setItem } from '../../../../../utils/LocalStorageUtils'
import { useAppSelector } from '../../../../../hooks/reduxHook'
import defaultImage from '../../../../../assets/images/default_hostel.jpg'
const urlImage = import.meta.env.PUBLIC_FIREBASE_STORAGE_IMAGE

interface IHostelCardProps {
    hostelInfo: IHostel
}

const HostelCard: FC<IHostelCardProps> = ({ hostelInfo }) => {
    let navigate = useNavigate()
    const dispatch = useDispatch()

    const role = useAppSelector(({ auth }) => auth.currentUser?.role)

    const handleClickDetail = () => {
        dispatch(setCurrentHostel(hostelInfo))
        setItem('currentHostelId', hostelInfo?.id)
        navigate('dashboard')
    }
    return (
        <CardWithImage
            image={{
                src: hostelInfo?.imgPath
                    ? urlImage + hostelInfo?.imgPath + '?alt=media'
                    : defaultImage,
                alt: 'Hostel image',
            }}
            content={
                <React.Fragment>
                    <Typography variant="h4" mb={1}>
                        <strong>{hostelInfo.name}</strong>
                    </Typography>
                    <Typography variant="subtitle2" mb={1}>
                        <span
                            style={{
                                paddingRight: '8px',
                                display: 'inline-block',
                            }}
                        >
                            Address:
                        </span>
                        {hostelInfo.address}
                    </Typography>
                    <Typography variant="subtitle2" mb={1}>
                        <span
                            style={{
                                paddingRight: '8px',
                                display: 'inline-block',
                            }}
                        >
                            Number of room:
                        </span>
                        {hostelInfo.numOfRooms || 0}
                    </Typography>

                    {/* <Typography variant="subtitle2" mb={1}>
                        <span
                            style={{
                                paddingRight: '8px',
                                display: 'inline-block',
                            }}
                        >
                            {role === ERole.OWNER_ROLE
                                ? 'Manager: '
                                : 'Owner: '}
                        </span>
                        {hostelInfo.owner?.name}
                    </Typography> */}
                </React.Fragment>
            }
            actions={
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickDetail}
                    size="small"
                >
                    Details
                </Button>
            }
        >
            <Styled.OptionWrapper>
                <CardOptions hostelInfo={hostelInfo} />
            </Styled.OptionWrapper>
        </CardWithImage>
    )
}

export default HostelCard
