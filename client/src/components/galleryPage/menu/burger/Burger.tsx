import "../../../../styles/Burger.css";
import React from 'react';

interface BurgerProps {
    isOpen: boolean;
};

const BurgerMenu: React.FC<BurgerProps> = ({ isOpen }) => {
    return (
        <div className="burger-menu" id={ isOpen ? 'menu-open': 'menu-closed' }>
            <div className="burger-menu-line">Post</div>
            <div className="burger-menu-line">Menu2</div>
            <div className="burger-menu-line">Menu3</div>
        </div>
    );
};

export default BurgerMenu;