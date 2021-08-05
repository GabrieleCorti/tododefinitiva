import React from 'react'
import InputBar from '../InputBar'
import Task from '../Task'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { RootStateOrAny, useSelector } from 'react-redux'
import { LogOutApp } from "../../actions/loginAction";
import { logOutRegister } from "../../actions/registerActions";
import { Page, RegisterBox, Title } from "../Register/Style";
import { AppVew, TodoSection } from './Style'
import { Link } from 'react-router-dom'
import TodoAside from '../TodoAside'

const TodoVew = ({onClick}:any) => {
    return (
        <AppVew>
                <TodoAside onClick={onClick} />
                <TodoSection>
                    <Task />
                    <InputBar />
                </TodoSection>
        </AppVew>
        )
}

const SessionExpiredVew = ({onClick}:any) => {
    
    return (
        <Page>
            <RegisterBox>
                <Title>la sessione è scaduta <br /> torna a <Link to='/login' onClick={onClick}>login</Link></Title>
            </RegisterBox>
        </Page>
    )
}


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
               <TodoVew onClick={()=>{logout(false)}} /> :
               <SessionExpiredVew onClick={()=>{logout()}} />
           }
        </div>
    )
}

export default Todo
