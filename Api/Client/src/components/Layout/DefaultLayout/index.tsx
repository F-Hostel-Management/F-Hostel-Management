import React, { FC, Fragment, ReactElement, useEffect, useState } from 'react'

import { up } from 'styled-breakpoints'
import { useBreakpoint } from 'styled-breakpoints/react-styled'

import { Grid, Typography } from '@mui/material'

import Breadcrumb from '../../Breadcrumd'
import HeaderDefault from '../../Header/HeaderDefault'
import Sidebar from '../../Sidebar'
import * as Styled from './styles'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentHostel, setCurrentHostel } from '../../../slices/homeSlice'
import { getHostelById } from '../../../services/HostelService'
import { getUserRole } from '../../../slices/authSlice'
import { ERole } from '../../../utils/enums'

interface IDefaultLayoutProps {
    title: string
    children: ReactElement
}

const DefaultLayout: FC<IDefaultLayoutProps> = ({ title, children }) => {
    const role = useSelector(getUserRole)

    // breakpoints of screen
    const screen = useBreakpoint(up('lg'))
    const navigate = useNavigate()
    const currentHostel = useSelector(getCurrentHostel)
    const dispatch = useDispatch()

    // isShownSidebar = true, show full sidebar
    // isShowSidebar = false, show only icon
    const [isShownSidebar, setIsShownSidebar] = useState<boolean>(true)

    //isSidebarMobile = true, sidebar with overlay
    const [isSidebarMobile, setIsSidebarMobile] = useState<boolean>(false)

    useEffect(() => {
        if (role === ERole.TENANT_ROLE) {
            const roomId = localStorage.getItem('currentRoomId')
            if (!roomId) {
                navigate('/home')
                return
            }
        }
        if (role === ERole.OWNER_ROLE || role === ERole.MANAGER_ROLE) {
            const hostelId = localStorage.getItem('currentHostelId')
            if (!hostelId) {
                navigate('/home')
                return
            } else if (!Object.keys(currentHostel).length) {
                ;(async () => {
                    const hostel = await getHostelById(hostelId)
                    dispatch(setCurrentHostel(hostel))
                })()
            }
        }
        return
    }, [currentHostel])

    return (
        <Fragment>
            <Styled.Container>
                <HeaderDefault
                    isShownSidebar={isShownSidebar}
                    setIsShownSidebar={setIsShownSidebar}
                    isSidebarMobile={isSidebarMobile}
                    setIsSidebarMobile={setIsSidebarMobile}
                />
                <Grid
                    container
                    direction="row"
                    sx={{
                        zIndex: 1,
                        height: 'calc(100vh - 60px)',
                        overflow: 'hidden',
                    }}
                >
                    <Styled.GridSidebar
                        item
                        lg={isShownSidebar ? 2.5 : 0.5}
                        isSidebarMobile={isSidebarMobile}
                    >
                        <React.Fragment>
                            {isSidebarMobile && (
                                <Styled.Overlay
                                    onClick={() => setIsSidebarMobile(false)}
                                />
                            )}
                            <Sidebar isShownSidebar={isShownSidebar} />
                        </React.Fragment>
                    </Styled.GridSidebar>
                    <Styled.GridMain item lg={isShownSidebar ? 9.5 : 11.5}>
                        <React.Fragment>
                            <Styled.BodyHeader>
                                <Styled.BodyTitle>
                                    <Typography variant="h4">
                                        <strong>{title}</strong>
                                    </Typography>
                                </Styled.BodyTitle>
                                <Styled.Breadcrumb>
                                    <Breadcrumb />
                                </Styled.Breadcrumb>
                            </Styled.BodyHeader>
                        </React.Fragment>
                        {children}
                    </Styled.GridMain>
                </Grid>
            </Styled.Container>
        </Fragment>
    )
}

export default DefaultLayout
