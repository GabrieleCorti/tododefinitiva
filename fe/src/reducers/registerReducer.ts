import { GET_NAME } from '../actionTypes/index'

interface State {
    user:string
}


const initialState:State = {
    user: ''
}


export const registerReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case GET_NAME:
            return {...state, user: action.payload}
        default:
            return state
    }
}