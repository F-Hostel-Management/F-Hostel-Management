import { IField } from '../../../../interface/IField'

export const fields: IField[] = [
    {
        label: 'Quantity',
        name: 'quantity',
        type: 'number',
        required: true,
        inputProps: { min: 1 },
    },
    {
        label: 'Room Name',
        name: 'roomName',
        type: 'text',
        required: true,
    },
    {
        label: 'Length',
        name: 'length',
        type: 'number',
        required: true,
    },
    {
        label: 'Width',
        name: 'width',
        type: 'number',
        required: true,
    },
    // {
    //     label: 'Height',
    //     name: 'height',
    //     type: 'number',
    //     required: true,
    //     inputProps: { min: 1 },
    // },
    {
        label: 'Maximum Of People',
        name: 'maximumPeople',
        type: 'number',
        required: true,
        inputProps: { min: 1 },
    },
    {
        label: 'Number Of Doors',
        name: 'numOfDoors',
        type: 'number',
        required: true,
        inputProps: { min: 1, max: 100 },
    },
    {
        label: 'Number Of Windows',
        name: 'numOfWindows',
        type: 'number',
        required: true,
        inputProps: { min: 1, max: 100 },
    },
    {
        label: 'Number Of Bedrooms',
        name: 'numOfBedRooms',
        type: 'number',
        required: true,
        inputProps: { min: 1, max: 100 },
    },
    {
        label: 'Number Of Bathrooms',
        name: 'numOfBathRooms',
        type: 'number',
        required: true,
        inputProps: { min: 1, max: 100 },
    },
    {
        label: 'Number Of WCs',
        name: 'numOfWCs',
        type: 'number',
        required: true,
        inputProps: { min: 1, max: 100 },
    },
]
