import axios, { AxiosResponse } from 'axios'
import { store } from '../stores/reduxStore'
import { HttpErrorToast } from './HttpErrorToast'

const token = store?.getState()?.auth?.token
const instance = axios.create({
    baseURL: '/api',
    responseType: 'json',
    withCredentials: true,
    headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
    },
})

instance.interceptors.response.use(undefined, (error) => {
    const { status } = error.response
    console.log(typeof status)
    HttpErrorToast.show(status)
})

const responseBody = (response: AxiosResponse) => response?.data

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>((resolve) =>
        setTimeout(() => resolve(response), ms)
    )

export const RestCaller = {
    get: (url: string) =>
        instance.get(url).then(sleep(1000)).then(responseBody),
    post: (url: string, data?: Record<string, unknown>) =>
        instance
            .post(url, JSON.stringify(data))
            .then(sleep(1000))
            .then(responseBody),
    put: (url: string, data?: Record<string, unknown>) =>
        instance
            .put(url, JSON.stringify(data))
            .then(sleep(1000))
            .then(responseBody),
    delete: (url: string) =>
        instance.delete(url).then(sleep(1000)).then(responseBody),
}
