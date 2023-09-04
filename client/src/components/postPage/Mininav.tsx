import "../../styles/post/Mininav.css";

import Home from "../../assets/icons/actions/home.svg";
import Bookmark from "../../assets/icons/actions/bookmark.svg";
import Report from "../../assets/icons/actions/report.svg";

function Mininav () {
    return (
        <div className="mininav">
            <a href="../" id="home-button" className="mininav-button">
                <img src={Home} alt="home" className="mininav-icon" id="home-icon" />
            </a>
            <div id="bookmark-button" className="mininav-button">
                <img src={Bookmark} alt="bookmark" className="mininav-icon" id="bookmark-icon" />
            </div>
            <div id="report-button" className="mininav-button">
                <img src={Report} alt="report" className="mininav-icon" id="report-icon" />
            </div>
        </div>
    )
};

export default Mininav;