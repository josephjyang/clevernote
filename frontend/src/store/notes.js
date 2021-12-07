import { csrfFetch } from "./csrf";

const LOAD_NOTES = "notes/LOAD_NOTES";
const NEW_NOTE = "notes/NEW_NOTE";
const CLEAR_NOTES = "notes/CLEAR_NOTES"

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

export const clearNotes = () => {
    return {
        type: CLEAR_NOTES
    }
}


export const loadNotes = user => async dispatch => {
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
    console.log("note", note);
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
        case CLEAR_NOTES:
            return {}        
        default:
            return state;
    }
}