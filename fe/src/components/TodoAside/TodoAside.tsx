import React from 'react'
import { Aside } from './Style'

const TodoAside = ({onClick}:any) => {
    return (
        <Aside>
             <button onClick={onClick}>Logout</button>
        </Aside>
    )
}

export default TodoAside
