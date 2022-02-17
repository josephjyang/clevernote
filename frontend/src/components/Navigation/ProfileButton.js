import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router";
import * as sessionActions from '../../store/session';
import { clearNotes } from "../../store/notes"
import { clearNotebooks } from "../../store/notebooks"

function ProfileButton({user}) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false)

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        dispatch(clearNotes());
        dispatch(clearNotebooks());
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
            <div onClick={openMenu} id="profile-icon" >
                <i className="fas fa-user-circle"></i>
                <span>{user.firstName} {user.lastName} <i className="fas fa-angle-down"></i></span>
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
                <li className="dropdown-link">
                    <NavLink to="/account">
                        <button id="account-info">Account info...</button>
                    </NavLink>
                </li>
                <li className="dropdown-link">
                    <button id="logout" onClick={logout}>Sign out {user.firstName} {user.lastName}</button>
                </li>
            </ul>
            )}
        </>
    )
}

export default ProfileButton
