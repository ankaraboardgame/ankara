import axios from 'axios';
import { fbDB } from '../firebase';

export const movePlayer = (gameId, playerId, newPosition, possibleMoves) => {
  return axios.post(`/api/game/${gameId}/player/${playerId}/move`, { newPosition, possibleMoves });
};

export const endTurn = (gameId, playerId) => {
  return axios.post(`/api/game/${gameId}/player/${playerId}/end`)
    .then(() => {
      fbDB.ref(`games/${gameId}/merchants/${playerId}/wheelbarrow`).child('ruby')
      .once('value', (snap) => {
        const rubyCount = snap.val();
        if (rubyCount >= 5) {
          return axios.post(`/api/game/${gameId}/lastRound`);
        }
      })
    })
};

export const setWinner = (gameId, playerId) => {
  return axios.post(`/api/game/${gameId}/player/${playerId}/win`);
};

export const endGame = (gameId, userId) => {
  return axios.post(`/api/game/${gameId}/end`, { userId });
};

export const pickupAssistant = (gameId, playerId, coordinates) => {
  return axios.post(
    `api/game/${gameId}/player/${playerId}/assistant/pickup`,
    { coordinates }
  );
}

export const dropAssistant = (gameId, playerId, coordinates) => {
  return axios.post(
    `api/game/${gameId}/player/${playerId}/assistant/drop`,
    { coordinates }
  );
}
