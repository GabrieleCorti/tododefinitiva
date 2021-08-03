import { combineReducers } from 'redux'
import { registerReducer } from './registerReducer'
import { loginReducer } from './loginReducer';
import { verifyReducer } from './verifyReducer';
import { todoReducer } from './todoReducer';

const rootReducer = combineReducers({
    registerReducer,
    loginReducer,
    verifyReducer,
    todoReducer
});

export default rootReducer 