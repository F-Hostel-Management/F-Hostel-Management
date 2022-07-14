import React, { FC, ChangeEvent, useEffect, useState } from 'react'
import StepByStep from '../../../../components/StepByStep'
import { IStepper } from '../../../../interface/IStepper'
import {
    getListHostel,
    getRoomOfHostel,
} from '../../../../services/HostelService'
import { useSelector } from 'react-redux'
import { getCurrentHostel } from '../../../../slices/homeSlice'
import QrCodeGenerate from '../QrCodeGenerate'
import {
    ICommitment,
    ICommitmentValues,
} from '../../../../interface/ICommitment'
import { ERoomStatus } from '../../../../utils/enums'
import { IRoom } from '../../../../interface/IRoom'
import { IHostel } from '../../../../interface/IHostel'
import CreateForm from './CreateForm'
import UpdateForm from './UpdateForm'

interface ICommitmentStepperProps {
    handleCloseDialog: () => void
    // useForm hook
    values: ICommitmentValues
    setValues: (values: ICommitmentValues) => void
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
    resetForm: () => void
    // handle submit step
    handleSubmit: () => Promise<boolean> | boolean
    commitment?: ICommitment
}

const CommitmentStepper: FC<ICommitmentStepperProps> = ({
    handleCloseDialog,
    values,
    setValues,
    handleInputChange,
    resetForm,
    handleSubmit,
    commitment,
}) => {
    const currentHostel = useSelector(getCurrentHostel)
    const [rooms, setRooms] = useState([])
    const [hostels, setHostels] = useState([])
    const [roomInfo, setRoomInfo] = useState<IRoom>({})
    const [hostelInfo, setHostelInfo] = useState<IHostel>({})

    useEffect(() => {
        if (localStorage.getItem('currentHostelId')) {
            if ('id' in currentHostel) {
                setHostelInfo(currentHostel)
            }
        } else {
            ;(async () => {
                const hostelList = await getListHostel()
                setHostelInfo(hostelList?.[0])
                setHostels(hostelList)
            })()
        }
    }, [currentHostel])
    useEffect(() => {
        const currentHostelId = localStorage.getItem('currentHostelId')
        if (!hostelInfo.id && !currentHostelId) return
        ;(async () => {
            let roomList = await getRoomOfHostel(
                currentHostelId || hostelInfo?.id || ''
            )
            roomList = roomList.filter(
                (room: IRoom) => room.status === ERoomStatus.Available
            )
            setRoomInfo(commitment?.room || roomList?.[0])
            setRooms(roomList)
        })()
    }, [commitment?.room, hostelInfo])

    const formProps = {
        values,
        setValues,
        handleInputChange,
        roomInfo,
        setRoomInfo,
        roomOptions: rooms,
        hostelInfo,
        setHostelInfo,
        hostelOptions: hostels,
    }

    const steps: IStepper[] = [
        {
            name: 'Commitment Information',
            component: commitment ? (
                <UpdateForm {...formProps} commitment={commitment} />
            ) : (
                <CreateForm {...formProps} />
            ),
            handleNext: handleSubmit,
            action: commitment ? 'Update' : 'Create',
        },
        {
            name: 'QR code',
            component: (
                <QrCodeGenerate code={commitment?.sixDigitsCode || ''} />
            ),
            handleNext: () => {
                return true
            },
            action: 'Next',
        },
    ]

    return <StepByStep steps={steps} handleCloseDialog={handleCloseDialog} />
}

export default CommitmentStepper
