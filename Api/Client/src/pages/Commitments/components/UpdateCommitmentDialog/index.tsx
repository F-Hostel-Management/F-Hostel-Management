// import React, { FC, useState } from 'react'
// import DialogCustom from '../../../../components/DialogCustom'
// import CommitmentStepper from '../CommitmentStepper'
// import { useForm } from '../../../../hooks/useForm'
// import { ICommitmentValues } from '../../../../interface/ICommitment'
// interface IUpdateCommitmentDialogProps {
//     openDialog: boolean
//     handleOpenDialog: () => void
//     handleCloseDialog: () => void
// }

// const UpdateCommitmentDialog: FC<IUpdateCommitmentDialogProps> = ({
//     openDialog,
//     handleCloseDialog,
// }) => {
//     const initialValues: ICommitmentValues = {
//         createdDate: new Date().toJSON(),
//         startDate: '23/07/2001',
//         endDate: '23/07/2006',
//         roomId: '1',
//         overdueDays: 3,
//         compensation: 3000000,
//     }

//     const { values, setValues, handleInputChange, resetForm } =
//         useForm<ICommitmentValues>(initialValues)
//     const [roomInfo, setRoomInfo] = useState<any | null>(null)
//     const [hostelInfo, setHostelInfo] = useState<any | null>(null)

//     return (
//         <DialogCustom
//             title="Update Commitment"
//             openDialog={openDialog}
//             handleCloseDialog={handleCloseDialog}
//         >
//             <CommitmentStepper
//                 handleCloseDialog={handleCloseDialog}
//                 values={values}
//                 setValues={setValues}
//                 handleInputChange={handleInputChange}
//                 resetForm={resetForm}
//             />
//         </DialogCustom>
//     )
// }

// export default UpdateCommitmentDialog
