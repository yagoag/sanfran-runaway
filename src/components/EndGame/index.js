import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FINISHED, NOT_STARTED } from '../../store/gameStatus';
import { EndModal, Message } from './styles';
import { setGameStatus } from '../../store/actions';
import { FormattedMessage } from 'react-intl';

const EndGame = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.gameStatus);

  return (
    <EndModal>
      <Message>
        {status === FINISHED ? (
          <FormattedMessage id="winMessage" />
        ) : (
          <FormattedMessage id="loseMessage" />
        )}
      </Message>
      <button
        className="play-again"
        onClick={() => dispatch(setGameStatus(NOT_STARTED))}
      >
        <FormattedMessage id="playAgain" />
      </button>
    </EndModal>
  );
};

export default EndGame;
