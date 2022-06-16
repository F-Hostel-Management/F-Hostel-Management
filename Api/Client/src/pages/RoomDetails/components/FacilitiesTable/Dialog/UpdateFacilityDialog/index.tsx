import React, { ChangeEvent, FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormDialog from '../../../../../../components/DialogCustom/FormDialog'
import InputField from '../../../../../../components/Input/InputField'
import { useAppDispatch } from '../../../../../../hooks/reduxHook'
import { IFacilityManagement } from '../../../../../../interface/IFacility'
import { updateFacilities } from '../../../../../../services/RoomService'
import { fetchRoomDetails } from '../../../../../../slices/roomDetailsSlice'

interface IUpdateFacilityDialogProps {
    openDialog: boolean
    handleCloseDialog: () => void
    facilityManagements: IFacilityManagement
}

const UpdateFacilityDialog: FC<IUpdateFacilityDialogProps> = ({
    openDialog,
    handleCloseDialog,
    facilityManagements,
}) => {
    const { roomId } = useParams()
    const dispatch = useAppDispatch()
    const [quantity, setQuantity] = useState<number>(
        facilityManagements?.quantity || 1
    )
    const [details, setDetails] = useState<string>(
        facilityManagements?.description || ''
    )

    const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value))
    }

    const handleChangeDetails = (e: ChangeEvent<HTMLInputElement>) => {
        setDetails(e.target.value)
    }

    const handleSubmit = async () => {
        const response = await updateFacilities({
            facilityManagementId: facilityManagements.id,
            quantity: quantity,
            description: details,
        })
        if (!response.isError) {
            dispatch(fetchRoomDetails(roomId || ''))
            handleCloseDialog()
        }
    }

    return (
        <FormDialog
            title="Update quantity"
            action="Update"
            openDialog={openDialog}
            handleCloseDialog={handleCloseDialog}
            handleSubmit={handleSubmit}
            maxWidth="sm"
        >
            <div style={{ textAlign: 'center' }}>
                <InputField
                    name="quantity"
                    label="Quantity"
                    value={quantity}
                    onChange={handleChangeQuantity}
                    inputProps={{
                        min: 1,
                        max: facilityManagements?.facility.quantity,
                    }}
                    type="number"
                />
                <InputField
                    id="filled-multiline-flexible"
                    label="Details"
                    multiline
                    rows={4}
                    value={details}
                    onChange={handleChangeDetails}
                />
            </div>
        </FormDialog>
    )
}

export default UpdateFacilityDialog
