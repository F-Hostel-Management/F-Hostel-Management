export interface ISuccessResponse {
    isError: boolean
    result?: any
}

export interface IFailureResponse {
    isError: boolean
    responseException?: any
}
