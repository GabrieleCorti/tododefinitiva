import React from 'react'
import { useState } from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'

interface Todo {
    title:string,
    body:string,
    expDate:string
}

const InputBar = () => {
    const name = useSelector((state:RootStateOrAny) => state.loginReducer.name)
    const [todo, setTodo] = useState<Todo>({
        title: '',
        body: '',
        expDate: ''
    })
    
    return (
        <div>
            <input type="text" onChange={e=>setTodo({...todo, title: e.target.value})}/>
            <div>
                <input type="text" onChange={e=>setTodo({...todo, body: e.target.value})}/>
                <input type="date" onChange={e=>setTodo({...todo, expDate: e.target.value})} />
            </div>
            <button>Aggiungi Task</button>
        </div>
    )
}

export default InputBar
