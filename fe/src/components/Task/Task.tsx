import React from 'react'
import { useState, useEffect } from 'react'
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import {isFetching, getTodos, isDeleting, deleteCall} from '../../actions/todoActions'
import {TaskContainer, Todo, TaskTitle, TaskBody, Date, TaskMenuIcon, Menu, MenuVoice} from './Style'
interface Todo {
    _id:string,
    title:string,
    body:string,
    date:string,
    isCompleted:boolean,
    belongsTo:string
}

const Task = () => {
    const todos:Todo[] = useSelector((state:RootStateOrAny) => state.todoReducer.todos)
    const isPosting = useSelector((state:RootStateOrAny) => state.todoReducer.isPosting)
    const isDeletingTask = useSelector((state:RootStateOrAny )=> state.todoReducer.isDeleting)
    const token = localStorage.getItem('token')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [id, setId] = useState<string>('')
    
    //set dispatch
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(isFetching())
        dispatch(getTodos(token))
    }, [isPosting, isDeletingTask])

    const deleteTask = (id:string, token:string|null) => {
        dispatch(isDeleting());
        dispatch(deleteCall(id, token));
        OpenClose();
    }

    const OpenClose = (id:string = '') => {
        setId(id)
        setIsOpen(!isOpen)
    }
    return (
        <TaskContainer onClick={()=> isOpen && OpenClose()} >
            <ul>
                {
                    todos.map((e:any)=>{
                        return (
                        <Todo key={e._id} onClick={()=> isOpen && OpenClose()} >
                            <div className='menu'>
                                <TaskMenuIcon onClick={()=>OpenClose(e._id)} />
                                {isOpen && id === e._id && 
                                    <Menu>
                                        <ul>
                                            <MenuVoice onClick={() => {deleteTask(e._id, token)}}>Elimina</MenuVoice>
                                        </ul>
                                    </Menu>}
                            </div>
                            <TaskTitle>{e.title}</TaskTitle>
                            <TaskBody>{e.body}</TaskBody>
                            {e.expDate && <><hr />
                            <Date>da completare entro {e.expDate}</Date></> }
                        </Todo>)
                    })
                }
            </ul>
        </TaskContainer>
    )
}

export default Task
