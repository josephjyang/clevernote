import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect,  } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import './AccountInfo.css'
import EnterPassword from '../EnterPassword';

function AccountInfo({ isLoaded }) {
    const user = useSelector(state => state.session.user);

    // Form - controlled inputs
    const [firstName, setFirstName] = useState(user ? user.firstName : null);
    const [lastName, setLastName] = useState(user ? user.lastName : null);
    const [email, setEmail] = useState(user ? user.email : null);
    const [username, setUsername] = useState(user ? user.username : null);
    const [showForm, setShowForm] = useState(false);
    const [use, setUse] = useState(false);

    if (!user) return (
        <Redirect to="/" />
    );


    return (
        <>
            {isLoaded && (
                <div className="account-info">
                    <h2>My Account</h2>
                    <form>
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
                        <Modal onClose={() => setShowForm(false)}>
                            <EnterPassword isLoaded={isLoaded} use={use} email={email} username={username} firstName={firstName} lastName={lastName} hideForm={() => setShowForm(false)} />
                        </Modal>
                    )}
                </div>
            )}
        </>
    )
}

export default AccountInfo