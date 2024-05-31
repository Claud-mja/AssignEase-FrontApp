# Système de Gestion des Assignments - Frontend

Ce projet représente la partie frontend du Système de Gestion des Assignments, développé avec Angular. Il fournit une interface utilisateur pour gérer les assignments, les matières, les professeurs et les auteurs.

## Table des matières
- [Structure Projet](#structure-projet)
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Déploiement](#déploiement)
- [Contributions](#contributions)

## Structure Projet 
 

    AssignEasE-FrontApp /
    .   / node_modules/
    .   src
        .   . / app/
        .   .   .   . / components/*
        .   .   .   . / shared/*
        .   .   .   . / app.components.css
        .   .   .   . / app.components.html
        .   .   .   . / app.components.spec.ts
        .   .   .   . / app.components.ts
        .   .   .   . / app.config.ts
        .   .   .   . / app.routes.ts
        .   .   .   . / auth.guard.ts
        .   .   .   . / auth.services.spec.ts
        .   .   .   . / auth.service.ts
        .   . / assets/*
        .   . / environements/*
        .   . / index.html
        .   . / main.ts
        .   . / styles.css
    .   index.html
    .   main.ts
    .   styles.css





## Fonctionnalités
- **Assignments**
  - Liste des assignments avec pagination.
  - Recherche des assignments par titre, date de rendu (Ascendant ou Descendant),la note (Ascendant ou Descendant)  et statut (rendu ou non).
  - Ajouter un nouvel assignment avec des détails spécifiques.
  - Afficher les détails d'un assignment et marquer comme rendu avec `drag-drop` qui affichera un modal pour saisir le Note et Remarques.
  - Modifier les détails d'un assignment (titre, date de rendu, matière, auteur).
  - Supprimer un assignment avec modal de confirmation.
- **Matières**
  - Liste des matières dans un tableau.
  - Ajouter une nouvelle matière avec nom, professeur, et image.
  - Modifier les matières.
  - Supprimer les matières avec modal de confirmation.
- **professeurs**
  - Liste des professeurs dans un tableau.
  - Ajouter une nouvelle professeur avec nom, prenom et photo.
  - Modifier les professeurs.
  - Supprimer les professeurs avec modal de confirmation.
- **auteurs (élèves)**
  - Liste des auteurs dans un tableau.
  - Ajouter une nouvelle auteur avec nom et photo.
  - Modifier les auteurs.
  - Supprimer les auteurs avec modal de confirmation.
- **Authentification**
  - Necessite d'être connecté (Login)   
  - Seul un administrateur authentifié (rôle admin) peut ajouter, modifier ou supprimer des éléments 
  - Utilisation JWT (JSON Web Tokens) pour gérer les sessions de connexion.
  
  - ***Login*** :
    - Admin : 
      - email : `adminassign@gmail.com`
      - password : `develop`
        
    - User :
      - email : `userassign@gmail.com`
      - password : `develop`

## Installation
1. Cloner le dépôt :
  ```bash
  git clone https://github.com/Claud-mja/AssignEase-FrontApp.git
  ```
  ```bash
  cd AssignEase-FrontApp
  ```


2. Installer les dépendances :
  ```bash
  npm install
  ```

## Utilisation
1. Démarrer le serveur de développement  :
  ```bash
  ng serve
  ```

2. Naviguer vers http://localhost:4200/ dans votre navigateur (4200 port par defaut)

## Déploiement
1. Construire le projet :
  ```bash
  ng build --prod
  ```

2. Déployer le dossier `dist/` sur Render.com.

3. Lien front deployement https://assignease-frontapp.onrender.com
4. Lien backend :
  - Git (Readme) https://github.com/FranciscoNoam/AssignEase-BackOffice/tree/features/release-prod?tab=readme-ov-file#readme
  - deployement https://assignease-backend-b8rt.onrender.com (Necessaire d'être demmaré avant de tester l'app) 

## Contributions

### TOMBOANJARA Claudio

- **Déploiement Frontend :**
  - Configuration et déploiement de l'application frontend sur Render.com.
  
- **Intégration de la page Assignment :**
  - Création de la liste des assignments avec pagination et filtres.
  - Implémentation de la fonctionnalité d'ajout de nouveaux assignments.
  - Développement de la fonctionnalité de modification des assignments.
  - Ajout de la fonctionnalité de suppression des assignments avec modal de confirmation.
  - Création de la page de détails des assignments avec fonctionnalité de drag-and-drop pour marquer comme rendu et ajout des notes et remarques.
  - Intégration des services pour la communication avec l'API backend.

- **Intégration du composant de table dynamique :**
  - Développement et intégration d'un composant de table dynamique pour afficher les données de manière flexible.
  - Création de services dynamiques pour la gestion des données et interactions avec l'API.

- **Intégration de la page Matière :**
  - Utilisation du composant de table dynamique pour afficher les matières.
  - Implémentation des fonctionnalités d'ajout et de modification des matières.

- **Améliorations de l'affichage :**
  - Améliorations visuelles de la liste des assignments et des tableaux.
  - Améliorations du design général et de la typographie de l'application.

### ANTOENJARA Noam Francisco

- **Déploiement Frontend :**
  - Configuration et déploiement de l'application frontend sur Render.com.

- **Intégration de la page Auteurs :**
  - Utilisation du composant de table dynamique pour afficher les auteurs.
  - Implémentation des fonctionnalités d'ajout, de modification et de suppression des auteurs.
  - Intégration des services pour la communication avec l'API backend.

- **Intégration de la page Professeurs :**
  - Utilisation du composant de table dynamique pour afficher les professeurs.
  - Implémentation des fonctionnalités d'ajout, de modification et de suppression des professeurs.
  - Intégration des services pour la communication avec l'API backend.

- **Intégration de l'authentification JWT :**
  - Développement de la page de login avec gestion des tokens JWT.
  - Implémentation des services pour la gestion de l'authentification et des autorisations.




