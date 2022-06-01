import React, { FC } from 'react'
import QrCode from '../../../../../components/QrCode'
import * as Styled from './styles'
interface IStep3Props {}

const Step3: FC<IStep3Props> = () => {
    return (
        <Styled.ContainerStep>
            <QrCode link="https://www.facebook.com/monkeyD.N.Huy" size={200} />
        </Styled.ContainerStep>
    )
}

export default Step3
