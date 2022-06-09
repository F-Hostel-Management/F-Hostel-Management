import React, {
    FC,
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react'
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
const baseUrl = import.meta.env.PUBLIC_FRONTEND
interface ICommitmentStepperProps {
    handleCloseDialog: () => void
    values: Record<string, any>
    setValues: Dispatch<SetStateAction<any>>
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
    resetForm: () => void
    handleSubmitStep2: () => void
    handleSubmitStep3: () => void
    timeSpan: number | null
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
    sixDigitsCode: any
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
}) => {
    const currentHostel = useSelector(getCurrentHostel)
    const [rooms, setRooms] = useState([])
    const [hostels, setHostels] = useState([])
    const [roomInfo, setRoomInfo] = useState<any | null>(null)
    const [hostelInfo, setHostelInfo] = useState<any | null>(null)

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
            const roomList = await getRoomOfHostel(
                currentHostelId || hostelInfo?.id
            )
            setRoomInfo(roomList?.[0])
            setRooms(roomList)
        })()
    }, [hostelInfo])

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
