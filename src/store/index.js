import { createStore } from 'redux';
import { SET_PLAYER_NAME, SET_GAME_STATUS } from './actions';
import { NOT_STARTED } from './gameStatus';

export const INITIAL_STATE = {
  playerName: '',
  gameStatus: NOT_STARTED,
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_PLAYER_NAME:
      return { ...state, playerName: action.playerName };
    case SET_GAME_STATUS:
      return { ...state, gameStatus: action.gameStatus };
    default:
      return state;
  }
}

export default createStore(reducer);
