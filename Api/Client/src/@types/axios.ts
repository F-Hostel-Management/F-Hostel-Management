import { HttpToastConfigPartial } from '../utils/HttpToast'

export {}
declare module 'axios' {
    export interface AxiosRequestConfig {
        toast?: HttpToastConfigPartial
    }
}
