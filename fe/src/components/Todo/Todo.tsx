import React from 'react'
import InputBar from '../InputBar'
import Task from '../Task'
import { useHistory } from 'react-router'
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux'
import { LogOutApp } from "../../actions/loginAction";
import { logOutRegister } from "../../actions/registerActions";
import { Page, RegisterBox, Title } from "../Register/Style";
import { AppVew, TodoSection, AddTodo } from './Style'
import { Link } from 'react-router-dom'
import TodoAside from '../TodoAside'
import { OpenForm, CloseForm } from '../../actions/todoActions'

const TodoVew = ({onClick}:any) => {
    const isOpen = useSelector((state:RootStateOrAny) => state.todoReducer.isOpen)
    const dispatch = useDispatch();
    
    const OpenClose = () => {
        (isOpen && dispatch(CloseForm())) || dispatch(OpenForm())
    }
    return (
        <AppVew>
                <TodoAside onClick={onClick} />
                <TodoSection>
                    <Task />
                    {isOpen && <InputBar />}
                    <AddTodo className='large' onClick={OpenClose}/>
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
