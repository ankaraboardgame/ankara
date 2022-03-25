# ANKARA BOARD GAME

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg?style=plastic)](http://www.ankaraboardgame.com) [![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=plastic)](https://github.com/Bombanauts/Bombanauts/blob/master/LICENSE)

<img src="/public/images/AnkaraBoardGame.png" />

### Introduction & Gameplay

Ankara is a multiplayer game based on the board game Istanbul. You play a merchant moving around a grand bazaar, filling your wheelbarrow with goods, bartering, selling/buying, acquiring abilities, and most importantly, collecting rubies. The first person to collect 5 rubies wins.

### Architecture

Ankara is built with React, Express, and Firebase. Players are connected to Firebase's real-time / NoSQL database (via React-Redux-Firebase), which propagates state changes to all players. All data flows one way: game state changes are posted to the server, which processes the input and writes updates to Firebase, which then passes the new game state back down to clients/players.

<img src="/public/images/Architecture.png" width="550" />

### APP Install

If you want to play locally or suggest modifications to our game:

**Fork** and **clone** this repository.

Install dependencies
```
npm install
```

Start development build / Webpack
```
npm build-dev
```

Server's on port 1337!

### Thank yous

We sourced our high-res game images from BoardGameGeek.

### Play

http://ankaraboardgame.herokuapp.com/
