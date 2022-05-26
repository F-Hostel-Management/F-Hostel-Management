import React, { FC } from 'react'

import { useLocation } from 'react-router-dom'

import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs, Link, Stack } from '@mui/material'

import { pathNames as pathNameLabels } from '../../utils/pathName'

interface IBreadcrumbProps {}

const Breadcrumb: FC<IBreadcrumbProps> = (props) => {
    let location = useLocation()

    function handleClick(
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) {
        event.preventDefault()
        console.info('You clicked a breadcrumb.')
    }

    const pathNames: string[] = location.pathname.split('/')
    pathNames.shift()
    let href = ''
    let breadcrumbs = pathNames.map((path: string, index) => {
        href += '/' + path
        return (
            <Link
                underline="hover"
                variant="caption"
                key={index}
                color="inherit"
                href={href}
                onClick={handleClick}
            >
                {index == pathNames.length - 1 ? (
                    <strong> {pathNameLabels[path]}</strong>
                ) : (
                    pathNameLabels[path]
                )}
            </Link>
        )
    })

    return (
        <div>
            <Stack spacing={2}>
                <Breadcrumbs
                    separator={
                        <NavigateNextIcon
                            fontSize="small"
                            style={{ marginTop: '4px' }}
                        />
                    }
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
        </div>
    )
}

export default Breadcrumb
