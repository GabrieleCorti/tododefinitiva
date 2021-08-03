import { IS_VERIFYED, IS_NOT_VERIFYED } from "../actionTypes";

const InitialState = {
    isAuthorised: false 
}

export const verifyReducer = (state = InitialState, action:any) => {
    switch (action.type) {
        case IS_VERIFYED:
            return {...state, isAuthorised: true};
        case IS_NOT_VERIFYED:
            return {...state, isAuthorised: false};
        default:
            return state;
    }
}