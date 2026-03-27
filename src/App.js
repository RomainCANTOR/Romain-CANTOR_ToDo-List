import React, { useState } from 'react';
import './App.css';
import dataImporte from './data.json';
import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';
import FolderList from './components/FolderList/FolderList';
import Filters from './components/Filters/Filters';
import Footer from './components/Footer/Footer';
import TaskModal from './components/Modal/TaskModal';
import FolderModal from './components/Modal/FolderModal';
import { ETAT_TERMINE } from './constants/enums';

function App() {
  const [tasks, setTasks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [relations, setRelations] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [view, setView] = useState('TASKS');
  const [showModal, setShowModal] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  
  const [sortBy, setSortBy] = useState('date_echeance');
  const [filterStatus, setFilterStatus] = useState('EN_COURS');

  const loadBackup = () => {
    setTasks(dataImporte.tasks);
    setFolders(dataImporte.dossiers);
    setRelations(dataImporte.relations);
    setIsInitialized(true);
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: Date.now(), date_creation: new Date().toISOString().split('T')[0] }]);
    setShowModal(false);
  };

  const handleSaveFolder = (newFolder) => {
    const folderWithId = { ...newFolder, id: Date.now() };
    setFolders([...folders, folderWithId]);
    setIsFolderOpen(false);
  };

  // --- NOUVELLE FONCTION : LIER/DÉLIER DOSSIER ---
  const onToggleFolder = (taskId, folderId) => {
    const exists = relations.find(r => r.tache === taskId && r.dossier === folderId);
    if (exists) {
      setRelations(relations.filter(r => !(r.tache === taskId && r.dossier === folderId)));
    } else {
      setRelations([...relations, { tache: taskId, dossier: folderId }]);
    }
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const getProcessedTasks = () => {
    let result = [...tasks];
    if (filterStatus === 'EN_COURS') {
      result = result.filter(t => !ETAT_TERMINE.includes(t.etat));
    }
    result.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return new Date(b[sortBy]) - new Date(a[sortBy]);
    });
    return result;
  };

  if (!isInitialized) {
    return (
      <div className="init-screen">
        <h1>Projet ToDo-List</h1>
        <button onClick={loadBackup}>Charger le backup (JSON)</button>
        <button onClick={() => setIsInitialized(true)}>Repartir de zéro</button>
      </div>
    );
  }

  return (
    <div className="App">
      <Header tasks={tasks} />
      
      <div className="view-switcher" style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px' }}>
        <button onClick={() => setView('TASKS')} className={view === 'TASKS' ? 'active' : ''}>Vue Tâches</button>
        <button onClick={() => setView('FOLDERS')} className={view === 'FOLDERS' ? 'active' : ''}>Vue Dossiers</button>
      </div>

      <main className="container">
        {view === 'TASKS' ? (
          <>
            <Filters currentSort={sortBy} setSort={setSortBy} filterStatus={filterStatus} setFilter={setFilterStatus} />
            <TaskList 
              tasks={getProcessedTasks()} 
              folders={folders} 
              relations={relations} 
              onUpdateTask={updateTask}
              onToggleFolder={onToggleFolder} // PASSAGE DE LA FONCTION
            />
          </>
        ) : (
          <FolderList 
            folders={folders} 
            relations={relations} 
            onDeleteFolder={(id) => setFolders(folders.filter(f => f.id !== id))}
            onUpdateFolder={(updated) => setFolders(folders.map(f => f.id === updated.id ? updated : f))}
          />
        )}
      </main>

      <Footer onOpenTaskModal={() => setShowModal(true)} onOpenFolderModal={() => setIsFolderOpen(true)} />

      {showModal && <TaskModal onClose={() => setShowModal(false)} onSave={handleAddTask} />}
      {isFolderOpen && <FolderModal onClose={() => setIsFolderOpen(false)} onSave={handleSaveFolder} />}
    </div>
  );
}

export default App;