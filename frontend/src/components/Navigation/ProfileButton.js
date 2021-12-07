import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { clearNotes } from "../../store/notes"

function ProfileButton({user}) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false)

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        dispatch(clearNotes());
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
            <div id="profile-icon" >
                <i onClick={openMenu} className="fas fa-user-circle"></i>
                <span>{user.firstName} {user.lastName} <i onClick={openMenu} className="fas fa-angle-down"></i></span>
            </div>
            {showMenu && (
            <ul className="profile-dropdown">
                <li>ACCOUNT</li>
                <li id="user-info">
                    <i className="fas fa-user-circle"></i>
                    <div id="user-name">
                        <span>{user.firstName} {user.lastName}</span><br />
                        <span id="email">{user.email}</span>
                    </div>
                </li>
                <li>
                    <NavLink to={`/users/${user.id}`}>
                        Account info...
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/users/${user.id}/preferences`}>
                        Preferences
                    </NavLink>
                </li>
                <li>
                    <button id="logout" onClick={logout}>Sign out {user.firstName} {user.lastName}</button>
                </li>
            </ul>
            )}
        </>
    )
}

export default ProfileButton
