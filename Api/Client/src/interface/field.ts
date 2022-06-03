export interface IField {
    label: string
    name: string
    type: string
    required: boolean
    disabled?: boolean
    [x: string | number | symbol]: any
}
