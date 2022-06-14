import React, { FC, useEffect, useState } from 'react'
import * as Styled from './styles'
import { useAppDispatch } from '../../../../hooks/reduxHook'
import {
    IFacility,
    IFacilityDescription,
} from '../../../../interface/IFacility'
import { fetchFacility } from '../../../../slices/facilitySlice'
import { getItem } from '../../../../utils/LocalStorageUtils'
import FacilityComboBox from './FacilityComboBox'
import FacilityChips from './FacilityChips'

interface IRoomFacilitiesProps {}

const RoomFacilities: FC<IRoomFacilitiesProps> = (props) => {
    const dispatch = useAppDispatch()
    const hostelId = getItem('currentHostelId')

    const [value, setValue] = useState<IFacility[]>([])
    const [descriptions, setDescriptions] = useState<
        Record<string, IFacilityDescription>
    >({})

    useEffect(() => {
        dispatch(fetchFacility(hostelId))
    }, [dispatch, hostelId])
    return (
        <Styled.Container>
            <FacilityComboBox
                value={value}
                setValue={setValue}
                descriptions={descriptions}
                setDescriptions={setDescriptions}
            />
            <Styled.PaperMUI elevation={3}>
                <FacilityChips
                    value={value}
                    setValue={setValue}
                    descriptions={descriptions}
                    setDescriptions={setDescriptions}
                />
            </Styled.PaperMUI>
        </Styled.Container>
    )
}

export default RoomFacilities
