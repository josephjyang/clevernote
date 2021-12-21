import React from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { usePage } from "../../context/ClevernoteContext";
import './DemoLoginButton.css'

function DemoLoginButton() {
    const dispatch = useDispatch();
    const { setPage } = usePage()

    const onSubmit = async e => {
        e.preventDefault();
        const demoUser = { credential: "jimhalpert", password: "password" }
        dispatch(sessionActions.login(demoUser))
        setPage("dashboard");
    }

    return (
        <form onSubmit={onSubmit}>
            <button id="demo-login" type="submit">Demo Log In</button>
        </form>
    )
}

export default DemoLoginButton
