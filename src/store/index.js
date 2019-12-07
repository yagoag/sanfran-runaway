import { createStore } from 'redux';
import { SET_PLAYER_NAME, SET_GAME_STATUS, SET_LANGUAGE } from './actions';
import { NOT_STARTED } from './gameStatus';

export const INITIAL_STATE = {
  playerName: '',
  gameStatus: NOT_STARTED,
  language: 'en-US',
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_PLAYER_NAME:
      return { ...state, playerName: action.playerName };
    case SET_GAME_STATUS:
      return { ...state, gameStatus: action.gameStatus };
    case SET_LANGUAGE:
      return { ...state, language: action.language };
    default:
      return state;
  }
}

export default createStore(reducer);
