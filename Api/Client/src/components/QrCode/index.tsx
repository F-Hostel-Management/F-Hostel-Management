import { FunctionComponent } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { downloadBase64Image } from '../../utils/DownloadUtils'

interface IProps {
    size: number
    link: string
}

const QrCode: FunctionComponent<IProps> = ({ size, link }: IProps) => {
    const onClick = () => {
        const element = document.querySelector(
            '#qr-canvas'
        ) as HTMLCanvasElement
        const url = element?.toDataURL()
        downloadBase64Image('qr.png', url)
    }

    return (
        <QRCodeCanvas
            id="qr-canvas"
            bgColor={'#FFFFFF'}
            fgColor={'#17A2B8'}
            size={size}
            value={link}
            style={{
                padding: '10px',
                background: '#FFFFFF',
            }}
            onClick={onClick}
        />
    )
}

export default QrCode
