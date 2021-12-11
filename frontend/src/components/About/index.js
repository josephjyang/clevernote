import React from 'react';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation';
import './About.css'

function About({ isLoaded }) {
    return (
        <>
            <Navigation isLoaded={isLoaded} />
            <div id="container">
                <div id="about-page">
                    <h3>Hello! Welcome to Clevernote - a place to write down and organize all of your clever thoughts, ideas, and musings.</h3>
                    <p id="clevernote-info">If you'd like to learn more about the project,<br /> please checkout the Github Repo:</p>
                    <img className="social-logo" src="https://imgr.search.brave.com/J0XDD5xZ0YfShJPzNfzZSR5bOb8MgViNxMM5_DlM-QE/fit/1200/1200/ce/1/aHR0cHM6Ly9sb2dv/cy1kb3dubG9hZC5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MTYvMDkvR2l0SHVi/X2xvZ28ucG5n" alt="github logo" /> Clevernote
                    <h3 id="about-me">
                       Created by Joseph Yang
                    </h3>
                    <img className="profile-pic" src="/images/profile.png" alt="Joseph Yang" />
                    <ul>
                        <li className="social-links"><img className="social-logo" src="https://imgr.search.brave.com/J0XDD5xZ0YfShJPzNfzZSR5bOb8MgViNxMM5_DlM-QE/fit/1200/1200/ce/1/aHR0cHM6Ly9sb2dv/cy1kb3dubG9hZC5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MTYvMDkvR2l0SHVi/X2xvZ28ucG5n" alt="github logo" />
Github</li>
                        <li className="social-links"><img className="social-logo" src="https://imgr.search.brave.com/oci9T4S5bGXWq3sOR7sMGmCk1l_gBVkq1xga6cPMSww/fit/1200/1200/ce/1/aHR0cHM6Ly9jZG4u/ZnJlZWJpZXN1cHBs/eS5jb20vbG9nb3Mv/bGFyZ2UvMngvbGlu/a2VkaW4taWNvbi1s/b2dvLXBuZy10cmFu/c3BhcmVudC5wbmc" alt="linked in logo" />LinkedIn</li>
                    </ul>
                </div>
                <div id="homepage-footer">
                    <NavLink exact to="/about">
                        <span id="about">ABOUT CLEVERNOTE</span>
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default About