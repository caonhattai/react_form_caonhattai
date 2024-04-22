import { combineReducers } from "redux";
import studentReducer from "./studentreducer";

const rootRedcuer = combineReducers({ studentReducer });

export default rootRedcuer;
