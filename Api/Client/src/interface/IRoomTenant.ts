import { IRoom } from './IRoom'
import { IUser } from './IUser'

export interface IRoomTenant {
    id: string
    room: IRoom
    tenant: IUser
}
