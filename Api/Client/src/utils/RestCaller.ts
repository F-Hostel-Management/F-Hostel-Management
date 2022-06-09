import axios, { AxiosResponse } from 'axios'
import { ISuccessResponse } from '../interface/serviceResponse'
import { HttpToast, HttpToastConfig } from './HttpToast'

const instance = axios.create({
    baseURL: '/server/api',
    responseType: 'json',
    withCredentials: true,
    toast: {
        notShowLoading: true,
        notShowSuccess: true,
        notShowError: false,
    },
})

instance.interceptors.request.use(
    (config) => {
        config.headers = {
            'Content-Type': 'application/json',
        }

        const notShowLoading = config?.toast?.notShowLoading
        if (notShowLoading) return config

        config = {
            ...config,
            toast: {
                id: HttpToast.loading('Please wait...'),
            },
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

instance.interceptors.response.use(undefined, (error) => {
    const { status, data } = error.response
    const { config } = error
    const notShowError = config?.toast?.notShowError
    if (notShowError) return

    const id = config?.toast?.id ?? ''
    HttpToast.error(id, status, data)
})

const responseBody = (response: AxiosResponse): ISuccessResponse => {
    const { config } = response
    const notShowSuccess = config?.toast?.notShowSuccess
    if (!notShowSuccess) HttpToast.success(config?.toast?.id ?? '', 'Success')
    return <ISuccessResponse>response?.data
}

export const RestCaller = {
    get: (url: string, config?: HttpToastConfig) =>
        instance
            .get(url, {
                toast: config,
            })
            .then(responseBody),
    post: (url: string, data?: unknown, config?: HttpToastConfig) =>
        instance
            .post(url, JSON.stringify(data), {
                toast: config,
            })
            .then(responseBody),
    put: (url: string, data?: unknown, config?: HttpToastConfig) =>
        instance
            .put(url, JSON.stringify(data), {
                toast: config,
            })
            .then(responseBody),
    patch: (url: string, data?: unknown, config?: HttpToastConfig) =>
        instance
            .patch(url, JSON.stringify(data), {
                toast: config,
            })
            .then(responseBody),
    delete: (url: string, config?: HttpToastConfig) =>
        instance.delete(url, { toast: config }).then(responseBody),
    upload: (url: string, form: FormData, config?: HttpToastConfig) =>
        instance
            .post(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                toast: config,
            })
            .then(responseBody),
    download: (url: string, data?: unknown) =>
        instance
            .post(url, data, {
                responseType: 'arraybuffer',
                toast: { notShowError: true },
            })
            .then((response) => response?.data),
}
