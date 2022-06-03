import React, { FC } from 'react'
import CommitmentDetails from '../../../../Commitments/components/CommitmentDetails'

interface IStep2Props {
    createDate?: string | null
    startDate?: string | null
    endDate?: string | null
    overdueDays?: number | null
    compensation?: number | null
    roomInfo?: Record<string, any> | null
}

const Step2: FC<IStep2Props> = ({
    createDate,
    startDate,
    endDate,
    overdueDays,
    compensation,
    roomInfo,
}) => {
    return (
        <div style={{ width: '80%', margin: '16px auto' }}>
            <CommitmentDetails />
        </div>
    )
}

export default Step2
