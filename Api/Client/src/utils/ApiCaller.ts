import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

import configurations from '../configurations'

const { BASE_BACKEND_URL } = configurations

let token = localStorage.getItem('token')
let instance = axios.create({
    baseURL: BASE_BACKEND_URL,
    responseType: 'json',
    headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
    },
})

instance.interceptors.response.use(undefined, (error) => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network error - make sure API is running!')
    }
    const { status, data, config } = error.response
    if (status === 404) {
        console.log('Not Found')
    }

    if (
        status === 400 &&
        config.method === 'get' &&
        data.errors.hasOwnProperty('id')
    ) {
        console.log('Not Found')
    }

    if (status === 500) {
        toast.error('Server Error - check the terminal for more information!')
    }
})

const responseBody = (response: AxiosResponse) => response.data

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>((resolve) =>
        setTimeout(() => resolve(response), ms)
    )

export const ApiCaller = {
    get: (url: '', data: {}) =>
        instance
            .get(url, { params: data })
            .then(sleep(1000))
            .then(responseBody),
    post: (url: '', data: {}) =>
        instance
            .post(url, JSON.stringify(data))
            .then(sleep(1000))
            .then(responseBody),
    put: (url: '', data: {}) =>
        instance
            .put(url, JSON.stringify(data))
            .then(sleep(1000))
            .then(responseBody),
    del: (url: '') => instance.delete(url).then(sleep(1000)).then(responseBody),
}
