import * as React from 'react'

import * as Styled from './styles'

interface IIconButtonCustomProps {
    textColor?: string
    bgrColor?: string
    disabled?: boolean
    children: any
    [x: string | number | symbol]: unknown
}

const IconButtonCustom: React.FunctionComponent<IIconButtonCustomProps> = ({
    textColor = '#fff',
    bgrColor = '#17A2B8',
    disabled = false,
    children,
    ...others
}) => {
    return (
        <Styled.IconButton
            textColor={textColor}
            bgrColor={bgrColor}
            disabled={disabled}
            {...others}
        >
            {children}
        </Styled.IconButton>
    )
}

export default IconButtonCustom
