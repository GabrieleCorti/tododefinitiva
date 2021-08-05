import React from 'react'
import InputBar from '../InputBar'
import Task from '../Task'
import { useDispatch } from 'react-redux'
import { RootStateOrAny, useSelector } from 'react-redux'
import { LogOutApp } from "../../actions/loginAction";
import { logOutRegister } from "../../actions/registerActions";
import { Link } from 'react-router-dom'

const Todo = () => {
    //const for diapatch 
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(logOutRegister())
        dispatch(LogOutApp())
        localStorage.clear()
      }
    const isAuth = useSelector((state:RootStateOrAny) => state.todoReducer.isAuth)
    return (
        <div>
           {
               isAuth ? 
               <>
                <Task />
                <InputBar />
               </> :
               <h1>la sessione è scaduta, torna a <Link to='/login' onClick={logout}>login</Link></h1>
           }
        </div>
    )
}

export default Todo
