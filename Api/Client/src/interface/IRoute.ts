import { ElementType } from 'react'

export interface IRoute {
    path: string
    component: ElementType
    name: string
    layout: ElementType | null
    props?: Object
    force?: boolean
    [x: string | number | symbol]: any
}
