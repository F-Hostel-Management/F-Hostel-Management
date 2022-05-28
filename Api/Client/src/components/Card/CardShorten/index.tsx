import React, { FC, useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { CardContent, IconButton } from '@mui/material'

import * as Styled from './styles'

interface ICardShortenProps {
    children?: any
    title: string
}

const CardShorten: FC<ICardShortenProps> = ({ title, children }) => {
    const [isShowChart, setIsShowChart] = useState<boolean>(true)
    return (
        <Styled.CardMUI>
            <Styled.CardHeaderMUI
                action={
                    <IconButton
                        aria-label="settings"
                        onClick={() => setIsShowChart(!isShowChart)}
                    >
                        {isShowChart ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                }
                title={title}
            />
            {children && <CardContent>{children}</CardContent>}
        </Styled.CardMUI>
    )
}

export default CardShorten
