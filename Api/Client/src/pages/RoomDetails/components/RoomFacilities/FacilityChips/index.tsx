import { Avatar, Chip, Tooltip } from '@mui/material'
import React, {
    ChangeEvent,
    Dispatch,
    FC,
    FormEvent,
    Fragment,
    SetStateAction,
    useState,
} from 'react'
import FormDialog from '../../../../../components/DialogCustom/FormDialog'
import InputField from '../../../../../components/Input/InputField'
import { useDialog } from '../../../../../hooks/useDialog'
import {
    IFacility,
    IFacilityDescription,
} from '../../../../../interface/IFacility'

interface IFacilityChipsProps {
    value: IFacility[]
    setValue: Dispatch<SetStateAction<IFacility[]>>
    descriptions: Record<string, IFacilityDescription>
    setDescriptions: Dispatch<
        React.SetStateAction<Record<string, IFacilityDescription>>
    >
}

const FacilityChips: FC<IFacilityChipsProps> = ({
    value,
    setValue,
    descriptions,
    setDescriptions,
}) => {
    const color = ['info', 'success', 'error', 'warning']
    const [openDialog, handleOpenDialog, handleCloseDialog] = useDialog()
    const [quantity, setQuantity] = useState<number>(1)
    const [details, setDetails] = useState<string>('')
    const [currentFacility, setCurrentFacility] = useState<IFacility | null>(
        null
    )

    const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value))
    }

    const handleChangeDetails = (e: ChangeEvent<HTMLInputElement>) => {
        setDetails(e.target.value)
    }

    const handleDelete = (facility: IFacility) => {
        setValue(value.filter((option) => option.id !== facility.id))
        let tmp = { ...descriptions }
        delete tmp[facility.id]
        setDescriptions(tmp)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.stopPropagation()
        setDescriptions({
            ...descriptions,
            [currentFacility?.id || '']: {
                quantity,
                details,
            },
        })
        handleClose()
    }

    const handleOpen = (facility: IFacility) => {
        handleOpenDialog()
        setCurrentFacility(facility)
    }

    const handleClose = () => {
        setQuantity(1)
        setDetails('')
        handleCloseDialog()
    }

    return (
        <Fragment>
            {value.map((facility, index) => {
                return (
                    <Tooltip
                        title="Click to update"
                        placement="top"
                        key={facility.id}
                    >
                        <Chip
                            avatar={
                                <Avatar
                                    sx={{
                                        backgroundColor: '#fff',
                                        color: '#000',
                                    }}
                                >
                                    {descriptions[facility.id]?.quantity}
                                </Avatar>
                            }
                            label={` ${facility.name}`}
                            onDelete={() => handleDelete(facility)}
                            onClick={() => handleOpen(facility)}
                            sx={{
                                margin: '8px 4px',
                                cursor: 'pointer',
                            }}
                            color={color[index % 4]}
                        />
                    </Tooltip>
                )
            })}
            {openDialog && (
                <FormDialog
                    title="Update quantity"
                    action="Update"
                    openDialog={openDialog}
                    handleCloseDialog={handleClose}
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
                                max: currentFacility?.quantity,
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
            )}
        </Fragment>
    )
}

export default FacilityChips
