import { Button } from '@mui/material'
import React, { FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DialogCustom from '../../../../../components/DialogCustom'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHook'
import { ICommitment } from '../../../../../interface/ICommitment'
import { activateCommitment } from '../../../../../services/CommitmentService'
import { fetchRoomList } from '../../../../../slices/homeSlice'

interface IConfirmCommitmentDialogProps {}

const ConfirmCommitmentDialog: FC<IConfirmCommitmentDialogProps> = ({}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    let { sixDigitsCode } = useParams()
    const currentUser = useAppSelector(({ auth }) => auth.currentUser)

    const [commitment, setCommitment] = useState<ICommitment>()
    const [openDialog, setOpenDialog] = useState<boolean>(true)

    // useEffect(() => {
    //     ;(async () => {
    //         const response = await getCommitmentFromCode(sixDigitsCode || '')
    //         setCommitment(response.result)
    //     })()
    // }, [sixDigitsCode])

    const handleJoinRoom = async () => {
        const response = await activateCommitment(sixDigitsCode || '')
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
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={handleJoinRoom}
                    sx={{ alignSelf: 'flex-end', justifySelf: 'flex-end' }}
                >
                    Join Room
                </Button>
            </div>
        </DialogCustom>
    )
}

export default ConfirmCommitmentDialog
