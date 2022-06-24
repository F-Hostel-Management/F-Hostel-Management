import { toast, ToastOptions } from 'react-toastify'
export const config: ToastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}
export const showSuccess = (msg: string) => {
    toast.success(msg, config)
}
export const showError = (msg: string) => {
    toast.error(msg, config)
}

export const setToastConfig = (successMessage: string) => ({
    loading: {
        show: true,
        message: 'Progressing...',
    },
    success: {
        show: true,
        message: successMessage,
    },
    error: {
        show: true,
        message: 'Failed! Please, try again.',
    },
})
