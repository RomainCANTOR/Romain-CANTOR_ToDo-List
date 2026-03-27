# ToDo-List Project

Une application de gestion de tâches (ToDo-List) développée en **React**, permettant de gérer des missions complexes avec des dossiers associés, des équipiers et un système de suivi d'états.

##  Architecture du Projet

Le projet suit une structure modulaire où chaque composant possède son propre dossier avec son fichier JS et son CSS dédié :

```text
mon-projet/
├── public/                 # Fichiers statiques (index.html, favicon)
├── src/                    # Le cœur de l'application
│   ├── components/         # Composants React réutilisables
│   │   ├── Filters/        # Barre de tri et filtres
│   │   │   ├── Filters.js
│   │   │   └── Filters.css
│   │   ├── FolderList/     # Vue Grille des dossiers
│   │   │   ├── FolderList.js
│   │   │   └── FolderList.css
│   │   ├── Footer/         # Barre flottante (boutons +Tâche, +Dossier)
│   │   │   ├── Footer.js
│   │   │   └── Footer.css
│   │   ├── Header/         # Titre et Statistiques (Dashboard)
│   │   │   ├── Header.js
│   │   │   └── Header.css
│   │   ├── Modal/          # Fenêtres surgissantes (Formulaires)
│   │   │   ├── TaskModal.js
│   │   │   ├── FolderModal.js
│   │   │   ├── TaskModal.css
│   │   │   └── FolderModal.css
│   │   └── TaskList/       # Liste des tâches et items
│   │       ├── TaskList.js
│   │       ├── TaskItem.js
│   │       └── TaskItem.css
│   ├── constants/          # Données fixes (Enums, types d'états)
│   │   └── enums.js
│   ├── App.js              # Composant Parent (Logique & États globaux)
│   ├── App.css             # Styles globaux de l'application
│   ├── index.js            # Point d'entrée React
│   ├── index.css           # Variables de couleurs et reset CSS
│   └── data.json           # Backup / Données de départ
├── package.json            # Dépendances et scripts
└── README.md               # Documentation du projet
