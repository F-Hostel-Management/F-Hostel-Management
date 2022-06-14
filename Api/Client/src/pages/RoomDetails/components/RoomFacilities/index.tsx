import React, { Dispatch, FC, SetStateAction } from 'react'
import * as Styled from './styles'
import {
    IFacility,
    IFacilityDescription,
} from '../../../../interface/IFacility'
import FacilityComboBox from './FacilityComboBox'
import FacilityChips from './FacilityChips'

interface IRoomFacilitiesProps {
    value: IFacility[]
    setValue: Dispatch<SetStateAction<IFacility[]>>
    descriptions: Record<string, IFacilityDescription>
    setDescriptions: Dispatch<
        SetStateAction<Record<string, IFacilityDescription>>
    >
}

const RoomFacilities: FC<IRoomFacilitiesProps> = ({
    value,
    setValue,
    descriptions,
    setDescriptions,
}) => {
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
