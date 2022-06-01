import { useState } from 'react'

export function useDialog() {
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const handleOpenDialog = (): void => {
        setOpenDialog(true)
    }

    const handleCloseDialog = (): void => {
        setOpenDialog(false)
    }

    return [openDialog, handleOpenDialog, handleCloseDialog]
}
