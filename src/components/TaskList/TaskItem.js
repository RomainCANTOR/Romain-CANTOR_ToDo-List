import React, { useState } from 'react';
import './TaskItem.css';
import { ETATS } from '../../constants/enums'; 

const TaskItem = ({ task, allFolders, relations, onToggleFolder, onUpdateTask }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  // --- LOGIQUE : Filtrer les dossiers liés à cette tâche ---
  const linkedFolders = allFolders.filter(f => 
    relations.some(r => r.tache === task.id && r.dossier === f.id)
  );

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
      {/* --- ENTÊTE (MODE SIMPLE) --- */}
      <div className="task-header-row">
        <span className="toggle-arrow" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '▼' : '▶'}
        </span>
        
        <div className="task-main-info">
          <div className="task-title-row">
            {isEditing ? (
              <input 
                type="text" 
                className="edit-input-title"
                value={editedTask.title} 
                onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
              />
            ) : (
              <h3>{task.title}</h3>
            )}

            {/* BADGES DES DOSSIERS (Visibles même quand c'est fermé) */}
            {!isEditing && (
              <div className="task-mini-folders">
                {linkedFolders.map(f => (
                  <span 
                    key={f.id} 
                    className="mini-folder-badge" 
                    style={{ "--folder-color": f.color }}
                  >
                    {f.title}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <span className="due-date">📅 {task.date_echeance}</span>
        </div>

        {!isEditing && (
          <span className={`status-tag ${task.etat.replace(/\s+/g, '-')}`}>
            {task.etat}
          </span>
        )}
      </div>

      {/* --- DÉTAILS (MODE COMPLET / ÉTENDU) --- */}
      {isExpanded && (
        <div className="task-body-complete">
          <hr />
          
          <div className="edit-fields">
            {/* Statut */}
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

            {/* Description */}
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

            {/* Équipiers */}
            <div className="field-group">
              <label>Équipiers :</label>
              <div className="equipiers-list">
                {task.equipiers && task.equipiers.length > 0 ? (
                  task.equipiers.map((equipier, index) => (
                    <span key={index} className="equipier-badge">
                      👤 {equipier.name || equipier} 
                    </span>
                  ))
                ) : (
                  <span className="no-data">Aucun équipier assigné</span>
                )}
              </div>
            </div>

            {/* GESTION DES DOSSIERS (Le sélecteur de liaison) */}
            <div className="folder-management">
              <h4>Modifier les dossiers associés :</h4>
              <div className="folder-selector">
                {allFolders.map(f => {
                  const isLinked = relations.some(r => r.tache === task.id && r.dossier === f.id);
                  return (
                    <button 
                      key={f.id}
                      className={`folder-tag ${isLinked ? 'active' : ''}`}
                      style={{ 
                        "--folder-color": f.color,
                        border: `1.5px solid ${f.color}`, 
                        color: isLinked ? 'white' : f.color,
                        backgroundColor: isLinked ? f.color : 'transparent'
                      }}
                      onClick={() => onToggleFolder(task.id, f.id)}
                    >
                      {f.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Boutons d'actions */}
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