import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router";
import * as sessionActions from '../../store/session';

function ProfileButton({user}) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false)

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        return (
            <Redirect to="/" />
        )
    };

    const openMenu = () => {
        if (showMenu) return;
        return setShowMenu(true)
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        }

        document.addEventListener("click", closeMenu)

        return () => document.removeEventListener("click", closeMenu)
    }, [showMenu])

    return (
        <>
            <div id="profile-icon">
                <i onClick={openMenu} className="fas fa-user-circle"></i>
            </div>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>Welcome, {user.firstName} {user.lastName}!</li>
                    <li>{user.email}</li>
                    <li>
                        <button id="logout" onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    )
}

export default ProfileButton
