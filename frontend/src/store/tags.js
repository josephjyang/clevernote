import { csrfFetch } from "./csrf";

const LOAD_TAGS = "tags/LOAD_TAGS";
const NEW_TAG = "tags/NEW_TAG";
const CLEAR_TAGS = "tags/CLEAR_TAGS"
const DELETE_TAG = "tags/DELETE_TAG"

const getTags = (user, tags) => {
    return {
        type: LOAD_TAGS,
        user,
        tags
    };
};

const newTag = tag => {
    return {
        type: NEW_TAG,
        tag
    }
}

const deleteTag = id => {
    return {
        type: DELETE_TAG,
        id
    }
}

export const clearTags = () => {
    return {
        type: CLEAR_TAGS
    }
}

export const updateTag = data => async dispatch => {
    const res = await csrfFetch(`/api/users/${data.userId}/tags/${data.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        const updatedTag = await res.json();
        dispatch(newTag(updatedTag));
        return updatedTag;
    }
}

export const removeTag = (user, id) => async dispatch => {
    const res = await csrfFetch(`/api/users/${user.id}/tags/${id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(deleteTag(id));
        return;
    }
}

export const loadTags = user => async dispatch => {
    const res = await csrfFetch(`/api/users/${user.id}/tags`);
    const tags = await res.json();
    dispatch(getTags(user, tags));
    return tags;
}

export const createTag = data => async dispatch => {
    const res = await csrfFetch(`/api/users/${data.userId}/tags`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const tag = await res.json();
    dispatch(newTag(tag));
    return tag;
}

const initialState = {}

export const tagsReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case LOAD_TAGS:
            const tags = {}
            action.tags.forEach(tag => {
                tags[tag.id] = tag;
            })
            return { ...state, ...tags }
        case NEW_TAG:
            newState[action.tag.id] = action.tag
            return newState;
        case DELETE_TAG:
            delete newState[action.id]
            return newState
        case CLEAR_TAGS:
            return {}
        default:
            return state;
    }
}