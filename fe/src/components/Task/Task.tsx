import React from 'react'
import { useState, useEffect } from 'react'
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import {isFetching, getTodos, isDeleting, deleteCall} from '../../actions/todoActions'
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
    
    
    //set dispatch
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(isFetching())
        dispatch(getTodos(token))
    }, [isPosting, isDeletingTask])

    const deleteTask = (id:string, token:string|null) => {
        dispatch(isDeleting());
        dispatch(deleteCall(id, token));
    }
    return (
        <div>
            <ul>
                {
                    todos.map((e:any)=>{
                        return (
                        <li key={e._id}>
                            <h2>{e.title}</h2>
                            <p>{e.body}</p>
                            <span>{e.date}</span>
                            <span onClick={() => {deleteTask(e._id, token)}}>x</span>
                        </li>)
                    })
                }
            </ul>
        </div>
    )
}

export default Task
