import "animate.css";
import "../../styles/gallery/Navbar.css";

import { useState } from "react";

import HamburgerMenu from "./Burger";

import hamburgerMenu from "../../assets/icons/nav/hamburger_menu.svg";
import settings from "../../assets/icons/nav/settings.svg";
import profile from "../../assets/icons/nav/profile.svg";
import bookmarks from "../../assets/icons/nav/bookmarks.svg";
import search from "../../assets/icons/nav/search.svg";

function Navbar() {
    const [hamMenuOpen, setHamMenuOpen] = useState(false);

    const sounds = {
        base: new Audio("/sounds/button/generic.mp3"),
        hamburger: new Audio("/sounds/button/hamburger.mp3"),
        search: new Audio("/sounds/button/search.mp3"),
        bookmark: new Audio("/sounds/button/bookmark.mp3"),
        profile: new Audio("/sounds/button/profile.mp3"),
        settings: new Audio("/sounds/button/settings.mp3"),
    };

    const interactions = {
        hamburger: () => {
            sounds.hamburger.currentTime = 0;
            sounds.hamburger.play();
            setHamMenuOpen(!hamMenuOpen);
        },
        search: () => {
            sounds.search.currentTime = 0;
            sounds.search.play()
        },
        bookmark: () => {
            sounds.bookmark.currentTime = 0;
            sounds.bookmark.play()
        },
        profile: () => {
            sounds.profile.currentTime = 0;
            sounds.profile.play()
        },
        settings: () => {
            sounds.settings.currentTime = 0;
            sounds.settings.play()
        },
    }

    return (
        <div>
            <HamburgerMenu isOpen={hamMenuOpen}/>
            <div className="navbar">
                <div className="navbar-section">
                    <div className="navbar-button" id="ham-menu" onClick={interactions.hamburger}>
                        <img src={hamburgerMenu} className="navbar-icon" id="ham-menu-icon" alt="Hamburger Menu"/>
                    </div>
                </div>
                <div className="navbar-section">
                    <div className="navbar-button" id="search" onClick={interactions.search}>
                        <img src={search} className="navbar-icon" id="search-icon" alt="Search" title="Search"/>
                    </div>
                    <div className="navbar-button" id="bookmarks" onClick={interactions.bookmark}>
                        <img src={bookmarks} className="navbar-icon" id="bookmarks-icon" alt="Bookmarks" title="Bookmarks"/>
                    </div>
                    <div className="navbar-button" id="profile" onClick={interactions.profile}>
                        <img src={profile} className="navbar-icon" id="profile-icon" alt="Profile" title="Profile"/>
                    </div>
                    <div className="navbar-button" id="settings" onClick={interactions.settings}>
                        <img src={settings} className="navbar-icon" id="settings-icon" alt="Settings" title="Settings"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;