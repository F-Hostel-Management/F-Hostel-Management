import React, { FC, useEffect, useState } from 'react'
import { getJoiningCode } from '../../../../services/CommitmentService'
import QrCodeGenerate from '../QrCodeGenerate'
interface ICommitmentQrCodeProps {
    commitmentId: string
}

const CommitmentQrCode: FC<ICommitmentQrCodeProps> = ({ commitmentId }) => {
    const [code, setCode] = useState<any>(null)

    const handleClickCreateQr = async () => {
        const response = await getJoiningCode(commitmentId)
        setCode(response.result.sixDigitsCode)
    }

    useEffect(() => {
        handleClickCreateQr()
    }, [])
    return <QrCodeGenerate code={code} />
}

export default CommitmentQrCode
