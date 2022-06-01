import axios, { AxiosResponse } from 'axios'
import { store } from '../stores/reduxStore'
import { HttpErrorToast } from './HttpErrorToast'
import odataQuery, { ODataQuery } from 'odata-fluent-query'

const token = store?.getState()?.auth?.token
const instance = axios.create({
    baseURL: '/odata',
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

export const ODataCaller = {
    createBuilder: <T>() => odataQuery<T>(),
    get: <T>(path: string, query: ODataQuery<T>) => {
        const queryString = query.toString()
        const url = path + '?' + queryString
        return instance.get(url).then(sleep(1000)).then(responseBody)
    },
}
