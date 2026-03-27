import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, folders, relations, onUpdateTask, onToggleFolder }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>Aucune tâche à afficher.</p>
      ) : (
        tasks.map(task => (
          <TaskItem 
            key={task.id} 
            task={task} 
            allFolders={folders} 
            relations={relations} 
            onUpdateTask={onUpdateTask}
            onToggleFolder={onToggleFolder}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;