import { SET_ERROR_MESSAGE, SET_SHOW_SNACK } from "../reducers/appReducer";

export const setMessage = (messageObj) => {
    return { type: SET_ERROR_MESSAGE, payload: messageObj };
};

export const showSnack = (isShow) => {
    return { type: SET_SHOW_SNACK, payload: isShow};
}
