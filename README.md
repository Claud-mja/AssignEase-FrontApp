# AssignEaseFrontApp (FrontOffice)



# README de la structure du  Front office Angular js pour le projet

# Le branch finale du backOffice c'est ' realease/producion '

# I. ++++++++++++++ Structure de l'application Front Office ++++++++++++++

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


### II.  ++++++++++++++ Explication de la structure du projet ++++++++++++++

  ###### 1. notre projet/src/app/components et /shared/components:

    ==> C'est la gestion des components ou des pages web dynamique de notre application

  ###### 2.  notre projet/src/app/shared/config/:

    """
        C'est la gestion des menus de l'application
    """

  ###### 3.  notre projet/src/app/shared/interfaces/:

    """
        C'est la gestion des interfaces des données dans le page Web
    """

  ###### 4.  notre projet/src/app/shared/models/:

    """
        C'est la gestion des models des données appelé dépuis le BackOffice
    """

  ###### 5.  notre projet/src/app/shared/services/:

    """
        C'est la gestion des services des APIs dépuis le BackOffice
    """

  ###### 5.  notre projet/src/app/app.component.*:

    """
        C'est le premier composant appelé  lors de le lancement de l'application
    """

  ###### 6.  notre projet/src/app/app.config.ts:

    """
        C'est la gestion de configuration de base de l'application
    """

  ###### 7.  notre projet/src/app/app.routes.ts:

    """
        C'est la gestion de tout les routes de l'application
    """

  ###### 8.  notre projet/src/app/auth.guard.ts:

    """
        C'est la gestion de permission sur l'authentification d'utilisateur
    """

  ###### 9.  notre projet/src/app/auth.services.ts:

    """
        C'est la gestion d'authentification des utilisateurs
    """
   ###### 10.  notre projet/src/assets/*:

    """
        C'est la gestion des fichiers multimédias
    """
   ###### 11.  notre projet/src/environements/:

    """
        C'est la gestion des environements 'local' et 'production'
    """


# III. ++++++++++++++ Liste des commandes pour lancer le projet +++++++++++++


 #  1. Installation des environement:

        Pour installer les dépendances du projet, veuillez lancer cette commande pour la première fois :

     ==>   npm install

 #  2. Lancement de l'application local:

        Pour lancer l'application (ou démarrer l'application), veuillez lancer cette commande dans un terminale:

    ==>    `ng build`pour builder l'application
    ==>    `ng serve`pour lancer l'application



