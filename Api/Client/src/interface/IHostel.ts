export interface IHostel {
    id: string
    address?: string
    name?: string
    numOfRooms?: number
    hostelCategoryId?: string
    ownerId?: string
    imageSrc?: string
    isDeleted?: boolean
}

export interface IHostelValues {
    address: string
    name: string
    numOfRooms: number
    hostelCategoryId: string
    ownerId: string
    imageSrc: string
}
