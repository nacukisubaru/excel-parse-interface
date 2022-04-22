export const SET_EXCEL_DATA = "SET/SET_EXCEL_DATA";

const initialState = {
    excelData: ''
};

export const excelReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EXCEL_DATA:
            return { ...state, excelData: action.payload };
        default:
            return state;
    }
};
