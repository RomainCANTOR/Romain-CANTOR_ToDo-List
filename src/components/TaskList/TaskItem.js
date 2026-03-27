import React, { useState } from 'react';
import './TaskItem.css';
import { ETATS } from '../../constants/enums'; 

const TaskItem = ({ task, taskFolders, onUpdateTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleSave = () => {
    if (editedTask.title.length < 5) {
      alert("L'intitulé doit faire au moins 5 caractères");
      return;
    }
    onUpdateTask(editedTask);
    setIsEditing(false);
  };

  return (
    <div className={`task-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="task-header-row">
        <span className="toggle-arrow" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '▼' : '▶'}
        </span>
        
        <div className="task-main-info">
          {isEditing ? (
            <input 
              type="text" 
              value={editedTask.title} 
              onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
            />
          ) : (
            <h3>{task.title}</h3>
          )}
          <span className="due-date"> {task.date_echeance}</span>
        </div>

        
        {!isEditing && (
          <span className={`status-tag ${task.etat.replace(' ', '-')}`}>
            {task.etat}
          </span>
        )}
      </div>

      {isExpanded && (
        <div className="task-body-complete">
          <hr />
          <div className="edit-fields">
            
            <div className="field-group">
              <label>Statut :</label>
              {isEditing ? (
                <select 
                  value={editedTask.etat} 
                  onChange={(e) => setEditedTask({...editedTask, etat: e.target.value})}
                >
                  {Object.values(ETATS).map((etat) => (
                    <option key={etat} value={etat}>{etat}</option>
                  ))}
                </select>
              ) : (
                <p><strong>{task.etat}</strong></p>
              )}
            </div>

            <div className="field-group">
              <label>Description :</label>
              {isEditing ? (
                <textarea 
                  value={editedTask.description} 
                  onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                />
              ) : (
                <p>{task.description || "Aucune description"}</p>
              )}
            </div>
            <div className="field-group">
              <label>Équipiers :</label>
              {isEditing ? (
                <input
                  type="text"
                  defaultValue={editedTask.equipiers?.join(', ')}
                  placeholder="Noms séparés par des virgules"
                  onChange={(e) => {
                    const noms = e.target.value.split(',').map(nom => nom.trim()).filter(n => n !== "");
                    setEditedTask({ ...editedTask, equipiers: noms });
                  }}
                />
              ) : (
                  <div className="equipiers-list">
                    {task.equipiers && task.equipiers.length > 0 ? (
                      task.equipiers.map((equipier, index) => (
                        <span key={index} className="equipier-badge">
                          👤 {equipier.name} 
                        </span>
                      ))
                    ) : (
                      <span className="no-data">Aucun équipier assigné</span>
                    )}
                  </div>
              )}
            </div>
          </div>

          <div className="task-actions">
            {isEditing ? (
              <>
                <button className="btn-save" onClick={handleSave}>Enregistrer</button>
                <button className="btn-cancel" onClick={() => setIsEditing(false)}>Annuler</button>
              </>
            ) : (
              <button className="btn-edit" onClick={() => setIsEditing(true)}>Modifier / Changer Statut</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;