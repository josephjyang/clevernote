import { csrfFetch } from "./csrf";

const LOAD_NOTES = "notes/LOAD_NOTES";
const NEW_NOTE = "notes/NEW_NOTE";


const getNotes = (user, notes) => {
    return {
        type: LOAD_NOTES,
        user,
        notes
    };
};

const newNote = (user, note) => {
    return {
        type: NEW_NOTE,
        user,
        note
    }
}


export const loadNotes = user => async dispatch => {
    const res = await csrfFetch(`/api/users/${user.id}/notes`);
    const data = await res.json();
    dispatch(getNotes(user, data));
    return res;
}

const initialState = { }

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_NOTES:
            const notes = {}
            // console.log("Notes:", action.notes)
            action.notes.forEach(note => {
                notes[note.id] = note;
            })
            return { ...state, ...notes }
        default:
            return state;
    }
}