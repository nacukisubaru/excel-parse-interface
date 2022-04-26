import { SET_EXCEL_DATA, SET_EXCEL_PARSED_DATA } from "../reducers/excelReducer";

export const setExcelData = (data) => {
    return {type: SET_EXCEL_DATA, payload: data};
}

export const setParsedData = (data) => {
    return {type:SET_EXCEL_PARSED_DATA, payload: data}
}