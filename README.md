## AssignEaseFrontApp (FrontOffice)

### Branch finale du FrontOffice : `release/production`

## I.  Structure de l'application Front Office



    Notre Projet /
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



## II. Explication de la structure du projet

### 1. `src/app/components` et `src/app/shared/components`:

Gestion des composants et des pages web dynamiques de l'application.

### 2. `src/app/shared/config`:

Gestion des menus de l'application.

### 3. `src/app/shared/interfaces`:

Gestion des interfaces des données dans les pages Web.

### 4. `src/app/shared/models`:

Gestion des modèles de données appelés depuis le BackOffice.

### 5. `src/app/shared/services`:

Gestion des services des APIs appelés depuis le BackOffice.

### 6. `src/app/app.component.*`:

Premier composant appelé lors du lancement de l'application.

### 7. `src/app/app.config.ts`:

Gestion de la configuration de base de l'application.

### 8. `src/app/app.routes.ts`:

Gestion de toutes les routes de l'application.

### 9. `src/app/auth.guard.ts`:

Gestion des permissions sur l'authentification des utilisateurs.

### 10. `src/app/auth.services.ts`:

Gestion de l'authentification des utilisateurs.

### 11. `src/assets/*`:

Gestion des fichiers multimédias.

### 12. `src/environments/`:

Gestion des environnements 'local' et 'production'.

## III. Liste des commandes pour lancer le projet

### 1. **Installation des environnements**:

#### Pour installer les dépendances du projet, exécutez cette commande pour la première fois :

```bash
npm install
```

#### pour builder l'application
```bash
ng build
```

#### pour lancer l'application
```bash
ng serve
```


## VI.  Membres de l'équipe

- Tomboanjara Claudio
- ANTOENJARA Noam Francisco


## Overview

Ce projet est un système de gestion des assignments, développé en Angular. Il permet aux utilisateurs de gérer des assignments, des matières, des professeurs et des auteurs.

## Fonctionnalités

1. **Gestion des Assignments**:
    - Liste avec pagination
    - Recherche simple par titre, date de rendue, et statut
    - Ajout d'un nouvel assignment avec spécification du titre, de la date de rendue, de la matière et de l'auteur
    - Détails de l'assignment avec possibilité de le marquer comme rendu via drag-and-drop, et ajout de notes et remarques
    - Édition de l'assignment
    - Suppression de l'assignment avec confirmation modale

2. **Gestion des Matières**:
    - Liste simple sans filtre ni pagination
    - Ajout d'une nouvelle matière avec spécification du nom, du professeur et téléchargement d'une image d'illustration
    - Édition de la matière
    - Suppression de la matière avec confirmation modale

3. **Gestion des Professeurs**:
    - Ajout, édition et suppression de professeurs avec leurs noms, prénoms et photos

4. **Gestion des Auteurs**:
    - Ajout, édition et suppression d'auteurs avec leurs noms et photos

5. **Authentification**:
    - Seul un utilisateur authentifié (ou un administrateur) peut effectuer des opérations de gestion (ajout, modification, suppression)
