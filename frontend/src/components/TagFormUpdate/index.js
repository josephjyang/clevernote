import React, { useState } from 'react';
import * as tagActions from '../../store/tags';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './TagFormUpdate.css'

function TagFormUpdate({ id, hideForm }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const tags = useSelector(state => state.tags)
    const tag = tags[id]
    const [name, setName] = useState(tag.name);
    const [errors, setErrors] = useState([]);
    

    if (!sessionUser) return (
        <Redirect to="/" />
    )

    const onSubmit = async e => {
        e.preventDefault();
        setErrors([]);

        const payload = {
            ...tag,
            name
        }

        const updatedTag = await dispatch(tagActions.updateTag(payload))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        
        if (updatedTag) hideForm();
    }

    return (
        <div className="tag-form">
            <form onSubmit={onSubmit}>
                <ul className="error-list-tag" hidden={errors.length === 0}>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
                <p>Update Tag Name:</p>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter name"
                />
                <button type="submit">Update Tag</button>
            </form>
        </div>
    )
}

export default TagFormUpdate