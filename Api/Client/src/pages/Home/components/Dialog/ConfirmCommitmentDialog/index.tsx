import { Button } from '@mui/material'
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
import CommitmentDetails from '../../../../Commitments/components/CommitmentDetails'

interface IConfirmCommitmentDialogProps {}

const ConfirmCommitmentDialog: FC<IConfirmCommitmentDialogProps> = () => {
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
            <CommitmentDetails commitment={commitment}>
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
            </CommitmentDetails>
        </DialogCustom>
    )
}

export default ConfirmCommitmentDialog
