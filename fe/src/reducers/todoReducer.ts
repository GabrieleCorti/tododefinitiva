import { START_POSTING, POST_TODO, FAILED_POST } from "../actionTypes";

const InitialState = {
    isPosting: false
}

export const todoReducer = (state=InitialState, action:any) => {
    switch (action.type) {
        case START_POSTING:
            
            return {...state, isPosting:true };
        case POST_TODO:
            return {...state, isPosting:false };
        case FAILED_POST:
            return {...state, isPosting:false };
        default:
            return state;
    }
}