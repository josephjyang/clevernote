import React from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './DemoLoginButton.css'

function DemoLoginButton() {
    const dispatch = useDispatch();

    const onSubmit = async e => {
        e.preventDefault();
        // setErrors([]);
        console.log('submitting form')
        const demoUser = { credential: "Demo-lition", password: "password" }
        return await dispatch(sessionActions.login(demoUser))
    }

    return (
        <form onSubmit={onSubmit}>
                <button id="demo-login" type="submit">Demo Log In</button>
        </form>
    )
}

export default DemoLoginButton
