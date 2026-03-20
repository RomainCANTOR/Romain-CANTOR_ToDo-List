# 📝 ToDo-List Project

Une application de gestion de tâches (ToDo-List) développée en **React**, permettant de gérer des missions complexes avec des dossiers associés, des équipiers et un système de suivi d'états.

---

## 🚀 Fonctionnalités principales

### 📋 Gestion des Tâches
- **Chargement automatique** : Initialisation via un backup `data.json` (Tâches, Dossiers, Relations).
- **Mode Simple vs Complet** : 
  - *Simple* : Vue épurée avec titre, échéance et 2 dossiers maximum.
  - *Complet* : Expansion via un triangle pour voir la description, tous les dossiers et les équipiers.
- **Édition dynamique** : Modification du titre, de la description, de la date d'échéance et du statut (Enums) directement dans l'interface.
- **Validation stricte** : Titre (min. 5 caractères) et Date d'échéance obligatoires lors de la création.

### 📁 Gestion des Dossiers
- **Vue dédiée** : Basculement entre la liste des tâches et la bibliothèque de dossiers.
- **Relations** : Liaison dynamique entre les tâches et les dossiers (n dossiers par tâche).
- **Indicateurs** : Affichage du nombre de tâches actives par dossier.

### 🔍 Filtres et Tris
- **Filtre par défaut** : Masque automatiquement les tâches terminées (Réussi/Abandonné).
- **Tri intelligent** : Tri par Date d'échéance (décroissant), Date de création ou Nom.

---

## 🛠 Architecture du Projet

Le projet suit une structure modulaire où chaque composant possède son propre dossier avec son fichier JS et son CSS dédié :

```text
src/
├── components/
│   ├── Header/          # Stats (Total, Non finis)
│   ├── TaskList/        # Liste et Item (Simple/Complet)
│   ├── Filters/         # Logique de Tri et Filtre
│   ├── Modal/           # Formulaire de création (Task/Folder)
│   └── FolderList/      # Vue gestion des dossiers
├── constants/
│   └── enums.js         # États (ETATS) et Liste Équipiers
├── data.json            # Backup de données
└── App.js               # Logique centrale et navigation
