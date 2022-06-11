import axios, { AxiosResponse } from 'axios'
import { ISuccessResponse } from '../interface/serviceResponse'
import {
    defaultHttpToastConfig,
    HttpToast,
    HttpToastConfig,
    HttpToastConfigPartial,
} from './HttpToast'

const instance = axios.create({
    baseURL: '/server/api',
    responseType: 'json',
    withCredentials: true,
    toast: {
        ...defaultHttpToastConfig,
    },
})

instance.interceptors.request.use(
    (config) => {
        config.headers = {
            'Content-Type': 'application/json',
        }

        const { toast } = config
        const show = toast?.loading?.show
        const message = toast?.loading?.message
        if (!show) return config

        config = {
            ...config,
            toast: {
                ...toast,
                id: HttpToast.loading(message ?? 'Please wait...'),
            },
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (response) => {
        const { config } = response
        const { toast } = config
        const show = toast?.success?.show
        const message = toast?.success?.message
        if (show)
            HttpToast.success(
                config?.toast?.id ?? '',
                message ?? 'Successfully'
            )

        return response
    },
    (error) => {
        const { status, data } = error.response
        const { config } = error
        const { toast } = config
        const show = toast?.error?.show
        if (!show) return

        const id = config?.toast?.id ?? ''
        HttpToast.error(id, status, data)
    }
)

const responseBody = (response: AxiosResponse): ISuccessResponse =>
    <ISuccessResponse>response?.data

export const RestCaller = {
    get: (url: string, config?: HttpToastConfigPartial) =>
        instance
            .get(url, {
                toast: config,
            })
            .then(responseBody),
    post: (url: string, data?: unknown, config?: HttpToastConfigPartial) =>
        instance
            .post(url, JSON.stringify(data), {
                toast: config,
            })
            .then(responseBody),
    put: (url: string, data?: unknown, config?: HttpToastConfigPartial) =>
        instance
            .put(url, JSON.stringify(data), {
                toast: config,
            })
            .then(responseBody),
    patch: (url: string, data?: unknown, config?: HttpToastConfigPartial) =>
        instance
            .patch(url, JSON.stringify(data), {
                toast: config,
            })
            .then(responseBody),
    delete: (url: string, config?: HttpToastConfig) =>
        instance.delete(url, { toast: config }).then(responseBody),
    upload: (url: string, form: FormData, config?: HttpToastConfigPartial) =>
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
                toast: {
                    error: {
                        show: false,
                    },
                },
            })
            .then((response) => response?.data),
}
