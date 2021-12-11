import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link, NavLink } from 'react-router-dom';
import Navigation from '../Navigation';
import { usePage } from '../../context/ClevernoteContext';
import './SignupForm.css'

function SignupFormPage({ isLoaded }) {
    const { setPage } = usePage();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const onSubmit = e => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
                .catch(async res => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
        } else return setErrors(['Confirm Password field must match the Password field'])
    }

    return (
        <>
            <div className="signup-form">
                <img src="/images/logo.png" alt="clevernote-logo" id="sign-up-logo" />
                <Link to="/">
                    <h1 id="title">Clevernote</h1>
                </Link>
                <form onSubmit={onSubmit}>
                    {errors.length > 0 && <ul className="error-list">
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>}
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email address"
                    />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Username"
                    />
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setfirstName(e.target.value)}
                        required
                        placeholder="First Name"
                    />
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setlastName(e.target.value)}
                        required
                        placeholder="Last Name"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm Password"
                    />
                    <button type="submit">Create Account</button>
                </form>
            </div>
            

        </>
    )
}

export default SignupFormPage