import { Chip } from '@mui/material'
import * as React from 'react'
import { ECommitmentStatus as Status } from '../../../../utils/enums'

interface ICommitmentStatusProps {
    rowData: any
}

const CommitmentStatus: React.FunctionComponent<ICommitmentStatusProps> = ({
    rowData,
}) => {
    let color = 'default'
    switch (rowData?.status) {
        case Status.Closed: {
            color = 'gray'
            break
        }
        case Status.Pending: {
            color = 'warning'
            break
        }
        case Status.Active: {
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

export default CommitmentStatus
