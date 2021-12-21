import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Modal } from "../../context/Modal"
import LoginForm from '../LoginFormModal/LoginForm';
import Navigation from '../Navigation';
import SignupFormPage from '../SignupFormPage';
import About from '../About';
import './HomePage.css'

function HomePage({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [showPage, setShowPage] = useState(false);
    const [showModal, setShowModal] = useState(false);

    if (sessionUser) return (
        <Redirect to='/dashboard' />
    )

    if (!sessionUser) return (
        <>
            <div id="container">
                <Navigation setShowPage={setShowPage} isLoaded={isLoaded} />
                {!showPage &&
                <div id="homepage">
                    <h1>
                        Save your ideas, shock the world
                    </h1>
                    <h3>
                        Write down all of your brilliant ideas so that you don't miss out on sharing them with the world.
                    <br />
                        Organize your business plans, jokes, solutions, and more, all in one place.
                    </h3>
                    <div onClick={() => setShowPage("signup")}>
                        <button id="sign-up-btn">
                            Sign up for free
                        </button>
                    </div>
                    <p id="log-in-text">
                        <button id="log-in-link" onClick={() => setShowModal(true)}>Already have an account? Log in</button>
                        {showModal && (
                            <Modal onClose={() => setShowModal(false)}>
                                <LoginForm />
                            </Modal>
                        )}
                    </p>
                </div>
                }

                {showPage === "signup" && <SignupFormPage />}
                {showPage === "about" && <About />}
            </div>
        </>
    );
}

export default HomePage