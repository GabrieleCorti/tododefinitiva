import React from 'react'
import { useState } from 'react'
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux'
import {isPosting, postTodo} from '../../actions/todoActions'

interface Todo {
    title:string,
    body:string,
    expDate:string | null 
}

const InputBar = () => {
    const token = localStorage.getItem('token');
    const [todo, setTodo] = useState<Todo>({
        title: '',
        body: '',
        expDate: ''
    })
    //dispatch 
    const dispatch = useDispatch()

    const SubmitTodo = () => {
        if (todo.title && todo.body){
            dispatch(isPosting());
            dispatch(postTodo({...todo, token: token }))
            setTodo({...todo, title: '', body: ''})
        }
    }

    return (
        <div>
            <input value={todo.title} type="text" onChange={e=>setTodo({...todo, title: e.target.value})}/>
            <div>
                <input value={todo.body} type="text" onChange={e=>setTodo({...todo, body: e.target.value})}/>
                <input type="date" onChange={e=>setTodo({...todo, expDate: e.target.value})} />
            </div>
            <button onClick={SubmitTodo}>Aggiungi Task</button>
        </div>
    )
}

export default InputBar
