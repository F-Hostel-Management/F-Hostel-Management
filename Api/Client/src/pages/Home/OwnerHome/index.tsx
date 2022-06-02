import * as React from 'react'

import Greeting from '../components/Greeting'
import HostelCard from '../components/HostelCard'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DescriptionIcon from '@mui/icons-material/Description'
import { Button } from '@mui/material'

import * as Styled from './styles'
import { ERole } from '../../../utils/enums'
import { useDialog } from '../../../hooks/useDialog'
import CreateCommitmentDialog from '../../Commitments/components/CreateCommitmentDialog'

interface IOwnerHomeProps {}

const role: ERole = 2

const OwnerHome: React.FunctionComponent<IOwnerHomeProps> = () => {
    const [openCreate, handleOpenCreate, handleCloseCreate] = useDialog()
    return (
        <Styled.HomeContainer>
            <Styled.ActionWrapper>
                <Greeting />
                <Styled.ButtonWrapper>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<DescriptionIcon />}
                        onClick={handleOpenCreate}
                    >
                        CREATE COMMITMENT
                    </Button>
                    {role == ERole.OWNER_ROLE && (
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

            {openCreate && (
                <CreateCommitmentDialog
                    openDialog={openCreate}
                    handleOpenDialog={handleOpenCreate}
                    handleCloseDialog={handleCloseCreate}
                />
            )}
        </Styled.HomeContainer>
    )
}

export default OwnerHome
