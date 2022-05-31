import { FunctionComponent } from 'react'
import { QRCodeSVG } from 'qrcode.react'

interface IProps {
    size: number
    link: string
}

const QrCode: FunctionComponent<IProps> = ({ size, link }: IProps) => {
    return (
        <QRCodeSVG
            bgColor={'#FFFFFF'}
            fgColor={'#17A2B8'}
            size={size}
            value={link}
            style={{
                padding: '10px',
                background: '#FFFFFF',
            }}
        />
    )
}

export default QrCode
