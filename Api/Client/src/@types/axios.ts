import { HttpToastConfig } from '../utils/HttpToast'

export {}
declare module 'axios' {
    export interface AxiosRequestConfig {
        toast?: HttpToastConfig
    }
}
