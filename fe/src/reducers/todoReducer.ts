import { START_POSTING, POST_TODO, FAILED_POST, START_FETCHING_TODOS, GET_TODO, FAILED_GET, NO_AUTH} from "../actionTypes";

interface State {
    isPosting:boolean,
    isFetching:boolean,
    todos: Todo[] | []
    isAuth: boolean
}

interface Todo {
    _id:string,
    title:string,
    body:string,
    date:string,
    isCompleted:boolean,
    belongsTo:string
} 


const InitialState:State = {
    isFetching: false,
    isPosting: false,
    todos: [],
    isAuth:true
}

export const todoReducer = (state=InitialState, action:any) => {
    switch (action.type) {
        case START_POSTING:
            return {...state, isPosting:true };
        case POST_TODO:
            return {...state, isPosting:false };
        case FAILED_POST:
            return {...state, isPosting:false };
        case START_FETCHING_TODOS:
            return {...state, isFetching: true, isAuth:true}
        case FAILED_GET:
            return {...state, isFetching: false}
        case GET_TODO:
            return {...state, todos: action.payload, isAuth:true}
        case NO_AUTH: 
        return {...state, isAuth:false }
        default:
            return state;
    }
}