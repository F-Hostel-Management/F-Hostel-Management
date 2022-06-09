import axios, { AxiosResponse } from 'axios'
import {
    defaultHttpToastConfig,
    HttpToast,
    HttpToastConfigPartial,
} from './HttpToast'
import odataQuery, { ODataQuery } from 'odata-fluent-query'
import { ISuccessResponse } from '../interface/serviceResponse'

const instance = axios.create({
    baseURL: '/server/odata',
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

const responseBody = (response: AxiosResponse) =>
    (<ISuccessResponse>response?.data).result

export const ODataCaller = {
    createBuilder: <T>() => odataQuery<T>(),
    get: <T>(
        path: string,
        query: ODataQuery<T>,
        config?: HttpToastConfigPartial
    ) => {
        const queryString = query.toString()
        const url = path + '?' + queryString
        return instance.get(url, { toast: config }).then(responseBody)
    },
}
