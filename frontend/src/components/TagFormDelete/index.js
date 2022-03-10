import React, { useState } from 'react';
import * as tagActions from '../../store/tags';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './TagFormDelete.css'

function TagFormDelete({ id, hideForm }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const tags = useSelector(state => state.tags)
    const tag = tags[id]
    const [errors, setErrors] = useState([]);


    if (!sessionUser) return (
        <Redirect to="/" />
    )

    const onSubmit = async e => {
        e.preventDefault();
        setErrors([]);

        await dispatch(tagActions.removeTag(sessionUser, tag.id))

        hideForm();
        history.push("/tags");
    }

    return (
        <div className="tag-delete-form">
            <form onSubmit={onSubmit}>
                <ul hidden={errors.length === 0}>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
                <p>Are you sure you want to delete "{tag.name}"?</p>
                <button type="submit">Delete Tag</button>
            </form>
        </div>
    )
}

export default TagFormDelete