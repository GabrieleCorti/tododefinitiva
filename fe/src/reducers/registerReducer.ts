import { GET_NAME, START_FETCHING, HAS_ERROR, LOGOUT_REGISTER} from '../actionTypes/index'
interface State {
    user:string
    isFetching:boolean
    error:string
}



const initialState:State = {
    user: '',
    isFetching: false,
    error: ''
}


export const registerReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case GET_NAME:
            return {...state, user: action.payload, isFetching: false}
        case START_FETCHING:
            return {...state, isFetching: true}
        case HAS_ERROR:
            return {...state, error: action.payload, isFetching: false }
        case LOGOUT_REGISTER:
            return {...state, user: ''}
        default:
            return state
    }
}