import { SET_EXCEL_DATA } from "../reducers/excelReducer";

export const setExcelData = (data) => {
    return {type: SET_EXCEL_DATA, payload: data};
}