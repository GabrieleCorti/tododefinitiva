import { LOGIN, START_LOGING, NOT_FOUND_USER } from "../actionTypes";


interface State {
    name:string,
    email:string,
    isLoging:boolean,
    isNotFound:boolean
}

const InitialState:State = {
    name: '',
    email: '',
    isNotFound: false,
    isLoging: false
}

export const loginReducer = (state:State = InitialState, action:any) => {
    switch (action.type) {
        case START_LOGING:
            return {...state, isLoging: true};
        case LOGIN:
            return {...state, name: action.payload.name, email: action.payload.email, isLoging: false}
        case NOT_FOUND_USER:
            return {...state, isNotFound:true}
        default:
            return state;
    }
}