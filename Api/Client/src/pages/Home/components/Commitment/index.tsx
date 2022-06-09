import { Button } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DialogCustom from '../../../../components/DialogCustom'
import { ICommitment } from '../../../../interface/ICommitment'
import {
    activateCommitment,
    getCommitmentFromCode,
} from '../../../../services/CommitmentService'
import Step2 from '../../components/JoinRoomDialog/Step2'

interface ICommitmentProps {}

const Commitment: FC<ICommitmentProps> = ({}) => {
    const navigate = useNavigate()
    let { sixDigitsCode } = useParams()
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
                <Step2 commitment={commitment || {}} />
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

export default Commitment
