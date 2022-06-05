import { ERoomStatus, ERoomType } from '../utils/enums'

export interface IRoom {
    select(
        arg0: string,
        arg1: string,
        arg2: string,
        arg3: string,
        arg4: string,
        arg5: string,
        arg6: string,
        arg7: string,
        arg8: string,
        arg9: string,
        arg10: string,
        arg11: string,
        arg12: string,
        arg13: string,
        arg14: string
    ):
        | import('odata-fluent-query').ExpandArrayQuery<unknown>
        | import('odata-fluent-query').ExpandObjectQuery<any>
    id?: string
    roomName?: string
    roomTypeId?: ERoomType
    numberOfWindows?: number
    numberOfDoors?: number
    numberOfBathRooms?: number
    numberOfWCs?: number
    price?: number
    area?: number
    length?: number
    width?: number
    height?: number
    hostelId?: string
    roomStatus?: ERoomStatus
    maximumPeople?: number
    isDeleted?: boolean
}
