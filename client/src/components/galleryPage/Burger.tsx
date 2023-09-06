import "../../styles/gallery/Burger.css";
import React from 'react';

import upload from "../../assets/icons/buttons/upload.svg";

interface BurgerProps {
    isOpen: boolean;
};

const BurgerMenu: React.FC<BurgerProps> = ({ isOpen }) => {
    return (
        <div className="burger-menu" id={ isOpen ? 'menu-open': 'menu-closed' }>
            <div className="burger-menu-line">
                <img src={upload} className="burger-icon" alt="Post"/>Post</div>
            <div className="burger-menu-line">Menu2</div>
            <div className="burger-menu-line">Menu3</div>
        </div>
    );
};

export default BurgerMenu;