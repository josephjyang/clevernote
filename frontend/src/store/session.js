import { csrfFetch } from "./csrf";

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

export const restoreUser = () => async dispatch => {
    const res = await csrfFetch('/api/session');
    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
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
    dispatch(setUser(data.user));
    return res;
}

export const signup = user => async dispatch => {
    const { username, firstName, lastName, email, password } = user;
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password
        })
    });
    const data = await res.json();
    dispatch(setUser(data.user));
    return res;
}

export const updateUser = user => async dispatch => {
    const { id, username, firstName, lastName, email, password } = user;
    const res = await csrfFetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id,
            username,
            firstName,
            lastName,
            email,
            password
        })
    });
    const data = await res.json();

    dispatch(setUser(data.updatedUser));
    return res;
}

export const deleteUser = user => async dispatch => {
    const { id, username, password } = user;
    const res = await csrfFetch(`/api/users/${user.id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            id,
            username,
            password
        })
    });
    const data = await res.json();
    dispatch(setUser(data.updatedUser));
    return data;
}

export const logout = () => async dispatch => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(removeUser());
    return res;
}

const initialState = { user: null }

export const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }
        case REMOVE_USER:
            return { ...state, user: null }
        default:
            return state;
    }
}