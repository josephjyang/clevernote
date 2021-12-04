import { set } from "js-cookie";
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({user}) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false)

    const handleClick = () => {
        setShowMenu(true);
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
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
            <button onClick={handleClick}>
                <i class="fas fa-user-circle"></i>
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    )
}

export default ProfileButton
