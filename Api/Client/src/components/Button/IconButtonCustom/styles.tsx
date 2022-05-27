import styled from 'styled-components'

import { IconButton as Button } from '@mui/material'
import { LightenDarkenColor } from '../../../utils/LightenDarkenColor'

interface IIconButtonProps {
    textColor: string
    bgrColor: string
}

export const IconButton = styled(Button)<IIconButtonProps>`
    background-color: ${(prop) => prop.bgrColor} !important;
    color: ${(prop) => prop.textColor} !important;

    &:hover {
        background-color: ${(prop) => LightenDarkenColor(prop.bgrColor, -40)} !important;
    }
`
