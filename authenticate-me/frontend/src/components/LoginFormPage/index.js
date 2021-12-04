import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css'

function LoginFormPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (user) return (
        <Redirect to="/" />
    );

    const onSubmit = e => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }

    return (
        <form onSubmit={onSubmit}>
            <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
                <input 
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                    placeholder="Email address or username"
                    />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                />
            <button type="submit">Log In</button>
        </form>
    )
}

export default LoginFormPage