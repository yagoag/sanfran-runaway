import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FINISHED, NOT_STARTED } from '../../store/gameStatus';
import { EndModal, Message } from './styles';
import { setGameStatus } from '../../store/actions';

const EndGame = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.gameStatus);

  return (
    <EndModal>
      <Message>
        {status === FINISHED ? 'Você chegou!' : 'Você atropelou o hipster! :('}
      </Message>
      <button onClick={() => dispatch(setGameStatus(NOT_STARTED))}>
        Jogar Novamente
      </button>
    </EndModal>
  );
};

export default EndGame;
