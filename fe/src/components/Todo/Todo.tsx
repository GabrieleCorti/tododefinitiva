import React from 'react'
import InputBar from '../InputBar'
import Task from '../Task'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { RootStateOrAny, useSelector } from 'react-redux'
import { LogOutApp } from "../../actions/loginAction";
import { logOutRegister } from "../../actions/registerActions";
import { Link } from 'react-router-dom'

const Todo = () => {
    //const for diapatch 
    const dispatch = useDispatch()
    //Hydtory for redirect
    let history = useHistory()
    const logout = (isNoPermission = true ) => {
        dispatch(logOutRegister())
        dispatch(LogOutApp())
        localStorage.clear()
        if (!isNoPermission ) {
            history.push('/login')
        }
      }
    const isAuth = useSelector((state:RootStateOrAny) => state.todoReducer.isAuth)
    return (
        <div>
           {
               isAuth ? 
               <>
                <button onClick={()=>{logout(false)}}>Logout</button>
                <Task />
                <InputBar />
               </> :
               <h1>la sessione è scaduta, torna a <Link to='/login' onClick={()=>{logout()}}>login</Link></h1>
           }
        </div>
    )
}

export default Todo
