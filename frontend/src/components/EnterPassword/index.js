import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import './EnterPassword.css'


function EnterPassword({ hideForm, use, email, username, firstName, lastName, isLoaded }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (!sessionUser) return (
        <Redirect to="/" />
    )

    const onSubmit = async e => {
        e.preventDefault();
        setErrors([]);

        if (use === "update") {
            e.preventDefault();
            const updatedUser = await dispatch(sessionActions.updateUser({ id: sessionUser.id, email, username, password, firstName, lastName }))
                .catch(async res => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
            if (updatedUser) hideForm();
        } else if (use === "delete") {
            e.preventDefault();
            if (window.confirm(`Are you sure you want to delete your account, ${sessionUser.firstName}?`)) {
                const result = await dispatch(sessionActions.deleteUser({id: sessionUser.id, username, password}))
                    .catch(async res => {
                        const data = await res.json();
                        if (data && data.errors) setErrors(data.errors);
                    })
                if (result.ok) {
                    hideForm();
                    history.push("/");
                }
            }
        }
    }

    return (
        <>
            {isLoaded && (
                <div className="password-form">
                    <form onSubmit={onSubmit}>
                        <ul className="error-list-notebook" hidden={errors.length === 0}>
                            {errors.map((error, i) => <li key={i}>{error}</li>)}
                        </ul>
                        <p>Enter Password:</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter name"
                        />
                        <button type="submit">Confirm Password</button>
                    </form>
                </div>
            )}
        </>
    )
}

export default EnterPassword