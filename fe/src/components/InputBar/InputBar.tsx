import React from 'react'
import { useState } from 'react'
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux'
import {isPosting, postTodo} from '../../actions/todoActions'
import {InputSection, TitleInput, TextInput, BtnAdd} from './Style'

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
        <InputSection>
            <label htmlFor="title">Titolo</label>
            <TitleInput value={todo.title} type="text" id='title' onChange={e=>setTodo({...todo, title: e.target.value})}/>
            <div>
                <TextInput value={todo.body} type="text" id='todo' onChange={e=>setTodo({...todo, body: e.target.value})}/>
                <input type="date" onChange={e=>setTodo({...todo, expDate: e.target.value})} />
                <BtnAdd onClick={SubmitTodo}>+</BtnAdd>
            </div>
        </InputSection>
    )
}

export default InputBar
