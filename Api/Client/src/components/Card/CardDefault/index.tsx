import * as React from 'react'

import StarIcon from '@mui/icons-material/Star'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
} from '@mui/material'

import * as Styled from './styles'

interface ICardDefaultProps {
    image: {
        src: string
        alt?: string
    }
    content: React.ReactElement
    actions: React.ReactElement
}

const CardDefault: React.FunctionComponent<ICardDefaultProps> = ({
    image,
    content,
    actions,
}) => {
    return (
        <Styled.CardContainer>
            <Styled.CardImage src={image.src} alt={image.alt} />

            <CardContent sx={{ flex: 1 }}>
                <React.Fragment>{content}</React.Fragment>
                <CardActions
                    sx={{
                        width: '100%',
                        justifyContent: 'flex-end',
                        padding: '8px 0 0 0',
                    }}
                >
                    {actions}
                </CardActions>
            </CardContent>
        </Styled.CardContainer>
    )
}

export default CardDefault
