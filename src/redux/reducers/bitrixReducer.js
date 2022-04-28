export const SET_GROUP = "GROUP/SET_GROUP";
export const SET_GROUPS_LIST = "GROUP/SET_GROUPS_LIST";
export const SET_PORTALS_LIST = "PORTALS/SET_PORTALS_LIST";
export const SET_PORTAL_ID = "PORTALS/SET_PORTAL_ID";

const initialState = {
    groupId: 0,
    portalId: 0,
    groupsList: [],
    portalsList: [],
};

export const bitrixReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GROUP:
            return { ...state, groupId: action.payload };
        case SET_GROUPS_LIST:
            return { ...state, groupsList: action.payload };
        case SET_PORTALS_LIST:
            return { ...state, portalsList: action.payload };
        case SET_PORTAL_ID: 
            return { ...state, portalId: action.payload };
        default:
            return state;
    }
};
