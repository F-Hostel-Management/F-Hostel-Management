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
import CreateHostelDialog from '../components/CreateHostelDialog'
import { IHostel } from '../../../interface/IHostel'

interface IOwnerHomeProps {
    hostels: IHostel[]
}

const role: ERole = 2

const OwnerHome: React.FunctionComponent<IOwnerHomeProps> = ({ hostels }) => {
    const [openCreateCommit, handleOpenCreateCommit, handleCloseCreateCommit] =
        useDialog()
    const [openCreateHostel, handleOpenCreateHostel, handleCloseCreateHostel] =
        useDialog()
    return (
        <Styled.HomeContainer>
            <Styled.ActionWrapper>
                <Greeting />
                <Styled.ButtonWrapper>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<DescriptionIcon />}
                        onClick={handleOpenCreateCommit}
                    >
                        CREATE COMMITMENT
                    </Button>
                    {role == ERole.OWNER_ROLE && (
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddCircleIcon />}
                            onClick={handleOpenCreateHostel}
                        >
                            CREATE ROOM
                        </Button>
                    )}
                </Styled.ButtonWrapper>
            </Styled.ActionWrapper>
            <React.Fragment>
                {hostels.map((hostel) => (
                    <HostelCard key={hostel?.id} hostelInfo={hostel} />
                ))}
            </React.Fragment>

            {openCreateCommit && (
                <CreateCommitmentDialog
                    openDialog={openCreateCommit}
                    handleCloseDialog={handleCloseCreateCommit}
                />
            )}
            {openCreateHostel && (
                <CreateHostelDialog
                    openDialog={openCreateHostel}
                    handleCloseDialog={handleCloseCreateHostel}
                />
            )}
        </Styled.HomeContainer>
    )
}

export default OwnerHome
