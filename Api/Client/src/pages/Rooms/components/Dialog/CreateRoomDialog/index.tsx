import React, { FC } from 'react'
import FormDialog from '../../../../../components/DialogCustom/FormDialog'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHook'
import { useForm } from '../../../../../hooks/useForm'
import { IRoomValues } from '../../../../../interface/IRoom'
import { createRoom } from '../../../../../services/RoomService'
import { fetchRoomList } from '../../../../../slices/roomSlice'
import { getItem } from '../../../../../utils/LocalStorageUtils'
import RoomForm from '../../RoomForm'

interface ICreateRoomDialogProps {
    openDialog: boolean
    handleCloseDialog: () => void
}

const CreateRoomDialog: FC<ICreateRoomDialogProps> = ({
    openDialog,
    handleCloseDialog,
}) => {
    const dispatch = useAppDispatch()
    const page = useAppSelector(({ table }) => table.page)
    const pageSize = useAppSelector(({ table }) => table.pageSize)

    const initialValues: IRoomValues = {
        roomName: '',
        quantity: 1,
        maximumPeople: 1,
        numOfWindows: 1,
        numOfDoors: 1,
        numOfBathRooms: 1,
        numOfWCs: 1,
        numOfBedRooms: 1,
        area: 0,
        length: 1,
        width: 1,
        height: 0,
        hostelId: '',
    }
    const { values, setValues, handleInputChange, resetForm } =
        useForm<IRoomValues>(initialValues)

    const handleCreateRoom = async () => {
        const hostelId = getItem('currentHostelId')
        const response = await createRoom({
            ...values,
            area: values?.length * values?.width,
            hostelId,
        })
        if (!response.isError) {
            dispatch(fetchRoomList({ hostelId, pageSize, page }))
            resetForm()
        }
    }
    return (
        <FormDialog
            title="Create Room"
            action="Create"
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            handleSubmit={handleCreateRoom}
            maxWidth="md"
        >
            <RoomForm
                action="Create"
                values={values}
                handleInputChange={handleInputChange}
            />
        </FormDialog>
    )
}

export default CreateRoomDialog
