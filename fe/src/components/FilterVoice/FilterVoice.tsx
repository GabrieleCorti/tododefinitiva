import React from 'react'
import {Filter, FilterText} from './Style'

interface MyProps {
    children: React.ReactNode,
    voice:string
}


const FilterVoice = ({children, voice}:MyProps) => {
    return (
        <Filter>
            {children}
            <FilterText>{voice}</FilterText>
        </Filter>
    )
}

export default FilterVoice
