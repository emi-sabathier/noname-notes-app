
# No name React native app

Une app permettant de prendre des notes. Reproduction des principales features de Google Keep, sans l'aide de tuto
App testée sur Android, non testée sur iOS comme pas de matériel disponible.

## Stack

**Front**: React Native 0.69.3, React Navigation 6.0.11, TypeScript 4.4.4, react-redux 8.0.2
**Back**: Firestore Realtime

## Fonctionnement

A chaque add/update/delete de notes ou de libellés:
Un listener firestore est trigger, et update automatiquement le store redux ET la bdd firestore
Cela permet d'avoir un state global toujours à jour dans les composants utilisant redux

## Lancement de l'app

### 1. Installer les dépendances

`yarn install`

### 2. Lancement de l'app pour tester

* Setup de l'environnement de dév https://reactnative.dev/docs/environment-setup
* Branchez un téléphone android en USB, autoriser les options développeur et débug USB
* Via votre IDE: `yarn run android`, lance aussi le serveur node \
Si ce n'est pas le cas, `yarn start` avant `yarn run android`

* Ou via Android studio:
`yarn start` puis, cliquez sur l'icône de run
![Run android]( https://i.ibb.co/yXKvL5r/android.jpg)
