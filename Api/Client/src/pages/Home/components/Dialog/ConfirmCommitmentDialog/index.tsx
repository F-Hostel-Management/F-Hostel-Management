import { Button } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DialogCustom from '../../../../../components/DialogCustom'
import { useAppSelector } from '../../../../../hooks/reduxHook'
import { ICommitment } from '../../../../../interface/ICommitment'
import {
    activateCommitment,
    getCommitmentFromCode,
} from '../../../../../services/CommitmentService'
import CommitmentDetails from '../../../../Commitments/components/CommitmentDetails'

interface IConfirmCommitmentDialogProps {}

const ConfirmCommitmentDialog: FC<IConfirmCommitmentDialogProps> = ({}) => {
    const navigate = useNavigate()
    let { sixDigitsCode } = useParams()
    const currentUser = useAppSelector(({ auth }) => auth.currentUser)

    const [commitment, setCommitment] = useState<ICommitment>()
    const [openDialog, setOpenDialog] = useState<boolean>(true)

    useEffect(() => {
        ;(async () => {
            const response = await getCommitmentFromCode(sixDigitsCode || '')
            setCommitment(response.result)
        })()
    }, [sixDigitsCode])

    const handleStep2 = async () => {
        const response = await activateCommitment({
            sixDigitsJoiningCode: sixDigitsCode,
        })
        handleClose()
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
                <div style={{ width: '80%', margin: '16px auto' }}>
                    <CommitmentDetails
                        createdDate={commitment?.createdDate}
                        startDate={commitment?.startDate}
                        endDate={commitment?.endDate}
                        overdueDays={commitment?.dateOverdue}
                        compensation={commitment?.compensation}
                        owner={commitment?.owner}
                        tenant={commitment?.tenant || currentUser}
                        hostelInfo={commitment?.hostel}
                        roomInfo={commitment?.room}
                        price={commitment?.price}
                    />
                </div>
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={handleStep2}
                    sx={{ alignSelf: 'flex-end', justifySelf: 'flex-end' }}
                >
                    Join Room
                </Button>
            </div>
        </DialogCustom>
    )
}

export default ConfirmCommitmentDialog
