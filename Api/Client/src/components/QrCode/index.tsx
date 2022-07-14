import { FunctionComponent } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { downloadBase64Image } from '../../utils/DownloadUtils'
import html2canvas from 'html2canvas'

interface IProps {
    size: number
    link: string
}

const QrCode: FunctionComponent<IProps> = ({ size, link }: IProps) => {
    const onClick = async () => {
        const element = document.querySelector('#qr') as HTMLDivElement
        const qr = await html2canvas(element)
        const url = qr?.toDataURL()
        downloadBase64Image('qr.png', url)
    }

    return (
        <div id="qr">
            <QRCodeCanvas
                bgColor={'#FFFFFF'}
                fgColor={'#17A2B8'}
                size={size}
                value={link}
                style={{
                    padding: '10px',
                    background: '#FFFFFF',
                    cursor: 'pointer',
                }}
                onClick={onClick}
            />
        </div>
    )
}

export default QrCode
