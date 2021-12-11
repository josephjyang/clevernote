import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { Modal } from "../../context/Modal"
import LoginForm from '../LoginFormModal/LoginForm';
import Navigation from '../Navigation';
import './HomePage.css'

function HomePage({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    const [showModal, setShowModal] = useState(false);

    if (sessionUser) return (
        <Redirect to='/dashboard' />
    )

    if (!sessionUser) return (
        <>
            <div id="container">
                <Navigation isLoaded={isLoaded} />
                <div id="homepage">
                    <h1>
                        Save your ideas, shock the world
                    </h1>
                    <h3>
                        Write down all of your brilliant ideas so that you don't miss out on sharing them with the world.
                    <br />
                        Organize your business plans, jokes, solutions, and more, all in one place.
                    </h3>
                    <NavLink to="/signup">
                        <button id="sign-up-btn">
                            Sign up for free
                        </button>
                    </NavLink>
                    <p id="log-in-text">
                        <button id="log-in-link" onClick={() => setShowModal(true)}>Already have an account? Log in</button>
                        {showModal && (
                            <Modal onClose={() => setShowModal(false)}>
                                <LoginForm />
                            </Modal>
                        )}
                    </p>
                    <div id="homepage-footer">
                        <NavLink exact to="/about">
                            <span id="about">ABOUT CLEVERNOTE</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage