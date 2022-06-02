import { IRole } from './interfaces'

import Owner from '../../assets/images/ownerIcon.svg'
import Manager from '../../assets/images/managerIcon.svg'
import Tenant from '../../assets/images/tenantIcon.svg'

export const STEPS = ['Select your role', 'Personal information', 'Confirm']
export const ROLES: IRole[] = [
    { icon: Tenant, name: 'Tenant' },
    { icon: Manager, name: 'Manager' },
    { icon: Owner, name: 'Owner' },
]
export const GENDERS = ['Male', 'Female', 'Other']
