import React, { FC, ChangeEvent, useEffect, useState } from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
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
interface ICommitmentStepperProps {
    handleCloseDialog: () => void
    // useForm hook
    values: ICommitmentValues
    setValues: (values: ICommitmentValues) => void
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    resetForm: () => void
    // handle submit step
    handleSubmitStep2: () => void
    handleSubmitStep3: () => void
    timeSpan: number | null
    sixDigitsCode: string | number
    commitment?: ICommitment
}

const CommitmentStepper: FC<ICommitmentStepperProps> = ({
    handleCloseDialog,
    values,
    setValues,
    handleInputChange,
    resetForm,
    handleSubmitStep2,
    handleSubmitStep3,
    timeSpan,
    handleChange,
    sixDigitsCode,
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
        if (!hostelInfo && !currentHostelId) return
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

    const steps: IStepper[] = [
        {
            name: 'Terms',
            component: (
                <Step1
                    values={values}
                    setValues={setValues}
                    handleInputChange={handleInputChange}
                    roomInfo={roomInfo}
                    setRoomInfo={setRoomInfo}
                    roomOptions={rooms}
                    hostelInfo={hostelInfo}
                    setHostelInfo={setHostelInfo}
                    hostelOptions={hostels}
                    isUpdate={commitment ? true : false}
                />
            ),
            handleNext: () => console.log('Values commit: ', values),
            action: 'Next',
        },
        {
            name: 'Commitment',
            component: (
                <Step2
                    roomInfo={roomInfo}
                    values={values}
                    hostelInfo={hostelInfo}
                />
            ),
            handleNext: handleSubmitStep2,
            action: 'Create',
        },
        {
            name: 'QR code',
            component: (
                <Step3 timeSpan={timeSpan} handleChange={handleChange} />
            ),
            handleNext: handleSubmitStep3,
            action: 'Confirm',
        },
    ]

    return (
        <StepByStep
            steps={steps}
            handleCloseDialog={handleCloseDialog}
            finishedStep={<QrCodeGenerate code={sixDigitsCode} />}
        />
    )
}

export default CommitmentStepper
