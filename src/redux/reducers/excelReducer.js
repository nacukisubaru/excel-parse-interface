export const SET_EXCEL_DATA = "SET/SET_EXCEL_DATA";
export const SET_EXCEL_PARSED_DATA = "SET/SET_EXCEL_PARSED_DATA";

const initialState = {
    excelData: [],
    excelDataParsed: []
};

export const excelReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EXCEL_DATA:
            return { ...state, excelData: action.payload };
        case SET_EXCEL_PARSED_DATA:
            return { ...state, excelDataParsed: action.payload };
        default:
            return state;
    }
};
