import React, { FC } from 'react'
import IconButtonCustom from '../../../../components/Button/IconButtonCustom'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DescriptionIcon from '@mui/icons-material/Description'
import { ECommitmentStatus as Status } from '../../../../utils/enums'
import { ERole } from '../../../../utils/enums'
interface IActionButtonsProps {
    rowData: any
}

const ActionButtons: FC<IActionButtonsProps> = ({ rowData }) => {
    const role: ERole = 1
    return (
        <div
            style={{
                width: role !== ERole.TENANT_ROLE ? '11rem' : '4rem',
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
            {role !== ERole.TENANT_ROLE && (
                <>
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
                        disabled={rowData.status === Status.Active}
                    >
                        <DeleteIcon sx={{ fontSize: '1.6rem' }} />
                    </IconButtonCustom>
                </>
            )}
        </div>
    )
}

export default ActionButtons
