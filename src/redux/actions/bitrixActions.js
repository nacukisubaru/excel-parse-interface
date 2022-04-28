import {
    SET_GROUP,
    SET_GROUPS_LIST,
    SET_PORTALS_LIST,
    SET_PORTAL_ID,
} from "../reducers/bitrixReducer";

export const setGroup = (project) => {
    return { type: SET_GROUP, payload: project };
};

export const setPortal = (portal) => {
    return { type: SET_PORTAL_ID, payload: portal };
};

export const setGroupList = (list) => {
    return { type: SET_GROUPS_LIST, payload: list };
};

export const setPortalsList = (list) => {
    return { type: SET_PORTALS_LIST, payload: list };
};
