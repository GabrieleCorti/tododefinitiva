import { combineReducers } from 'redux'
import { registerReducer } from './registerReducer'
import { loginReducer } from './loginReducer';
import { verifyReducer } from './verifyReducer';

const rootReducer = combineReducers({
    registerReducer,
    loginReducer,
    verifyReducer
});

export default rootReducer 