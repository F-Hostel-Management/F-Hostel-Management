import { IField } from '../../../../interface/IField'

export const fields: IField[] = [
    {
        label: 'Hostel Name',
        name: 'name',
        type: 'text',
        required: true,
        inputProps: { maxlength: 25 },
    },
    {
        label: 'Address',
        name: 'address',
        type: 'text',
        required: true,
        inputProps: { maxlength: 25 },
    },
    {
        label: 'Time span of QR code (minutes)',
        name: 'timeSpan',
        type: 'number',
        required: true,
        inputProps: { min: 1, max: 240 },
    },
]
