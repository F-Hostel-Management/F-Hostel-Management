export interface IStepper {
    name: string
    component: any
    handleNext: () => void
    action: string
    [x: string | number | symbol]: any
}
