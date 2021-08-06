import React from 'react'
import { Aside, MenuHeader, UserName, MenuIcon } from './Style'
import { useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux'
import { Menu, MenuVoice } from '../Task/Style';
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
import FilterVoice from '../FilterVoice/FilterVoice';

const TodoAside = ({onClick}:any) => {
    const Name = useSelector((state:RootStateOrAny) => state.loginReducer.name)
    const User = useSelector((state:RootStateOrAny) => state.registerReducer.user)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const OpenClose = () => {
        setIsOpen(!isOpen)
    }

    return (
        <Aside onClick={() => isOpen && OpenClose()} >
            <MenuHeader onClick={() => isOpen && OpenClose()}>
                <UserName>Ciao {Name || User}</UserName>
                <div className='menu'>
                    <MenuIcon onClick={OpenClose}/>
                    {isOpen && <Menu>
                        <ul>
                            <MenuVoice onClick={onClick}>Logout</MenuVoice>
                        </ul>
                    </Menu>}
                    {/* <button onClick={onClick}>Logout</button> */}
                </div>  
            </MenuHeader>
            <FilterVoice voice='Completati'>
                <CheckCircleOutlineRoundedIcon />
            </FilterVoice>
            <FilterVoice voice='Preferiti'>
                <StarBorderOutlinedIcon />
            </FilterVoice>
            <FilterVoice voice='In scadenza'>
                <TimerOutlinedIcon />
            </FilterVoice>
             
        </Aside>
    )
}

export default TodoAside
