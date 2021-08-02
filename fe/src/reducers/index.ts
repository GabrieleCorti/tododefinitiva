import { combineReducers } from 'redux'
import { registerReducer } from './registerReducer'
import { loginReducer } from './loginReducer';

const rootReducer = combineReducers({
    registerReducer,
    loginReducer
});

export default rootReducer 