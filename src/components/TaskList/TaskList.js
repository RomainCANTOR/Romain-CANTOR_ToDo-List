import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, folders, relations, onUpdateTask }) => {
    
    
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
                
                const associatedFolderIds = relations
                    .filter((rel) => rel.tache === task.id)
                    .map((rel) => rel.dossier);

                
                const taskFolders = folders.filter((f) => 
                    associatedFolderIds.includes(f.id)
                );

                return (
                    <TaskItem 
                        key={task.id} 
                        task={task} 
                        taskFolders={taskFolders} 
                        onUpdateTask={onUpdateTask} 
                    />
                );
            })}
        </div>
    );
};

export default TaskList;