export interface IManager {
    name: string
    phone: string
    avatar: string
    id: string
}

export interface IManagement {
    hostelId: string
    manager: IManager
    id: string
}
