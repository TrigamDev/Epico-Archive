import "animate.css";
import "../../styles/Navbar.css";

import hamburgerMenu from "../../assets/hamburger_menu.svg";
import settings from "../../assets/settings.svg";
import profile from "../../assets/profile.svg";
import bookmarks from "../../assets/bookmarks.svg";
import search from "../../assets/search.svg";

function Navbar() {
    return (
        <div className="navbar">
            <div className="navbar-section">
                <div className="navbar-button" id="ham-menu">
                    <img src={hamburgerMenu} className="navbar-icon" id="ham-menu-icon" alt="Hamburger Menu"/>
                </div>
            </div>
            <div className="navbar-section">
                <div className="navbar-button" id="search">
                    <img src={search} className="navbar-icon" id="search-icon" alt="Search"/>
                </div>
                <div className="navbar-button" id="bookmarks">
                    <img src={bookmarks} className="navbar-icon" id="bookmarks-icon" alt="Bookmarks"/>
                </div>
                <div className="navbar-button" id="profile">
                    <img src={profile} className="navbar-icon" id="profile-icon" alt="Profile"/>
                </div>
                <div className="navbar-button" id="settings">
                    <img src={settings} className="navbar-icon" id="settings-icon" alt="Settings"/>
                </div>
            </div>
        </div>
    );
}

export default Navbar;