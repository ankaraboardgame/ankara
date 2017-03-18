export function cellActiveStatus(cell, possibleMoves) {
  if (possibleMoves.indexOf(cell) > -1) return true;
  else return false;
};
