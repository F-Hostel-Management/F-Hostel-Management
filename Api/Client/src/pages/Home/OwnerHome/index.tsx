import * as React from 'react'

import Greeting from '../components/Greeting'
import HostelCard from '../components/HostelCard'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DescriptionIcon from '@mui/icons-material/Description'
import { Button } from '@mui/material'

import * as Styled from './styles'
import { Role } from '../../../utils/enums'

interface IOwnerHomeProps {}

const role : Role = 2

const OwnerHome: React.FunctionComponent<IOwnerHomeProps> = (props) => {
    return (
        <Styled.HomeContainer>
            <Styled.ActionWrapper>
                <Greeting />
                <Styled.ButtonWrapper>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<DescriptionIcon />}
                    >
                        CREATE COMMITMENT
                    </Button>
                    {role == Role.OWNER_ROLE && (
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddCircleIcon />}
                        >
                            CREATE ROOM
                        </Button>
                    )}
                </Styled.ButtonWrapper>
            </Styled.ActionWrapper>
            <React.Fragment>
                <HostelCard />
                <HostelCard />
            </React.Fragment>
        </Styled.HomeContainer>
    )
}

export default OwnerHome
