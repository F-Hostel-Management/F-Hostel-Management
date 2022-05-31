import { toast, ToastOptions } from 'react-toastify'

const config: ToastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

export const HttpErrorToast = {
    show: (status: number) => {
        switch (status) {
            case 400:
                toast.error('Bad Request', config)
                break
            case 401:
                toast.error('Unauthorized', config)
                break
            case 403:
                toast.error('Forbidden', config)
                break
            case 404:
                toast.error('Not Found', config)
                break
            default:
                toast.error(
                    'Server Error - check the terminal for more information!',
                    config
                )
        }
    },
}
