import { Box, Button, CardMedia, Paper, Typography } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DialogCustom from '../../../../../components/DialogCustom'
import { useAppDispatch } from '../../../../../hooks/reduxHook'
import { ICommitment } from '../../../../../interface/ICommitment'
import {
    activateCommitment,
    validateJoiningCode,
} from '../../../../../services/CommitmentService'
import { fetchRoomList } from '../../../../../slices/homeSlice'
import { formatDate } from '../../../../../utils/FormatDate'

interface IConfirmCommitmentDialogProps {}

const ConfirmCommitmentDialog: FC<IConfirmCommitmentDialogProps> = ({}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    let { sixDigitsCode } = useParams()

    const [commitment, setCommitment] = useState<ICommitment>()
    const [openDialog, setOpenDialog] = useState<boolean>(true)

    useEffect(() => {
        ;(async () => {
            const response = await validateJoiningCode({
                sixDigitsCode: sixDigitsCode,
            })
            setCommitment(response.result)
        })()
    }, [sixDigitsCode])

    const handleJoinRoom = async () => {
        const response = await activateCommitment({
            sixDigitsCode: sixDigitsCode,
        })
        if (!response.isError) {
            dispatch(fetchRoomList())
            handleClose()
        }
    }

    const handleClose = () => {
        navigate('/home')
        setOpenDialog(false)
    }

    return (
        <DialogCustom
            title="Commitment Of Room"
            openDialog={openDialog}
            handleCloseDialog={handleClose}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '100%',
                    marginBottom: '16px',
                }}
            >
                <Paper elevation={3} sx={{ width: '90%', p: 4 }}>
                    <Typography variant="body2">
                        <strong>1. Room of rent</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ marginLeft: '2.4rem' }}>
                        <p>
                            - Owner: <strong>{commitment?.owner?.name}</strong>.
                        </p>
                        <p>Rooms for rent have the following features:</p>
                        <p>
                            - Room name:{' '}
                            <strong>{commitment?.room?.roomName}</strong> of{' '}
                            <strong>{commitment?.hostel?.name}</strong>. Total
                            area: {commitment?.room?.area}m<sup>2</sup>{' '}
                            <i>
                                ({commitment?.room?.length}m x{' '}
                                {commitment?.room?.width}m)
                            </i>
                            .
                        </p>
                        <p>- Address: {commitment?.hostel?.address}.</p>
                    </Typography>
                    <Typography variant="body2">
                        <strong>2. Lease term</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ marginLeft: '2.4rem' }}>
                        <p>
                            - From{' '}
                            <strong>
                                {formatDate(
                                    new Date(commitment?.startDate || '')
                                )}
                            </strong>{' '}
                            to{' '}
                            <strong>
                                {formatDate(
                                    new Date(commitment?.endDate || '')
                                )}
                            </strong>
                            .
                        </p>
                    </Typography>
                    <Typography variant="body2">
                        <strong>3. Rental price</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ marginLeft: '2.4rem' }}>
                        <p>
                            <strong>{commitment?.price}</strong> VND/01/month.
                        </p>
                        <p>- Payment method: bank transfer or cash.</p>
                        <p>
                            - Payment period: pay 1 monthly/time, first payment
                            immediately after signing the Contract. Pay the next
                            month&apos;s room use payment at the time of no
                            later than{' '}
                            <strong>{commitment?.paymentDate}</strong> of the
                            preceding month.
                        </p>
                    </Typography>

                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {commitment?.images?.map((image) => (
                            <CardMedia
                                key={image.id}
                                component="img"
                                image={image.imgUrl + '?alt=media'}
                                alt="Commitment Image"
                                sx={{
                                    width: 620,
                                    height: 877,
                                    boxShadow:
                                        '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
                                    m: 2,
                                }}
                            />
                        ))}

                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={handleJoinRoom}
                            sx={{
                                alignSelf: 'flex-end',
                                justifySelf: 'flex-end',
                            }}
                        >
                            Join Room
                        </Button>
                    </Box>
                </Paper>
            </div>
        </DialogCustom>
    )
}

export default ConfirmCommitmentDialog
