# ANKARA BOARD GAME

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg?style=plastic)](https://www.ankaraboardgame.com) [![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=plastic)](https://github.com/Bombanauts/Bombanauts/blob/master/LICENSE)

<img src="/public/images/AnkaraBoardGame.png" />

### Introduction

Ankara is a multiplayer game based on the board game Istanbul, a complex, economy-based board game set on top of a modular board. Players take turns moving around a marketplace and collecting resources in their wheelbarrow. Part of the game's complexity comes from how each turn presents different options based on the player's stats and environment.

### Gameplay

Ankara is built with React and Firebase, players move around a modular board and collect resources and rubies to win the game, while seeing each other's moves and chat in real time. Your goal is to be the first person to collect five rubies.

### Architecture

Because of the real-time aspect of this game, we needed a way for players to continuously know about each other's game states. Moreover, we wanted the game state to persist in the event that a player temporarily drops out of the game.

We connected our players to Firebase's real-time / NoSQL database that propagates state changes to all clients. This works well for live state updates, however, we wanted to maintain control over the database direct write access. We decided to build a one-way data flow, from our application architecture, where our game logic flows through our node server. Our server then updates Firebase, which passes the new game state down to all clients / components.

<img src="/public/images/Architecture.png" width="550" />

### Tips and Tricks

[ coming soon ]

### APP Install

If you want to play locally or suggest modifications to our game:

**Fork** and **clone** this repository.

Install dependencies
```
npm install
```

Start build / Webpack
```
npm build-dev
```

Server's on port 1337!
