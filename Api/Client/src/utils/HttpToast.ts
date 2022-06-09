import { toast, ToastOptions } from 'react-toastify'
import { IFailureResponse } from '../interface/serviceResponse'

const config: ToastOptions = {
    position: 'bottom-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
}

export type HttpToastConfig = {
    id?: string
    loading: {
        show?: boolean
        message?: string
    }
    success: {
        show?: boolean
        message?: string
    }
    error: {
        show?: boolean
        message?: string
    }
}
export type HttpToastConfigPartial = Partial<HttpToastConfig>

export const defaultHttpToastConfig: HttpToastConfig = {
    loading: {
        show: false,
    },
    success: {
        show: false,
    },
    error: {
        show: true,
    },
}

export const HttpToast = {
    loading: (message: string): string => {
        return toast.loading(message, config).toString()
    },
    success: (id: string, message: string) => {
        if (!id) return toast.success(message, config)
        setTimeout(
            () =>
                toast.update(id, {
                    render: message,
                    type: 'success',
                    isLoading: false,
                    autoClose: 1500,
                }),
            1500
        )
    },
    error: (id: string, status: number, detail?: IFailureResponse) => {
        let exceptionMessage = detail?.responseException?.exceptionMessage
        switch (status) {
            case 400:
                exceptionMessage ??= 'Bad Request'
                break
            case 401:
                exceptionMessage ??= 'Unauthorized'
                break
            case 403:
                exceptionMessage ??= 'Forbidden'
                break
            case 404:
                exceptionMessage ??= 'Not Found'
                break
            default:
                exceptionMessage =
                    'Server Error - check the terminal for more information!'
        }

        if (!id) return toast.error(exceptionMessage, config)
        setTimeout(
            () =>
                toast.update(id, {
                    render: exceptionMessage,
                    type: 'error',
                    isLoading: false,
                    autoClose: 1500,
                }),
            1500
        )
    },
}
