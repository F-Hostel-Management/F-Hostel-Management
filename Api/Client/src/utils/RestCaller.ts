import axios, { AxiosResponse } from 'axios'
import { ISuccessResponse } from '../interface/serviceResponse'
import { HttpErrorToast } from './HttpErrorToast'

const instance = axios.create({
    baseURL: '/server/api',
    responseType: 'json',
    withCredentials: true,
})

instance.interceptors.request.use(
    (config) => {
        config.headers = {
            'Content-Type': 'application/json',
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
    if (config.showErrorToast === undefined || config.showErrorToast)
        HttpErrorToast.show(status, data)
})

const responseBody = (response: AxiosResponse): ISuccessResponse =>
    <ISuccessResponse>response?.data

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>((resolve) =>
        setTimeout(() => resolve(response), ms)
    )

export const RestCaller = {
    get: (url: string, showErrorToast?: boolean) =>
        instance
            .get(url, {
                showErrorToast,
            })
            .then(sleep(1000))
            .then(responseBody),
    post: (url: string, data?: unknown, showErrorToast?: boolean) =>
        instance
            .post(url, JSON.stringify(data), {
                showErrorToast,
            })
            .then(sleep(1000))
            .then(responseBody),
    put: (url: string, data?: unknown, showErrorToast?: boolean) =>
        instance
            .put(url, JSON.stringify(data), {
                showErrorToast,
            })
            .then(sleep(1000))
            .then(responseBody),
    delete: (url: string, showErrorToast?: boolean) =>
        instance
            .delete(url, { showErrorToast })
            .then(sleep(1000))
            .then(responseBody),
    upload: (url: string, form: FormData, showErrorToast?: boolean) =>
        instance
            .post(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                showErrorToast,
            })
            .then(sleep(10000))
            .then(responseBody),
}
