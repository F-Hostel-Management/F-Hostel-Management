import React, { FC } from 'react'
import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
    },
}))

interface IBootstrapTooltipProps {
    title: string
    children?: any
}

const BootstrapTooltip: FC<IBootstrapTooltipProps> = ({ title, children }) => {
    return <CustomTooltip title={title}>{children}</CustomTooltip>
}

export default BootstrapTooltip
