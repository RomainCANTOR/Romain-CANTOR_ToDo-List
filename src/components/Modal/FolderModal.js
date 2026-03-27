import React, { useState } from 'react';
import './FolderModal.css';

const FolderModal = ({ onClose, onSave, folderToEdit }) => {
  const [formData, setFormData] = useState(folderToEdit || {
    title: '',
    description: '',
    color: '#3498db'
  });

  const presetColors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#e67e22', '#1abc9c', '#34495e', '#95a5a6', '#ff9ff3'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim().length < 3) {
      alert("L'intitulé doit faire au moins 3 caractères.");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{folderToEdit ? "Modifier le Dossier" : "Nouveau Dossier"}</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Titre"
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required 
          />
          <textarea 
            placeholder="Description"
            value={formData.description} 
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
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
          <div className="modal-actions">
            <button type="button" onClick={onClose}>Annuler</button>
            <button type="submit" className="btn-save">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FolderModal;