import { csrfFetch } from "./csrf";

const LOAD_NOTETAGS = "tags/LOAD_NOTETAGS";
const NEW_NOTETAG = "tagss/NEW_NOTETAG";
const CLEAR_NOTETAGS = "tags/CLEAR_NOTETAGS"
const DELETE_NOTETAG = "tags/DELETE_NOTETAG"


const getNoteTags = (noteTags) => {
    return {
        type: LOAD_NOTETAGS,
        noteTags
    };
};

const newNoteTag = note => {
    return {
        type: NEW_NOTETAG,
        note
    }
}

const deleteNoteTag = id => {
    return {
        type: DELETE_NOTETAG,
        id
    }
}

export const clearNoteTags = () => {
    return {
        type: CLEAR_NOTETAGS
    }
}

export const updateNoteTag = data => async dispatch => {
    const res = await csrfFetch(`/api/tags/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const updatedTag = await res.json();
        dispatch(newNoteTag(updatedTag));
        return updatedTag;
    }
}

export const removeNoteTag = id => async dispatch => {
    const res = await csrfFetch(`/api/notes/${id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(deleteNoteTag(id));
        return;
    }
}

export const loadNoteTags = (user) => async dispatch => {
    const res = await csrfFetch(`/api/users/${user.id}/notetags`);
    const noteTags = await res.json();
    dispatch(getNoteTags(noteTags));
    return res;
}

export const createNoteTag = data => async dispatch => {
    console.log("data", data);
    const res = await csrfFetch(`/api/users/${data.userId}/tags`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const noteTag = await res.json();
    dispatch(newNoteTag(noteTag));
    return res;
}

const initialState = {}

export const noteTagsReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_NOTETAGS:
            action.tags.forEach(tag => {
                newState[tag.id] = tag;
            })
            return newState
        case NEW_NOTETAG:
            newState[action.tag.id] = action.tag
            return newState;
        case DELETE_NOTETAG:
            delete newState[action.id]
            return newState
        case CLEAR_NOTETAGS:
            return {}
        default:
            return state;
    }
}