import { IS_VERIFYED, IS_NOT_VERIFYED } from "../actionTypes"
import axios from "axios"

const verify = () => {
    return {
        type: IS_VERIFYED
    }
}

const notVerify = () => {
    return {
        type: IS_NOT_VERIFYED
    }
}

export const verifyToken = (token:string | null) => {
    return (dispatch:any) => {
        return axios.get('http://localhost:5000/autorization', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res=>{
            /* console.log(res); */
            res.data.isAuthorized && dispatch(verify()) || dispatch(notVerify());
        })
        .catch(err=> {
            console.log(err);
        })
    }
}