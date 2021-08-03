import { START_POSTING, POST_TODO, FAILED_POST, START_FETCHING_TODOS, GET_TODO, FAILED_GET } from "../actionTypes";
import axios from "axios";

interface Todo {
    title:string,
    body:string,
    expDate:string | null,
    token:string | null
}

interface TodoGet {
    _id:string,
    title:string,
    body:string,
    date:string,
    isCompleted:boolean,
    belongsTo:string
}


export const isPosting = () => {
    return {
        type: START_POSTING
    }
}

export const isFetching = () => {
    return {
        type: START_FETCHING_TODOS,
    }
}

//post Todo
const post = () => {
    return {
        type: POST_TODO
    }
}

const failedPost = () => {
    return {
        type: FAILED_POST
    }
}

export const postTodo = (obj:Todo) => {
    return (dispatch:any) => {
        return axios({
            method: "POST",
            url: "http://localhost:5000/addTodo",
            headers: {
                Authorization: `Bearer ${obj.token}` 
            },
            data: {
                title: obj.title,
                body: obj.body,
                expDate: obj.expDate
            }
        })
        .then((res)=>{
            res.data.isPosted && dispatch(post()) || dispatch(failedPost())
        })
        .catch((err)=>{
            console.log(err);
            dispatch(failedPost())
        })
    }
}
//get Todo
const failedGet = () => {
    return {
        type: FAILED_GET,
        payload: {} 
    }
}


const get = (todos:TodoGet) => {
    return {
        type: GET_TODO,
        payload: todos 
    }
}

export const getTodos = () => {
    return (dispatch:any) => {
        return axios.get('http://localhost:5000/todos')
            .then(res=>{
                if (res.data.isFound) {
                    dispatch(get(res.data.data))
                } else {
                    dispatch(failedGet())
                }
            })
            .catch(err=>{
                console.log(err);
                dispatch(failedGet())
            })
    }
}