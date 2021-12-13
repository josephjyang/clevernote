import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { FormModal } from '../../context/FormModal';
import NotebookFormNew from '../NotebookFormNew';
import './AccountInfo.css'
import EnterPassword from '../EnterPassword';

function AccountInfo({ isLoaded }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [errors, setErrors] = useState([]);
    const [firstName, setFirstName] = useState(user ? user.firstName : null);
    const [lastName, setLastName] = useState(user ? user.lastName : null);
    const [email, setEmail] = useState(user ? user.email : null);
    const [username, setUsername] = useState(user ? user.username : null);
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const history = useHistory();
    const [showForm, setShowForm] = useState(false);
    const [use, setUse] = useState(false);

    if (!user) return (
        <Redirect to="/" />
    );



    const onSubmit = e => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.updateUser({ id: user.id, email, username, password, firstName, lastName }))
                .catch(async res => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                })
        } else return setErrors(['Confirm Password field must match the Password field'])
    }

    return (
        <div className="account-info">
            <h2>My Account</h2>
            <form onSubmit={onSubmit}>
                {errors.length > 0 && <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>}
                <label>Email: </label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email address"
                />
                <label>Username: </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Username"
                />
                <label>First Name: </label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder="First Name"
                />
                <label>Last Name: </label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    placeholder="Last Name"
                />
            </form>
            <button onClick={() => {
                setUse("update");
                setShowForm(true);
            }}>Update Account</button>
            <button id="delete-account" onClick={() => {
                setUse("delete");
                setShowForm(true);
            }}>Delete Account</button>
            {showForm && (
                <FormModal onClose={() => setShowForm(false)}>
                    <EnterPassword use={use} email={email} username={username} firstName={firstName} lastName={lastName} hideForm={() => setShowForm(false)} />
                </FormModal>
            )}
        </div>
    )
}

export default AccountInfo