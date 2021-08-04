import React from 'react'
import { useState, useEffect } from 'react'
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import {isFetching, getTodos} from '../../actions/todoActions'

interface Todo {
    _id:string,
    title:string,
    body:string,
    date:string,
    isCompleted:boolean,
    belongsTo:string
}

const Task = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const todoList = useSelector((state:RootStateOrAny) => state.todoReducer.todos)
    const token = localStorage.getItem('token')
    
    
    //set dispatch
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(isFetching())
        dispatch(getTodos(token))
        setTodos(todoList)
    }, [todoList])

    
    return (
        <div>
            <ul>
                {
                    todos.map(e=>{
                        return (
                        <li key={e._id}>
                            <h2>{e.title}</h2>
                            <p>{e.body}</p>
                            <span>{e.date}</span>
                        </li>)
                    })
                }
            </ul>
        </div>
    )
}

export default Task
