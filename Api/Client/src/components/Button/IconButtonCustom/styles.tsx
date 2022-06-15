import styled from 'styled-components'

import { IconButton as Button } from '@mui/material'
import { LightenDarkenColor } from '../../../utils/LightenDarkenColor'

interface IIconButtonProps {
    textColor: string
    bgrColor: string
}

export const IconButton = styled(Button)<IIconButtonProps>`
    background-color: ${(props) =>
        props.disabled ? 'rgba(0, 0, 0, 0.12)' : props.bgrColor} !important;
    color: ${(props) =>
        props.disabled ? 'rgba(0, 0, 0, 0.26)' : props.textColor} !important;
    box-shadow: rgb(0 0 0 / 20%) 0px 3px 1px -2px,
        rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px;
    &:hover {
        background-color: ${(props) =>
            LightenDarkenColor(props.bgrColor, -20)} !important;
    }
`
