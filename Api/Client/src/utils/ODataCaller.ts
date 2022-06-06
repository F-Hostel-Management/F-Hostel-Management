import axios, { AxiosResponse } from 'axios'
import { HttpErrorToast } from './HttpErrorToast'
import odataQuery, { ODataQuery } from 'odata-fluent-query'
import { ISuccessResponse } from '../interface/serviceResponse'

const instance = axios.create({
    baseURL: 'server/odata',
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

export const ODataCaller = {
    createBuilder: <T>() => odataQuery<T>(),
    get: <T>(path: string, query: ODataQuery<T>, showErrorToast?: boolean) => {
        const queryString = query.toString()
        const url = path + '?' + queryString
        return instance
            .get(url, { showErrorToast })
            .then(sleep(1000))
            .then(responseBody)
    },
}
