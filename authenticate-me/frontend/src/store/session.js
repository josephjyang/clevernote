import { csrfFetch } from "./csrf";

export const sessionReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }
        case REMOVE_USER:
            return { ...state, user: null }
        default:
            return state;
    }
}

const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = user => {
    return {
        type: SET_USER,
        user
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const login = user => async dispatch => {
    const { credential, password } = user;
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    });
    const data = await res.json();
    dispatch(setUser(data.user)) 
}