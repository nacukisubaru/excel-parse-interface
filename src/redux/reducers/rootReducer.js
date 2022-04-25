import { combineReducers } from "redux";
import { excelReducer } from "./excelReducer";
import { appReducer } from "./appReducer";
import { bitrixReducer } from "./bitrixReducer";

export const rootReducer = combineReducers({
    excelManager: excelReducer,
    appManager: appReducer,
    bitrixManager: bitrixReducer
});