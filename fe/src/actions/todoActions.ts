import { START_POSTING, POST_TODO, FAILED_POST } from "../actionTypes";
import axios from "axios";

interface Todo {
    title:string,
    body:string,
    expDate:string | null,
    token:string | null
}


export const isPosting = () => {
    return {
        type: START_POSTING
    }
}  

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