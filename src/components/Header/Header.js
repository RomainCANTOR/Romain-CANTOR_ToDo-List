import React from 'react';
import './Header.css';
// On remonte de deux niveaux : Header -> components -> src -> constants
import { ETAT_TERMINE } from '../../constants/enums';
const Header = ({ tasks }) => {
    const total = tasks.length;
    const nonTerminees = tasks.filter(t => !ETAT_TERMINE.includes(t.etat)).length;

    return (
        <header className="header">
            <div>Total : {total}</div>
            <div>En cours : {nonTerminees}</div>
        </header>
    );
};

export default Header;