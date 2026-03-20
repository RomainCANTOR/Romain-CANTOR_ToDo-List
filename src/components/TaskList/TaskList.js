import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, folders, relations, onUpdateTask }) => {
    
    // Si aucune tâche après filtrage
    if (tasks.length === 0) {
        return (
            <div className="task-list-empty">
                <p>Aucune tâche ne correspond à vos critères.</p>
            </div>
        );
    }

    return (
        <div className="task-list-container">
            {tasks.map((task) => {
                
                // LOGIQUE POUR RÉCUPÉRER LES DOSSIERS DE CETTE TÂCHE
                // 1. On cherche les IDs des dossiers dans la table de relations
                const associatedFolderIds = relations
                    .filter((rel) => rel.tache === task.id)
                    .map((rel) => rel.dossier);

                // 2. On récupère les objets dossiers complets (pour avoir le titre et la couleur)
                const taskFolders = folders.filter((f) => 
                    associatedFolderIds.includes(f.id)
                );

                return (
                    <TaskItem 
                        key={task.id} 
                        task={task} 
                        taskFolders={taskFolders} 
                        onUpdateTask={onUpdateTask} // Transmission de la fonction d'édition
                    />
                );
            })}
        </div>
    );
};

export default TaskList;