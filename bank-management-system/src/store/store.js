import { applyMiddleware, combineReducers, createStore } from "redux";
import { AuthReducer } from "./reducers/AuthReducer";
import {LoanReducer} from "./reducers/loan_Reducer";
import {AccountReducer} from "./reducers/account_Reducer"
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReducer=combineReducers({
    auth:AuthReducer,
    loan:LoanReducer,
    account:AccountReducer
})
const midleware=[thunk];
export const store=createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...midleware)),
    
);