import * as React from 'react'

import HostelCard from '../../components/Card/HostelCard'
import RoomCard from '../../components/Card/RoomCard'
import { Grid } from '@mui/material'

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <HostelCard />
            <RoomCard />
        </div>
    )
}

export default Home
