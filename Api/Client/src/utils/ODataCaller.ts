import axios, { AxiosResponse } from 'axios'
import { HttpErrorToast } from './HttpErrorToast'
import odataQuery, { ODataQuery } from 'odata-fluent-query'

const instance = axios.create({
    baseURL: '/odata',
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

const responseBody = (response: AxiosResponse) => response?.data

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>((resolve) =>
        setTimeout(() => resolve(response), ms)
    )

export const ODataCaller = {
    createBuilder: <T>() => odataQuery<T>(),
    get: <T>(path: string, query: ODataQuery<T>) => {
        const queryString = query.toString()
        const url = path + '?' + queryString
        return instance.get(url).then(responseBody)
    },
}
