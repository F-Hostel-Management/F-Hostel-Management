import axios, { AxiosResponse } from 'axios'
import { ISuccessResponse } from '../interface/serviceResponse'
import { HttpErrorToast } from './HttpErrorToast'

const instance = axios.create({
    baseURL: '/api',
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
    const { status } = error.response
    HttpErrorToast.show(status)
})

const responseBody = (response: AxiosResponse): ISuccessResponse =>
    <ISuccessResponse>response?.data

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>((resolve) =>
        setTimeout(() => resolve(response), ms)
    )

export const RestCaller = {
    get: (url: string) =>
        instance.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, data?: unknown) =>
        instance
            .post(url, JSON.stringify(data))
            .then(sleep(1000))
            .then(responseBody),
    put: (url: string, data?: unknown) =>
        instance
            .put(url, JSON.stringify(data))
            .then(sleep(1000))
            .then(responseBody),
    delete: (url: string) =>
        instance.delete(url).then(sleep(1000)).then(responseBody),
    upload: (url: string, form: FormData) =>
        instance
            .post(url, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(sleep(10000))
            .then(responseBody),
}
