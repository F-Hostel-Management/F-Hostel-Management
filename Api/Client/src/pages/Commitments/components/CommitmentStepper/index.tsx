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
import { getListHostel, getRoomOfHostel } from '../../../../services/hostels'

interface ICommitmentStepperProps {
    handleCloseDialog: () => void
    values: Record<string, any>
    setValues: Dispatch<SetStateAction<any>>
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
    resetForm: () => void
}

const CommitmentStepper: FC<ICommitmentStepperProps> = ({
    handleCloseDialog,
    values,
    setValues,
    handleInputChange,
    resetForm,
}) => {
    const [rooms, setRooms] = useState([])
    const [hostels, setHostels] = useState([])
    const [roomInfo, setRoomInfo] = useState<any | null>(null)
    const [hostelInfo, setHostelInfo] = useState<any | null>(null)

    useEffect(() => {
        ;(async () => {
            const hostelList = await getListHostel()
            setHostelInfo(hostelList?.[0])
            setHostels(hostelList)
        })()
    }, [])
    useEffect(() => {
        if (!hostelInfo) return
        ;(async () => {
            const roomList = await getRoomOfHostel(hostelInfo?.id)
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
            handleNext: () => alert('Step 2'),
            action: 'Create',
        },
        {
            name: 'QR code',
            component: <Step3 />,
            handleNext: () => alert('Step 3'),
            action: 'Confirm',
        },
    ]

    return <StepByStep steps={steps} handleCloseDialog={handleCloseDialog} />
}

export default CommitmentStepper
