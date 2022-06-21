import React from 'react'
import DialogCustom from '../../../../components/DialogCustom'
import { IDialogOperator } from '../../../../interface/IDialogOperator'
import { IManager } from '../../../../interface/IManager'
import { ManagerProfile } from '../ManagerProfile'

interface IManagerDetailProps extends IDialogOperator {
    rowData: IManager
}

export const ManagerDetail = ({
    openDialog,
    handleCloseDialog,
    rowData,
}: IManagerDetailProps) => {
    return (
        <>
            <DialogCustom
                title="Hostel Assignment"
                openDialog={openDialog}
                handleCloseDialog={handleCloseDialog}
                maxWidth="md"
            >
                <ManagerProfile manager={rowData}></ManagerProfile>
            </DialogCustom>
        </>
    )
}
