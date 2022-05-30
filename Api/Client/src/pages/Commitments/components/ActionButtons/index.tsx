import React, { FC } from 'react'
import IconButtonCustom from '../../../../components/Button/IconButtonCustom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DescriptionIcon from '@mui/icons-material/Description'
import { ECommitmentStatus as Status } from '../../../../utils/enums'
interface IActionButtonsProps {
    rowData: any
}

const ActionButtons: FC<IActionButtonsProps> = ({ rowData }) => {
    return (
        <div
            style={{
                width: '11rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
            }}
        >
            <IconButtonCustom
                textColor="#fff"
                bgrColor="#E83E8C"
                sx={{ width: '2.8rem', height: '2.8rem' }}
            >
                <DescriptionIcon sx={{ fontSize: '1.6rem' }} />
            </IconButtonCustom>
            <IconButtonCustom
                textColor="#fff"
                bgrColor="#495057"
                sx={{ width: '2.8rem', height: '2.8rem' }}
                disabled={rowData.status !== Status.Pending}
            >
                <EditIcon sx={{ fontSize: '1.3rem' }} />
            </IconButtonCustom>
            <IconButtonCustom
                textColor="#fff"
                bgrColor="#f96332"
                sx={{ width: '2.8rem', height: '2.8rem' }}
            >
                <DeleteIcon sx={{ fontSize: '1.6rem' }} />
            </IconButtonCustom>
        </div>
    )
}

export default ActionButtons
