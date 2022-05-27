import React, { FC } from 'react'

import {
    CardContent,
    CardActions,
} from '@mui/material'

import * as Styled from './styles'

interface ICardWithImageProps {
    image: {
        src: string
        alt?: string
    }
    content: React.ReactElement
    actions: React.ReactElement
}

const CardWithImage: FC<ICardWithImageProps> = ({
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

export default CardWithImage
