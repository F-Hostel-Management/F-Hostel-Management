export interface ISuccessResponse {
    isError: boolean
    result?: any
}

export interface IFailureResponse {
    isError: boolean
    responseException: IResponseException
}

interface IResponseException {
    exceptionMessage: string
    validationErrors?: IValidationError[]
}

interface IValidationError {
    name: string
    reason: string
}
