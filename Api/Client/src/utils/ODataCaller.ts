import axios, { AxiosResponse } from 'axios'
import { HttpToast, HttpToastConfig } from './HttpToast'
import odataQuery, { ODataQuery } from 'odata-fluent-query'
import { ISuccessResponse } from '../interface/serviceResponse'

const instance = axios.create({
    baseURL: '/server/odata',
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

const responseBody = (response: AxiosResponse) => {
    const { config } = response
    const notShowSuccess = config?.toast?.notShowSuccess
    if (!notShowSuccess) HttpToast.success(config?.toast?.id ?? '', 'Success')
    return (<ISuccessResponse>response?.data).result
}

export const ODataCaller = {
    createBuilder: <T>() => odataQuery<T>(),
    get: <T>(path: string, query: ODataQuery<T>, config?: HttpToastConfig) => {
        const queryString = query.toString()
        const url = path + '?' + queryString
        return instance.get(url, { toast: config }).then(responseBody)
    },
}
