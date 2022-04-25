export const SET_PROJECT = "SET/SET_PROJECT";
export const SET_PROJECT_LIST = "SET/SET_PROJECT_LIST";

const initialState = {
    project: 0,
    projectList: []
};

export const bitrixReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROJECT:
            return { ...state, project: action.payload };
        case SET_PROJECT_LIST:
            return { ...state, projectList: action.payload };
        default:
            return state;
    }
};
