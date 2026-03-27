import React, { useState } from 'react';
import './App.css';
import dataImporte from './data.json';
import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';
import Filters from './components/Filters/Filters';
import Footer from './components/Footer/Footer';
import TaskModal from './components/Modal/TaskModal';
import { ETAT_TERMINE } from './constants/enums';
import FolderModal from './components/Modal/FolderModal'; // Import bien utilisé maintenant

function App() {
  const [tasks, setTasks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [relations, setRelations] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // États pour les Modals
  const [showModal, setShowModal] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState(false); // État utilisé en bas
  
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
    setIsFolderOpen(false); // Ferme la modal après sauvegarde
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
      
      <main className="container">
        <Filters 
          currentSort={sortBy} 
          setSort={setSortBy} 
          filterStatus={filterStatus}
          setFilter={setFilterStatus}
        />
        
        <TaskList 
          tasks={getProcessedTasks()} 
          folders={folders} 
          relations={relations} 
          onUpdateTask={updateTask}
        />
      </main>

      {/* BRANCHEMENT DU FOOTER : On lie les boutons aux états */}
      <Footer 
        onOpenTaskModal={() => setShowModal(true)} 
        onOpenFolderModal={() => setIsFolderOpen(true)} 
      />

      {/* AFFICHAGE DES MODALS */}
      {showModal && (
        <TaskModal 
          onClose={() => setShowModal(false)} 
          onSave={handleAddTask}
        />
      )}

      {isFolderOpen && (
        <FolderModal 
          onClose={() => setIsFolderOpen(false)} 
          onSave={handleSaveFolder}
        />
      )}
    </div>
  );
}

export default App;