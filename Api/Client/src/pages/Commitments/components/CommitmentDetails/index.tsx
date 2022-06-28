import { Box, CardMedia, Paper, Typography } from '@mui/material'
import * as React from 'react'
import { ICommitment } from '../../../../interface/ICommitment'
import { formatDate } from '../../../../utils/FormatDate'

interface ICommitmentDetailsProps {
    commitment?: ICommitment
    children?: any
}

const CommitmentDetails: React.FunctionComponent<ICommitmentDetailsProps> = ({
    commitment,
    children,
}) => {
    return (
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
                        <strong>{commitment?.hostel?.name}</strong>. Total area:{' '}
                        {commitment?.room?.area}m<sup>2</sup>{' '}
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
                            {formatDate(new Date(commitment?.startDate || ''))}
                        </strong>{' '}
                        to{' '}
                        <strong>
                            {formatDate(new Date(commitment?.endDate || ''))}
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
                        month&apos;s room use payment at the time of no later
                        than <strong>{commitment?.paymentDate}</strong> of the
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
                    {children}
                </Box>
            </Paper>
        </div>
    )
}

export default CommitmentDetails
