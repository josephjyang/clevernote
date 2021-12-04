import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({user}) {
    return <i class="fas fa-user-circle"></i>
}

export default ProfileButton
