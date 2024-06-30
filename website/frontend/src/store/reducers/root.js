import { combineReducers } from "redux";
import alert from "./alert";
import propertyReducer from './data';

const root = combineReducers({
	alert,
	property: propertyReducer,
});

export default root;
