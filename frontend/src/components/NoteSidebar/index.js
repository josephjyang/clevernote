import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';

function NotesSidebar({ user }) {

    return (
        <>
            <div id="notes-sidebar" >
                <i className="fas fa-user-circle"></i>
                <span>{user.firstName} {user.lastName} <i className="fas fa-angle-down"></i></span>
            </div>
            
        </>
    )
}

export default NotesSidebar
