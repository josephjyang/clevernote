import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './DemoLoginButton.css'

function DemoLoginButton() {
    const dispatch = useDispatch();
    // const [errors, setErrors] = useState([]);

    const onSubmit = async e => {
        e.preventDefault();
        // setErrors([]);
        console.log('submitting form')
        const demoUser = { credential: "Demo-lition", password: "password" }
        await dispatch(sessionActions.login(demoUser))
            // .catch(async res => {
            //     const data = await res.json();
            //     if (data && data.errors) setErrors(data.errors);
            // })
        return
    }

    return (
        <form onSubmit={onSubmit}>
                <button id="demo-login" type="submit">Demo Log In</button>
        </form>
    )
}

export default DemoLoginButton
