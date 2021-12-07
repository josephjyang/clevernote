import { csrfFetch } from "./csrf";

const LOAD_NOTES = "notes/LOAD_NOTES";
const NEW_NOTE = "notes/NEW_NOTE";
const CLEAR_NOTES = "notes/CLEAR_NOTES"
const DELETE_NOTE = "notes/DELETE_NOTE"

const getNotes = (user, notes) => {
    return {
        type: LOAD_NOTES,
        user,
        notes
    };
};

const newNote = note => {
    return {
        type: NEW_NOTE,
        note
    }
}

const deleteNote = id => {
    return {
        type: DELETE_NOTE,
        id
    }
}

export const clearNotes = () => {
    return {
        type: CLEAR_NOTES
    }
}

export const updateNote = data => async dispatch => {
    const res = await csrfFetch(`/api/notes/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const updatedNote = await res.json();
        dispatch(newNote(updatedNote));
        return updatedNote;
    }
}

export const removeNote = id => async dispatch => {
    const res = await csrfFetch(`/api/notes/${id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(deleteNote(id));
        return;
    }
}

export const loadNotes = (user, notebook) => async dispatch => {
    const res = await csrfFetch(`/api/users/${user.id}/notes`);
    const data = await res.json();
    dispatch(getNotes(user, data));
    return res;
}

export const createNote = data => async dispatch => {
    console.log("data", data);
    const res = await csrfFetch(`/api/users/${data.user.id}/notes`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const note = await res.json();
    dispatch(newNote(note));
    return note;
}

const initialState = { }

export const notesReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_NOTES:
            const notes = {}
            action.notes.forEach(note => {
                notes[note.id] = note;
            })
            return { ...state, ...notes }
        case NEW_NOTE:
            newState[action.note.id] = action.note
            return newState;
        case DELETE_NOTE:
            delete newState[action.id]
            return newState
        case CLEAR_NOTES:
            return {}        
        default:
            return state;
    }
}