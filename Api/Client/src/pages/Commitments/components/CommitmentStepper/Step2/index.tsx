import React, { FC, useEffect, useState } from 'react'
import { IHostel } from '../../../../../interface/IHostel'
import { IRoom } from '../../../../../interface/IRoom'
import { IUser } from '../../../../../interface/IUser'
import { getOwnerOfHostel } from '../../../../../services/hostels'
import CommitmentDetails from '../../CommitmentDetails'

interface IStep2Props {
    values: Record<string, any>
    roomInfo: IRoom
    hostelInfo: IHostel
}

const Step2: FC<IStep2Props> = ({ values, roomInfo, hostelInfo }) => {
    const [owner, setOwner] = useState<IUser>()

    useEffect(() => {
        ;(async () => {
            setOwner(await getOwnerOfHostel(hostelInfo?.id))
        })()
    }, [hostelInfo])

    return (
        <div style={{ width: '80%', margin: '16px auto' }}>
            <CommitmentDetails
                createdDate={values?.createdDate}
                startDate={values?.startDate}
                endDate={values?.endDate}
                overdueDays={values?.overdueDays}
                compensation={values?.compensation}
                owner={owner}
                hostelInfo={hostelInfo}
                roomInfo={roomInfo}
            />
        </div>
    )
}

export default Step2
