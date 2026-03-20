import React from 'react';
import './Footer.css'; // Crée un fichier Footer.css même vide

const Footer = ({ onOpenModal }) => {
    return (
        <footer className="footer">
            <button className="add-btn" onClick={onOpenModal}>+</button>
        </footer>
    );
};

export default Footer;