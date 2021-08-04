import React from 'react'
import InputBar from '../InputBar'
import Task from '../Task'
import { RootStateOrAny, useSelector } from 'react-redux'

const Todo = () => {
    const isAuth = useSelector((state:RootStateOrAny) => state.todoReducer.isAuth)
    return (
        <div>
           {
               isAuth ? 
               <>
                <Task />
                <InputBar />
               </> :
               <h1>la sessione è scaduta</h1>
           }
        </div>
    )
}

export default Todo
