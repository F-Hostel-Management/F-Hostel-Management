import React, { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormDialog from '../../../../../../components/DialogCustom/FormDialog'
import { useAppDispatch } from '../../../../../../hooks/reduxHook'
import {
    IFacility,
    IFacilityDescription,
} from '../../../../../../interface/IFacility'
import { addFacilities } from '../../../../../../services/RoomService'
import { fetchRoomDetails } from '../../../../../../slices/roomDetailsSlice'
import RoomFacilities from '../../../RoomFacilities'

interface ICreateRoomFacilitiesDialogProps {
    openDialog?: boolean
    handleCloseDialog?: () => void
}

const CreateRoomFacilitiesDialog: FC<ICreateRoomFacilitiesDialogProps> = ({
    openDialog = false,
    handleCloseDialog = () => {},
}) => {
    const { roomId } = useParams()
    const dispatch = useAppDispatch()
    const [value, setValue] = useState<IFacility[]>([])
    const [descriptions, setDescriptions] = useState<
        Record<string, IFacilityDescription>
    >({})

    const handleSubmit = async () => {
        const facilityRooms = value.map((facility) => {
            const id = facility.id
            return {
                facilityId: id,
                description: descriptions[id].details,
                quantity: descriptions[id].quantity,
            }
        })
        const response = await addFacilities({ facilityRooms, roomId })
        if (!response.isError) {
            dispatch(fetchRoomDetails(roomId || ''))
            handleCloseDialog()
        }
    }

    return (
        <FormDialog
            title="Add Facilities To Room"
            action="Create"
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            handleSubmit={handleSubmit}
            maxWidth="md"
        >
            <RoomFacilities
                value={value}
                setValue={setValue}
                descriptions={descriptions}
                setDescriptions={setDescriptions}
            />
        </FormDialog>
    )
}

export default CreateRoomFacilitiesDialog
