import React, { useState } from 'react';
import './FolderModal.css';

const FolderModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    color: '#3498db', // Couleur par défaut
    icon: ''
  });

  // Liste des 10 couleurs imposées par le périmètre
  const presetColors = [
    '#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6',
    '#e67e22', '#1abc9c', '#34495e', '#95a5a6', '#ff9ff3'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation : 3 caractères minimum
    if (formData.title.trim().length < 3) {
      alert("L'intitulé doit faire au moins 3 caractères.");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Nouveau Dossier</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Intitulé (3 car. min)*</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Couleur du dossier</label>
            <div className="color-grid">
              {presetColors.map(c => (
                <div 
                  key={c} 
                  className={`color-circle ${formData.color === c ? 'active' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setFormData({...formData, color: c})}
                />
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>Annuler</button>
            <button type="submit" className="btn-save">Créer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FolderModal;