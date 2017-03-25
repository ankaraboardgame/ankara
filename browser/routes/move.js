import axios from 'axios';
import { doesPlayerHaveFiveRubies } from '../utils';
import { fbDB } from '../firebase';

export const movePlayer = (gameId, playerId, newPosition, possibleMoves) => {
  return axios.post(`/api/game/${gameId}/player/${playerId}/move`, { newPosition, possibleMoves });
};

export const endTurn = (gameId, playerId) => {
  return axios.post(`/api/game/${gameId}/player/${playerId}/end`)
    .then(() => {
      fbDB.ref(`games/${gameId}/merchants`).child(playerId).once('value', (snap) => {
        return snap;
      }).then(snapshot => {
        const player = snapshot.val();
        const rubyCount = player.wheelbarrow.ruby;
        const playerNum = player.number;
        if (rubyCount === 5) {
          return fbDB.ref(`games/${gameId}`).update({lastRound: true});
        }
      })
    })
};

export const setWinner = (gameId, playerId) => {
  return axios.post(`/api/game/${gameId}/player/${playerId}/win`);
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
