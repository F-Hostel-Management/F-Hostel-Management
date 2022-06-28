import React, { FC } from 'react'
import { useAppSelector } from '../../hooks/reduxHook'
import { ERole } from '../../utils/enums'
import RoomDetails from '../RoomDetails'
import OwnerRooms from './OwnerRoom'

interface IRoomProps {}

const Room: FC<IRoomProps> = (props) => {
    const role = useAppSelector(({ auth }) => auth.currentUser?.role)
    return role === ERole.TENANT_ROLE ? <RoomDetails /> : <OwnerRooms />
}

export default Room
