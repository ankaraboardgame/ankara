import axios from 'axios';

export const movePlayer = (gameId, playerId, newPosition, possibleMoves) => {
  return axios.post(`/api/game/${gameId}/player/${playerId}/move`, { newPosition, possibleMoves });
};

export const endTurn = (gameId, playerId) => {
  return axios.post(`/api/game/${gameId}/player/${playerId}/end`);
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
