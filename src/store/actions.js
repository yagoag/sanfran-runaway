export const SET_PLAYER_NAME = 'SET_PLAYER_NAME';
export const SET_GAME_STATUS = 'SET_GAME_STATUS';

export const setPlayerName = playerName => ({
  type: SET_PLAYER_NAME,
  playerName,
});

export const setGameStatus = gameStatus => ({
  type: SET_GAME_STATUS,
  gameStatus,
});
