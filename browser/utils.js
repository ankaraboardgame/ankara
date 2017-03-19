export function cellActiveStatus(cell, currentPlayerPosition, possibleMoves) {
  const fullView = possibleMoves.concat(currentPlayerPosition);
  return fullView.indexOf(cell) > -1;
};

export function canMovePlayer(cell, possibleMoves) {
  return possibleMoves.indexOf(cell) > -1;
};
