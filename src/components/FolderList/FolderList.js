import React, { useState } from 'react';
import './FolderList.css';
import FolderModal from '../Modal/FolderModal';

const FolderList = ({ folders, relations, onDeleteFolder, onUpdateFolder }) => {
  const [editingFolder, setEditingFolder] = useState(null);

  return (
    <div className="folder-grid">
      {folders.map(folder => (
        <div key={folder.id} className="folder-card" style={{ borderTop: `5px solid ${folder.color}` }}>
          <div className="folder-header">
            <h3>{folder.title}</h3>
            <div className="folder-actions">
              <button onClick={() => setEditingFolder(folder)}>Modifier</button>
              <button className="delete-btn" onClick={() => onDeleteFolder(folder.id)}>×</button>
            </div>
          </div>
          <p>{folder.description || "Pas de description"}</p>
          <div className="folder-footer">
            <span className="task-count">
              {relations.filter(r => r.dossier === folder.id).length} tâche(s)
            </span>
          </div>
        </div>
      ))}

      {editingFolder && (
        <FolderModal 
          folderToEdit={editingFolder} 
          onClose={() => setEditingFolder(null)} 
          onSave={(data) => {
            onUpdateFolder({ ...data, id: editingFolder.id });
            setEditingFolder(null);
          }} 
        />
      )}
    </div>
  );
};

export default FolderList;