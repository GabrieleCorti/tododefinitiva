import { LOGIN, START_LOGING, NOT_FOUND_USER } from "../actionTypes";
import axios from 'axios'

interface Obj {
    email:string
    name:string 
}


export const startLogin = () => {
    return {
        type: START_LOGING
    }
}

const notFound = () => {
    return {
        type: NOT_FOUND_USER
    }
}

const getUserData = (obj:Obj) => {
    return {
        type: LOGIN,
        payload: obj
    }
}

export const logIn = () => {
    return (dispatch:any) => {
        return axios.get('http://localhost:5000/login')
                    .then(res => {
                        if (res.data.isFound) {
                            dispatch(getUserData(res.data.data))
                        } else {
                            dispatch(notFound());
                        }
                    })
                    .catch((err)=>{
                        console.log(err); 
                    })
    }
}