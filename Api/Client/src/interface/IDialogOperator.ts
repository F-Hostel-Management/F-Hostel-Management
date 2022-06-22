export interface IDialogOperator {
    openDialog: boolean
    handleOpenDialog?: () => void
    handleCloseDialog: () => void
}
