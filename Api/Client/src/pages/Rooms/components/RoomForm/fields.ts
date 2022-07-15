import { IField } from '../../../../interface/IField'

export const fields: IField[] = [
    {
        label: 'Number of rooms to create',
        name: 'quantity',
        type: 'number',
        required: true,
        inputProps: { min: 1, max: 10 },
    },
    {
        label: 'Room name',
        name: 'roomName',
        type: 'text',
        required: true,
        inputProps: { maxlength: 25 },
    },
    {
        label: 'Length of room',
        name: 'length',
        type: 'number',
        required: true,
        inputProps: { min: 1, max: 20, step: 0.1 },
    },
    {
        label: 'Width of room',
        name: 'width',
        type: 'number',
        required: true,
        inputProps: { min: 1, max: 20, step: 0.1 },
    },
    {
        label: 'Maximum of people',
        name: 'maximumPeople',
        type: 'number',
        required: true,
        inputProps: { min: 1, max: 20 },
    },
    {
        label: 'Number of doors',
        name: 'numOfDoors',
        type: 'number',
        required: true,
        inputProps: { min: 1, max: 5 },
    },
    {
        label: 'Number of windows',
        name: 'numOfWindows',
        type: 'number',
        required: true,
        inputProps: { min: 1, max: 5 },
    },
    {
        label: 'Number of bedrooms',
        name: 'numOfBedRooms',
        type: 'number',
        required: true,
        inputProps: { min: 1, max: 5 },
    },
    {
        label: 'Number of bathrooms',
        name: 'numOfBathRooms',
        type: 'number',
        required: true,
        inputProps: { min: 1, max: 5 },
    },
    {
        label: 'Number of WCs',
        name: 'numOfWCs',
        type: 'number',
        required: true,
        inputProps: { min: 1, max: 5 },
    },
]
