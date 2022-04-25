export const SET_ERROR_MESSAGE = "SET/SET_ERROR_MESSAGE";
export const SET_SHOW_SNACK = "SET/SET_SHOW_SNACK";

const initialState = {
    errorMessage: '',
    showSnack: false
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR_MESSAGE:
            return { ...state, errorMessage: action.payload };
        case SET_SHOW_SNACK:
            return { ...state, showSnack: action.payload };
        default:
            return state;
    }
};
