export interface IStepper {
    name: string
    component: any
    handleNext: () => Promise<boolean> | boolean
    action: string
    [x: string | number | symbol]: any
}
