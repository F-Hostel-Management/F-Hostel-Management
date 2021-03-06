export interface IInformation {
    fullName: string
    birthDate: string
    cardNumber: string
    address: string
    gender: string
    phoneNo: string
    taxCode: string
    imgCard: Map<number, File>
}

export interface IRole {
    icon: string
    name: string
}

export interface IFirstTimeBody {
    firebaseToken?: string
    role?: number
    name?: string
    address?: string
    phone?: string
    gender?: number
    dateOfBirth?: Date
    taxCode?: string
    cardNumber?: string
}
