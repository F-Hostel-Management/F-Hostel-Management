import React, { FC } from 'react'

import OwnerDashboard from './OwnerDashboard'

interface IDashboardProps {}

const Dashboard: FC<IDashboardProps> = (props) => {
    return <OwnerDashboard />
}

export default Dashboard
