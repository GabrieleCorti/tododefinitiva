import { GET_NAME } from "../actionTypes"

export const getName = (name:string) => {
    return {
        type: GET_NAME,
        payload: name 
    }
}