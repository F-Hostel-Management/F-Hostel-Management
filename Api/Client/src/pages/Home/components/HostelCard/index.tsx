import React, { FC, Fragment } from 'react'

import CardWithImage from '../../../../components/Card/CardWithImage'
import { Typography, Button, Rating } from '@mui/material'

import { IRole } from '../../../../utils/enums'
import CardOptions from '../CardOptions'
import * as Styled from './styles'

interface IHostelCardProps {
    imageSrc?: string
    name?: string
}
const role: IRole = 2
const HostelCard: FC<IHostelCardProps> = () => {
    return (
        <CardWithImage
            image={{
                src: 'data:image/jpeg;base64,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',
                alt: 'Hostel image',
            }}
            content={
                <React.Fragment>
                    <Typography variant="h4" mb={1}>
                        <strong>The Chicest Motels in America</strong>
                    </Typography>
                    <Typography variant="subtitle1" mb={1}>
                        <span
                            style={{
                                width: '100px',
                                display: 'inline-block',
                            }}
                        >
                            Adress:
                        </span>
                        1220 S. Congress Ave., Austin, Texas
                    </Typography>
                    <Typography variant="body2" mb={1}>
                        <span
                            style={{
                                width: '100px',
                                display: 'inline-block',
                            }}
                        >
                            {role == IRole.OWNER_ROLE ? ' Manager:' : 'Owner'}
                        </span>
                        Le Xuan Dai
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <span
                            style={{
                                width: '100px',
                                display: 'inline-block',
                            }}
                        >
                            Feedback:
                        </span>
                        <Fragment>
                            <Rating name="read-only" value={4} readOnly />
                        </Fragment>
                    </Typography>
                </React.Fragment>
            }
            actions={
                <Button variant="contained" color="primary">
                    Details
                </Button>
            }
        >
            <Styled.OptionWrapper>
                <CardOptions />
            </Styled.OptionWrapper>
        </CardWithImage>
    )
}

export default HostelCard
