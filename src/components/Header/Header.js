import React from 'react';
import './Header.css';
import { ETAT_TERMINE } from '../../constants/enums';

const Header = ({ tasks }) => { 
    // Calcul des statistiques
    const total = tasks.length;
    const enCours = tasks.filter(t => !ETAT_TERMINE.includes(t.etat)).length;

    return (
        <header className="header-container">
            {/* Titre de l'application à gauche */}
            <div className="header-brand">
                <h1>My Task Manager</h1>
            </div>

            {/* Statistiques à droite (ou alignées selon ton CSS) */}
            <div className="header-stats">
                <div className="stat-card total">
                    <span className="stat-label">Total</span>
                    <span className="stat-value">{total}</span>
                </div>
                
                <div className="stat-card active">
                    <span className="stat-label">En cours</span>
                    <span className="stat-value">{enCours}</span>
                </div>
            </div>
        </header>
    );
};

export default Header;