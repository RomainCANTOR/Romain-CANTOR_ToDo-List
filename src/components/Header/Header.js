import React from 'react';
import './Header.css';
import { ETAT_TERMINE } from '../../constants/enums';

const Header = ({ tasks }) => {
    // Calcul des statistiques
    const total = tasks.length;
    const nonTerminees = tasks.filter(t => !ETAT_TERMINE.includes(t.etat)).length;

    return (
        <header className="header">
            <div className="logo">Ma ToDo-List</div>
            <div className="stats">
                <span>Tâches totales : <strong>{total}</strong></span>
                <span>En cours : <strong>{nonTerminees}</strong></span>
            </div>
        </header>
    );
};

export default Header;