import React, { FC } from 'react'
import DialogCustom from '../../../../../components/DialogCustom'
import { useForm } from '../../../../../hooks/useForm'
import { IRoomValues } from '../../../../../interface/IRoom'
import RoomStepper from '../../RoomStepper'

interface ICreateRoomDialogProps {
    openDialog: boolean
    handleCloseDialog: () => void
}

const CreateRoomDialog: FC<ICreateRoomDialogProps> = ({
    openDialog,
    handleCloseDialog,
}) => {
    const initialValues: IRoomValues = {
        roomName: '',
        quantity: 0,
        maximumPeople: 0,
        numOfWindows: 0,
        numOfDoors: 0,
        numOfBathRooms: 0,
        numOfWCs: 0,
        area: 0,
        length: 0,
        width: 0,
        height: 0,
        roomTypeId: '',
        hostelId: '',
    }
    const { values, setValues, handleInputChange, resetForm } =
        useForm<IRoomValues>(initialValues)
    return (
        <DialogCustom
            title="Create Room"
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
        >
            <RoomStepper
                handleCloseDialog={handleCloseDialog}
                values={values}
                setValues={setValues}
                handleInputChange={handleInputChange}
                resetForm={resetForm}
            />
        </DialogCustom>
    )
}

export default CreateRoomDialog
