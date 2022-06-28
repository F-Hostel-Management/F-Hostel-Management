import * as React from 'react'
import Icon, { IconName } from '../../../Icon'

import * as Styled from './styles'

interface ICustomToolbarProps {
    children?: any
    title: string
    iconName: IconName | undefined
}

const CustomToolbar: React.FunctionComponent<ICustomToolbarProps> = ({
    children,
    title = 'Table Title',
    iconName,
}) => {
    return (
        <Styled.GridToolbar>
            <Styled.WrapperLeft>
                {iconName && (
                    <Icon name={iconName} sx={{ marginRight: '8px' }} />
                )}
                <Styled.Title variant="subtitle2">
                    <strong>{title}</strong>
                </Styled.Title>
                {/* <SearchInput loading={true} width="250px" height="34px" /> */}
            </Styled.WrapperLeft>
            <Styled.WrapperRight>{children}</Styled.WrapperRight>
        </Styled.GridToolbar>
    )
}

export default CustomToolbar
