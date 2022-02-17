import React from 'react';
import './About.css'

function About() {
    return (
        <>
            <div id="about-page">
                <h3>Hello! Welcome to Clevernote - a place to write down and organize all of your clever thoughts, ideas, and musings.</h3>
                <p id="clevernote-info">If you'd like to learn more about the project,<br /> please checkout the Github Repository, here: <a href="https://github.com/josephjyang/clevernote">Clevernote</a>.</p>
                <div id="about-me-section">
                    <img className="profile-pic" src="/images/profile.png" alt="Joseph Yang" />
                    <div id="about-me-text">
                        <h3 id="about-me">
                            Created by Joe Yang (@josephjyang)
                        </h3>
                        <p>
                            App Academy Graduate (February '22)
                        </p>
                        <ul>
                            <li className="social-links">
                                <a href="https://github.com/josephjyang">
                                    <img className="social-logo github" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="github logo" />
                                    Github
                                </a>
                            </li>
                            <li className="social-links">
                                <a href="https://www.linkedin.com/in/josephjyang/">
                                    <img className="social-logo" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="linked in logo" />
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About