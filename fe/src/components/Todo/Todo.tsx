import React from 'react'
import InputBar from '../InputBar'
import Task from '../Task'
import { RootStateOrAny, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

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
               <h1>la sessione è scaduta, torna a <Link to='/login'>login</Link></h1>
           }
        </div>
    )
}

export default Todo
