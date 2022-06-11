import { CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material'
import React, { FC } from 'react'

const icon = <CheckBoxOutlineBlank fontSize="small" />
const checkedIcon = <CheckBox fontSize="small" />

interface IRoomFacilitiesProps {}

const RoomFacilities: FC<IRoomFacilitiesProps> = (props) => {
    return (
        <div></div>
        // <Autocomplete
        //     multiple
        //     id="checkboxes-tags-demo"
        //     options={[]}
        //     disableCloseOnSelect
        //     getOptionLabel={(option) => option.title}
        //     renderOption={(props, option, { selected }) => (
        //         <li {...props}>
        //             <Checkbox
        //                 icon={icon}
        //                 checkedIcon={checkedIcon}
        //                 style={{ marginRight: 8 }}
        //                 checked={selected}
        //             />
        //             {option.title}
        //         </li>
        //     )}
        //     style={{ width: 500 }}
        //     renderInput={(params) => (
        //         <TextField
        //             {...params}
        //             label="Checkboxes"
        //             placeholder="Favorites"
        //         />
        //     )}
        // />
    )
}

export default RoomFacilities
