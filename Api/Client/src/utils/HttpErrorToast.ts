import { toast, ToastOptions } from 'react-toastify'
import { IFailureResponse } from '../interface/serviceResponse'

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
    show: (status: number, detail?: IFailureResponse) => {
        const exceptionMessage = detail?.responseException?.exceptionMessage
        switch (status) {
            case 400:
                toast.error(
                    exceptionMessage ? exceptionMessage : 'Bad Request',
                    config
                )
                break
            case 401:
                toast.error(
                    exceptionMessage ? exceptionMessage : 'Unauthorized',
                    config
                )
                break
            case 403:
                toast.error(
                    exceptionMessage ? exceptionMessage : 'Forbidden',
                    config
                )
                break
            case 404:
                toast.error(
                    exceptionMessage ? exceptionMessage : 'Not Found',
                    config
                )
                break
            default:
                toast.error(
                    'Server Error - check the terminal for more information!',
                    config
                )
        }
    },
}
