import React, {FC} from 'react';
import './GlobalStyles.css'

interface Props {
    children : React.ReactElement
}

const GlobalStyles: FC<Props> = ({ children }) => {
    return children
}

export default GlobalStyles

