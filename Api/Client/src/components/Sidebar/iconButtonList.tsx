import * as React from 'react'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import KeyIcon from '@mui/icons-material/Key'
import LanguageIcon from '@mui/icons-material/Language'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'

interface IIconButtonListProps {
    icon: React.ReactElement
    path: string
}

export const IconButtonList: { items: Array<IIconButtonListProps> } = {
    items: [
        { icon: <PermIdentityIcon />, path: '/home/profile' },
        { icon: <LanguageIcon />, path: '' },
        { icon: <KeyIcon />, path: '' },
        { icon: <ExitToAppIcon />, path: '' },
    ],
}
