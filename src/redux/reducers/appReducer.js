export const SET_ERROR_MESSAGE = "SET/SET_ERROR_MESSAGE";
export const SET_SHOW_SNACK = "SET/SET_SHOW_SNACK";
export const TOGGLE_PRELOADER = "TOGGLE/TOGGLE_PRELOADER"; 

const initialState = {
    message: {},
    showSnack: false,
    preloader: false
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERROR_MESSAGE:
            return { ...state, message: action.payload };
        case SET_SHOW_SNACK:
            return { ...state, showSnack: action.payload };
        case TOGGLE_PRELOADER:
            return { ...state, preloader: action.payload };
        default:
            return state;
    }
};
