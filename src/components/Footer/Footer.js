import React from 'react';
import './Footer.css';

// 1. Vérifie que tu récupères bien ces deux noms exacts entre les accolades
const Footer = ({ onOpenTaskModal, onOpenFolderModal }) => {
  return (
    <footer className="footer">
      <div className="add-actions">
        {/* 2. Vérifie que le onClick appelle la PROPS, pas une fonction locale inexistante */}
        <button className="btn-add task" onClick={onOpenTaskModal}>
          + Tâche
        </button>
        <button className="btn-add folder" onClick={onOpenFolderModal}>
          + Dossier
        </button>
      </div>
    </footer>
  );
};

export default Footer;