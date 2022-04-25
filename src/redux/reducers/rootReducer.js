import { combineReducers } from "redux";
import { excelReducer } from "./excelReducer";
import { appReducer } from "./appReducer";

export const rootReducer = combineReducers({
    excelManager: excelReducer,
    appManager: appReducer
});