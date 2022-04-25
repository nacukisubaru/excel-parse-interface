import { SET_PROJECT, SET_PROJECT_LIST } from "../reducers/bitrixReducer";

export const setProject = (project) => {
    return {type: SET_PROJECT, payload: project};
}

export const setProjectList = (list) => {
    return {type: SET_PROJECT_LIST, payload: list};
}