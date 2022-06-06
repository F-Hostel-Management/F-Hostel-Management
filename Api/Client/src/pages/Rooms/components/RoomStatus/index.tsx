import { Chip } from '@mui/material'
import * as React from 'react'
import { ERoomStatus as Status } from '../../../../utils/enums'

interface IRoomStatusProps {
    rowData: any
}

const RoomStatus: React.FunctionComponent<IRoomStatusProps> = ({ rowData }) => {
    let color = 'default'
    switch (rowData?.status) {
        case Status.Finished: {
            color = 'warning'
            break
        }
        case Status.Renting: {
            color = 'green'
            break
        }
    }
    return (
        <Chip
            label={Status[rowData?.status]}
            color={color}
            variant="outlined"
        />
    )
}

export default RoomStatus
