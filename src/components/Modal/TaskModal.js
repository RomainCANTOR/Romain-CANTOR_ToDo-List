import React, { useState } from 'react';
import './TaskModal.css';
import { ETATS, LISTE_EQUIPIERS } from '../../constants/enums';

const TaskModal = ({ onClose, onSave }) => {
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date_echeance: '',
        etat: ETATS.NOUVEAU,
        equipiers: [] 
    });

    
    const handleEquipierToggle = (nom) => {
        const estDejaSelectionne = formData.equipiers.some(e => e.name === nom);
        
        let nouveauxEquipiers;
        if (estDejaSelectionne) {
            
            nouveauxEquipiers = formData.equipiers.filter(e => e.name !== nom);
        } else {
            
            nouveauxEquipiers = [...formData.equipiers, { name: nom }];
        }
        
        setFormData({ ...formData, equipiers: nouveauxEquipiers });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        
        if (formData.title.trim().length < 5) {
            alert("L'intitulé doit contenir au moins 5 caractères.");
            return;
        }
        if (!formData.date_echeance) {
            alert("La date d'échéance est obligatoire.");
            return;
        }

        
        onSave(formData);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Nouvelle Tâche</h2>
                
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-group">
                        <label>Intitulé (min. 5 caractères) :</label>
                        <input 
                            type="text" 
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            placeholder="Ex: Développer le module de tri"
                            required
                        />
                    </div>

                    
                    <div className="form-group">
                        <label>Description :</label>
                        <textarea 
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            placeholder="Détails de la tâche..."
                        />
                    </div>

                    
                    <div className="form-group">
                        <label>Date d'échéance :</label>
                        <input 
                            type="date" 
                            value={formData.date_echeance}
                            onChange={(e) => setFormData({...formData, date_echeance: e.target.value})}
                            required
                        />
                    </div>

                    
                    <div className="form-group">
                        <label>Équipiers effectuant la tâche :</label>
                        <div className="equipiers-selector">
                            {LISTE_EQUIPIERS.map(nom => (
                                <label key={nom} className="equipier-option">
                                    <input 
                                        type="checkbox"
                                        checked={formData.equipiers.some(e => e.name === nom)}
                                        onChange={() => handleEquipierToggle(nom)}
                                    />
                                    {nom}
                                </label>
                            ))}
                        </div>
                    </div>

                    
                    <div className="modal-buttons">
                        <button type="button" className="btn-cancel" onClick={onClose}>
                            Annuler
                        </button>
                        <button type="submit" className="btn-submit">
                            Créer la tâche
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;