import "../../styles/post/Mininav.css";

import Home from "../../assets/icons/nav/home.svg";
import Bookmark from "../../assets/icons/nav/bookmark.svg";
import Edit from "../../assets/icons/nav/edit.svg";
import Report from "../../assets/icons/nav/report.svg";

function Mininav () {

    const sounds = {
        generic: new Audio("/sounds/button/generic.mp3"),
        home: new Audio("/sounds/button/home.mp3"),
        bookmark: new Audio("/sounds/button/bookmark.mp3"),
        edit: new Audio("/sounds/button/generic.mp3"),
        report: new Audio("/sounds/button/report.mp3")
    };

    const interactions = {
        generic: () => { sounds.generic.currentTime = 0; sounds.generic.play(); },
        home: () => {sounds.home.currentTime = 0; sounds.home.play(); },
        bookmark: () => {
            sounds.bookmark.currentTime = 0;
            sounds.bookmark.play();
        },
        edit: () => {
            sounds.edit.currentTime = 0;
            sounds.edit.play();
        },
        report: () => {
            sounds.report.currentTime = 0;
            sounds.report.play();
        }
    }

    return (
        <div className="mininav">
            <a href="../" id="home-button" className="mininav-button" onMouseDown={interactions.home}>
                <img src={Home} alt="home" className="mininav-icon" id="home-icon" />
            </a>
            <div id="bookmark-button" className="mininav-button" onClick={interactions.bookmark}>
                <img src={Bookmark} alt="bookmark" className="mininav-icon" id="bookmark-icon" />
            </div>
            <div id="edit-button" className="mininav-button" onMouseDown={interactions.edit}>
                <img src={Edit} alt="edit" className="mininav-icon" id="edit-icon" />
            </div>
            <div id="report-button" className="mininav-button" onClick={interactions.report}>
                <img src={Report} alt="report" className="mininav-icon" id="report-icon" />
            </div>
        </div>
    )
};

export default Mininav;