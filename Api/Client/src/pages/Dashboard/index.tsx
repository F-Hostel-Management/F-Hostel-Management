import React, { FC } from 'react'
import { useAppSelector } from '../../hooks/reduxHook'
import { getUserRole } from '../../slices/authSlice'
import { ERole } from '../../utils/enums'

import OwnerDashboard from './OwnerDashboard'

interface IDashboardProps {}

const Dashboard: FC<IDashboardProps> = (props) => {
    const role = useAppSelector(getUserRole)
    return role == ERole.TENANT_ROLE ? <></> : <OwnerDashboard />
}

export default Dashboard
