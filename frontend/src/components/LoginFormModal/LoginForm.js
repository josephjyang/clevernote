import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { usePage } from '../../context/ClevernoteContext';
import './LoginForm.css'

function LoginForm() {
    const dispatch = useDispatch();
    const { setPage } = usePage();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const onSubmit = e => {
        e.preventDefault();
        setErrors([]);
        setPage("dashboard");
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
    }

    return (
        <div className="login-form">
            <img src="/images/logo.png" alt="clevernote-logo" id="sign-up-logo" />
            <h1 id="title">Clevernote</h1>
            <form onSubmit={onSubmit}>
                <ul className="error-list" hidden={errors.length === 0}>
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
        </div>
    )
}

export default LoginForm