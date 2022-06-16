import React, { FC } from 'react'

import { CardActions } from '@mui/material'

import * as Styled from './styles'

interface ICardWithImageProps {
    image: {
        src: string
        alt?: string
    }
    content: React.ReactElement
    actions?: React.ReactElement
    children?: React.ReactElement
}

const CardWithImage: FC<ICardWithImageProps> = ({
    image,
    content,
    actions,
    children,
}) => {
    return (
        <Styled.CardContainer>
            <Styled.CardImage src={image.src} alt={image.alt} />

            <Styled.CardContentMUI>
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
            </Styled.CardContentMUI>
            {children}
        </Styled.CardContainer>
    )
}

export default CardWithImage
