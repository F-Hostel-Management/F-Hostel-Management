import React, { FC } from 'react'

import { useLocation } from 'react-router-dom'

import { NavigateNext } from '@mui/icons-material'
import { Breadcrumbs, Link, Stack } from '@mui/material'

import { pathNames as pathNameLabels } from '../../utils/pathName'

interface IBreadcrumbProps {}

const Breadcrumb: FC<IBreadcrumbProps> = () => {
    let location = useLocation()

    const pathNames: string[] = location.pathname
        .split('/')
        .filter((path) => pathNameLabels[path])

    let href = window.location.origin
    let breadcrumbs = pathNames.map((path: string, index) => {
        href += '/' + path
        return (
            <Link
                underline="hover"
                variant="caption"
                key={index}
                color="inherit"
                href={
                    index == pathNames.length - 1 || !pathNameLabels[path]
                        ? '#'
                        : href
                }
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
                        <NavigateNext
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
