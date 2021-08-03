import { START_POSTING, POST_TODO, FAILED_POST, START_FETCHING_TODOS, GET_TODO, FAILED_GET } from "../actionTypes";

interface State {
    isPosting:boolean,
    isFetching:boolean,
    todos: Todo[] | []

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
    todos: []
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
            return {...state, isFetching: true}
        case FAILED_GET:
            return {...state, isFetching: false}
        default:
            return state;
    }
}