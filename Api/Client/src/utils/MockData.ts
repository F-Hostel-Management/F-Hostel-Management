import { ECommitmentStatus, ERoomStatus, ERoomType } from './enums'
import { IRoom } from '../interface/room'
import { IUser } from './../interface/user'
import { ICommitment } from '../interface/commitment'
export const users: IUser[] = [
    {
        id: 'aa1',
        role: 0,
        name: 'Le Xuan Dai',
        email: 'dai001@gmal.com',
        phone: '0988765432',
        taxCode: '001',
        gender: 1,
        organization: 'Binh Phuoc',
        avatarUrl: '',
        isDeleted: false,
    },
    {
        id: 'bb1',
        role: 1,
        name: 'Bui Ngoc Huy',
        email: 'huy001@gmal.com',
        phone: '0988762234',
        taxCode: '002',
        gender: 1,
        organization: 'Dong Nai',
        avatarUrl: '',
        isDeleted: false,
    },
    {
        id: 'cc1',
        role: 2,
        name: 'Nguyen Nhat Huy',
        email: 'nhuy001@gmal.com',
        phone: '0988456234',
        taxCode: '003',
        gender: 1,
        organization: 'Long An',
        avatarUrl: '',
        isDeleted: false,
    },
]

export const rooms: IRoom[] = [
    {
        id: '1',
        roomNumber: 715,
        type: ERoomType.Single,
        status: ERoomStatus.Renting,
        numberOfWindows: 2,
        numberOfDoor: 1,
        numberOfBathRoom: 1,
        numberOfToilet: 1,
        price: 3200000,
        area: 20,
        length: 4,
        width: 5,
        height: 4,
        isDeleted: false,
    },
]

export const commitments: ICommitment[] = [
    {
        id: '1',
        commitmentCode: 'commit1',
        createdDate: '01-07-2021',
        startedDate: '01-08-2021',
        endDate: '02-09-2022',
        details: {
            manager: users[0],
            tenant: users[1],
            terms: {
                room: rooms[0],
                overdueDays: 3,
                fine: 500000,
            },
        },
        status: ECommitmentStatus.Active,
    },
    {
        id: '2',
        commitmentCode: 'commit1',
        createdDate: '02-07-2021',
        startedDate: '02-08-2021',
        endDate: '02-09-2022',
        details: {
            manager: users[0],
            tenant: users[1],
            terms: {
                room: rooms[0],
                overdueDays: 3,
                fine: 500000,
            },
        },
        status: ECommitmentStatus.Pending,
    },
    {
        id: '3',
        commitmentCode: 'commit2',
        createdDate: '03-07-2021',
        startedDate: '03-08-2021',
        endDate: '03-09-2022',
        details: {
            manager: users[0],
            tenant: users[1],
            terms: {
                room: rooms[0],
                overdueDays: 3,
                fine: 500000,
            },
        },
        status: ECommitmentStatus.Closed,
    },
    {
        id: '4',
        commitmentCode: 'commit3',
        createdDate: '04-07-2021',
        startedDate: '04-08-2021',
        endDate: '04-09-2022',
        details: {
            manager: users[0],
            tenant: users[1],
            terms: {
                room: rooms[0],
                overdueDays: 3,
                fine: 500000,
            },
        },
        status: ECommitmentStatus.Active,
    },
]

export const getData = (page: number, pageSize: number, agr: any[]): any[] => {
    const start = (page - 1) * pageSize
    const end = page * pageSize < agr.length ? page * pageSize : agr.length
    const result: any[] = agr.slice(start, end)
    return result
}
