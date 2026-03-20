import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, folders, relations }) => {
    return (
        <div className="task-list">
            {tasks.length === 0 ? (
                <p>Aucune tâche à afficher.</p>
            ) : (
                tasks.map(task => {
                    // Trouver les dossiers associés à cette tâche précise
                    const taskFolderIds = relations
                        .filter(rel => rel.tache === task.id)
                        .map(rel => rel.dossier);
                    
                    const taskFolders = folders.filter(f => taskFolderIds.includes(f.id));

                    return (
                        <TaskItem 
                            key={task.id} 
                            task={task} 
                            taskFolders={taskFolders} 
                        />
                    );
                })
            )}
        </div>
    );
};

export default TaskList;