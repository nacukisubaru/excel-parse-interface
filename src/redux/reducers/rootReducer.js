import { combineReducers } from "redux";
import { excelReducer } from "./excelReducer";

export const rootReducer = combineReducers({
    excelManager: excelReducer,
});