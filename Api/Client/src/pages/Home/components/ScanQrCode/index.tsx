import { Button } from '@mui/material'
import { FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DialogCustom from '../../../../components/DialogCustom'
import Step1 from '../JoinRoomDialog/Step1'
interface IScanQrCodeProps {
    openDialog: boolean
    handleCloseDialog: () => void
}

const ScanQrCode: FC<IScanQrCodeProps> = ({
    openDialog,
    handleCloseDialog,
}) => {
    const navigate = useNavigate()
    const [scanResult, setScanResult] = useState<any>('')

    const handleStep1 = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        navigate(`joinRoom/${scanResult}`)
    }

    return (
        <DialogCustom
            title="Scan QR Room Code"
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
        >
            <form
                onSubmit={handleStep1}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '100%',
                    marginBottom: '16px',
                }}
            >
                <Step1
                    scanResult={scanResult}
                    setScanResult={setScanResult}
                    handleCloseDialog={handleCloseDialog}
                />
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    sx={{ alignSelf: 'flex-end', justifySelf: 'flex-end' }}
                    type="submit"
                >
                    View commitment
                </Button>
            </form>
        </DialogCustom>
    )
}

export default ScanQrCode
