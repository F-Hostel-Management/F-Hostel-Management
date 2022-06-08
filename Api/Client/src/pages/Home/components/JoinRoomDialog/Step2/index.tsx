import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { ICommitment } from '../../../../../interface/ICommitment'

import { getCurrentUser } from '../../../../../slices/authSlice'
import CommitmentDetails from '../../../../Commitments/components/CommitmentDetails'

interface IStep2Props {
    commitment: ICommitment
}

const Step2: FC<IStep2Props> = ({ commitment }) => {
    const currentUser = useSelector(getCurrentUser)

    return (
        <div style={{ width: '80%', margin: '16px auto' }}>
            <CommitmentDetails
                createdDate={commitment?.createdDate}
                startDate={commitment?.startDate}
                endDate={commitment?.endDate}
                overdueDays={commitment?.dateOverdue}
                compensation={commitment?.compensation}
                owner={commitment?.owner}
                tenant={commitment?.tenant || currentUser}
                hostelInfo={commitment?.hostel}
                roomInfo={commitment?.room}
                price={commitment?.price}
            />
        </div>
    )
}

export default Step2
