import { SET_ERROR_MESSAGE, SET_SHOW_SNACK } from "../reducers/appReducer";

export const setErrorMessage = (message) => {
    return { type: SET_ERROR_MESSAGE, payload: message };
};

export const showSnack = (isShow) => {
    return { type: SET_SHOW_SNACK, payload: isShow};
}
