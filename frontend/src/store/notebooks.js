import { csrfFetch } from "./csrf";

const LOAD_NOTEBOOKS = "noteBOOKs/LOAD_NOTEBOOKS";
const NEW_NOTEBOOK = "noteBOOKs/NEW_NOTEBOOK";
const CLEAR_NOTEBOOKS = "noteBOOKs/CLEAR_NOTEBOOKS"
const DELETE_NOTEBOOK = "noteBOOKs/DELETE_NOTEBOOK"

const getNotebooks = (user, notebooks) => {
    return {
        type: LOAD_NOTEBOOKS,
        user,
        notebooks
    };
};

const newNotebook = notebook => {
    return {
        type: NEW_NOTEBOOK,
        notebook
    }
}

const deleteNotebook = id => {
    return {
        type: DELETE_NOTEBOOK,
        id
    }
}

export const clearNotebooks = () => {
    return {
        type: CLEAR_NOTEBOOKS
    }
}

export const updateNotebook = data => async dispatch => {
    const res = await csrfFetch(`/api/users/${data.userId}/notebooks/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const updatedNotebook = await res.json();
        dispatch(newNotebook(updatedNotebook));
        return updatedNotebook;
    }
}

export const removeNotebook = data => async dispatch => {
    const res = await csrfFetch(`/api/users/${data.userId}/notebooks/${data.id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(deleteNotebook(data.id));
        return;
    }
}

export const loadNotebooks = user => async dispatch => {
    const res = await csrfFetch(`/api/users/${user.id}/notebooks`);
    const data = await res.json();
    dispatch(getNotebooks(user, data));
    return res;
}

export const createNote = data => async dispatch => {
    console.log("data", data);
    const res = await csrfFetch(`/api/users/${data.userId}/notebooks`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const notebook = await res.json();
    dispatch(newNotebook(notebook));
    return notebook;
}

const initialState = {}

export const notebooksReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_NOTEBOOKS:
            const notebooks = {}
            action.notebooks.forEach(notebook => {
                notebooks[notebook.id] = notebook;
            })
            return { ...state, ...notebooks }
        case NEW_NOTEBOOK:
            newState[action.notebook.id] = action.notebook
            return newState;
        case DELETE_NOTEBOOK:
            delete newState[action.id]
            return newState
        case CLEAR_NOTEBOOKS:
            return {}
        default:
            return state;
    }
}