# Matcha

Ce projet vous propose de créer un site de rencontres.

Vous devrez donc concevoir une application permettant à un utilisateur de s’inscrire et de renseigner ses détails personnels et ses préférences dans l’autre, en vue de pouvoir matcher un autre utilisateur ayant un profil plus ou moins correspondant, parmi une selection de profils d’autres utilisateurs que votre site proposera.
Une fois qu’ils se sont réciproquement matchés, ces deux profils devront pouvoir s’échanger des mots doux et plus si affinités via un chat privé que vous aurez conçu.

## Technologies

- VueJS
- Express
- NodeJS
- MongoDB
- Socket.io

## Fonctionnalités

- Connexion et inscrition via local stratégie et omniauth (Github, 42)
- Intéraction en direct via socket.io (Like, match, chat, notifications)
- 'Algorithme' pour les profils suggéré (Distance, tags en communs, âge, orientation..)
