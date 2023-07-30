import { combineReducers } from "redux";
import authStore from './auth';
import resSearch from './resSearch';

export default combineReducers({
    authStore,
    resSearch
})