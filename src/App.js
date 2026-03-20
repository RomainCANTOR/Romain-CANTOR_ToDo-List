import { useState } from 'react';
import initialData from './data.json'; // Ton fichier JSON fourni

function App() {
  const [tasks, setTasks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [relations, setRelations] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Fonction pour charger le backup
  const loadBackup = () => {
    setTasks(initialData.tasks);
    setFolders(initialData.dossiers);
    setRelations(initialData.relations);
    setIsInitialized(true);
  };

  // Fonction pour repartir de zéro
  const resetApp = () => {
    if (window.confirm("Voulez-vous vraiment repartir de zéro ?")) {
      setTasks([]);
      setFolders([]);
      setRelations([]);
      setIsInitialized(true);
    }
  };

  if (!isInitialized) {
    return (
      <div className="welcome-screen">
        <button onClick={loadBackup}>Charger le backup</button>
        <button onClick={resetApp}>Repartir de zéro</button>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Tes composants ici */}
    </div>
  );
}