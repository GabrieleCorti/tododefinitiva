import React from 'react'
import {Filter, FilterText} from './Style'
import {useState} from 'react'
interface MyProps {
    children: React.ReactNode,
    voice:string
}


const FilterVoice = ({children, voice}:MyProps) => {
    const [isClicked, setIsClicked] = useState<boolean>(false)
    const Active = () => {
        setIsClicked(!isClicked)
    }
    return (
        <Filter isActive={isClicked} onClick={Active}>
            {children}
            <FilterText>{voice}</FilterText>
        </Filter>
    )
}

export default FilterVoice
