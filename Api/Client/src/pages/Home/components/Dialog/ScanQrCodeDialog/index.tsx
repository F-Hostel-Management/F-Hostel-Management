import { Button } from '@mui/material'
import { FC, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DialogCustom from '../../../../../components/DialogCustom'
import ScanQrCode from '../../ScanQrCode'
interface IScanQrCodeDialogProps {
    openDialog: boolean
    handleCloseDialog: () => void
}

const ScanQrCodeDialog: FC<IScanQrCodeDialogProps> = ({
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
                <ScanQrCode
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

export default ScanQrCodeDialog
