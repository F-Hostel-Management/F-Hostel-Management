import { IField } from '../../../../interface/IField'

export const fields: IField[] = [
    {
        label: 'Name',
        name: 'name',
        type: 'text',
        required: true,
    },
    {
        label: 'Address',
        name: 'address',
        type: 'text',
        required: true,
    },
    {
        label: 'Number of rooms',
        name: 'numOfRooms',
        type: 'number',
        required: true,
    },
    {
        label: 'Hostel Category Id',
        name: 'hostelCategoryId',
        type: 'string',
        required: true,
    },
]
