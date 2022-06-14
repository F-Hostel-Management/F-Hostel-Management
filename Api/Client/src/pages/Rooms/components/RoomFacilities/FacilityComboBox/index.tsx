import { Autocomplete, Checkbox } from '@mui/material'
import React, { Dispatch, FC, SetStateAction } from 'react'
import InputField from '../../../../../components/Input/InputField'
import { useAppSelector } from '../../../../../hooks/reduxHook'
import {
    IFacility,
    IFacilityDescription,
} from '../../../../../interface/IFacility'
import {
    CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
    CheckBox as CheckBoxIcon,
} from '@mui/icons-material'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

interface IFacilityComboBoxProps {
    value: IFacility[]
    setValue: Dispatch<SetStateAction<IFacility[]>>
    descriptions: Record<string, IFacilityDescription>
    setDescriptions: Dispatch<
        React.SetStateAction<Record<string, IFacilityDescription>>
    >
}

const FacilityComboBox: FC<IFacilityComboBoxProps> = ({
    value,
    setValue,
    descriptions,
    setDescriptions,
}) => {
    const facilities: IFacility[] = useAppSelector(
        ({ facility }) => facility.facilityList
    )
    return (
        <Autocomplete
            multiple
            size="small"
            options={facilities}
            disableCloseOnSelect
            value={value}
            onChange={(event, newValue, reason) => {
                setValue((preValue) => {
                    switch (reason) {
                        case 'selectOption': {
                            const data = newValue.filter((e) =>
                                preValue.findIndex((p) => p.id === e.id)
                            )
                            if (!descriptions[data[0].id]?.quantity) {
                                setDescriptions({
                                    ...descriptions,
                                    [data[0].id]: {
                                        quantity: 1,
                                        details: '',
                                    },
                                })
                            }
                            break
                        }
                        case 'removeOption': {
                            const data = preValue.filter((e) =>
                                newValue.findIndex((p) => p.id === e.id)
                            )

                            setDescriptions((preDescription) => {
                                let tmp = { ...preDescription }
                                delete tmp[data[0].id]
                                return tmp
                            })
                            break
                        }
                        case 'clear': {
                            setDescriptions({})
                            break
                        }
                    }
                    return newValue
                })
            }}
            groupBy={(option) => option.type}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                        size="small"
                    />
                    <div
                        style={{
                            width: '100%',
                            fontSize: '1.6rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <span>{option.name} </span>
                        <span style={{ fontSize: '1.3rem', opacity: 0.5 }}>
                            {option.quantity}
                        </span>
                    </div>
                </li>
            )}
            style={{ width: 400 }}
            renderInput={(params) => (
                <InputField
                    {...params}
                    label="Facilities"
                    placeholder="Facilities"
                    width={400}
                />
            )}
            sx={{
                '& .MuiAutocomplete-tag': {
                    display: 'none',
                },
            }}
        />
    )
}

export default FacilityComboBox
