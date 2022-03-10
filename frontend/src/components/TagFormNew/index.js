import React, { useState } from 'react';
import * as tagActions from '../../store/tags';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './TagFormNew.css'

function TagFormNew({ hideForm }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);

    if (!sessionUser) return (
        <Redirect to="/" />
    )

    const onSubmit = async e => {
        e.preventDefault();
        setErrors([]);

        const payload = {
            name,
            userId: sessionUser.id
        }

        const newTag = await dispatch(tagActions.createTag(payload));

        if (newTag) hideForm();
    }

    return (
        <div className="tag-form">
            <form onSubmit={onSubmit}>
                <ul className="error-list-tag" hidden={errors.length === 0}>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
                <p>Enter Tag Name:</p>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter name"
                />
                <button type="submit">Create Tag</button>
            </form>
        </div>
    )
}

export default TagFormNew