import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerName, setGameStatus } from '../../store/actions';
import { RUNNING } from '../../store/gameStatus';
import { NameDialog, Countdown } from './styles';

const GameStart = () => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.playerName);
  const [countdownNum, setCountdownNum] = useState(null);
  const startCountdown = () => {
    setCountdownNum(3);
  };

  useEffect(() => {
    if (countdownNum !== null) {
      if (countdownNum > 0) {
        setTimeout(() => setCountdownNum(countdownNum - 1), 1000);
      } else {
        dispatch(setGameStatus(RUNNING));
      }
    }
  }, [countdownNum, dispatch]);

  return (
    <>
      {countdownNum !== null ? (
        <Countdown>{countdownNum}</Countdown>
      ) : (
        <NameDialog>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={e => dispatch(setPlayerName(e.target.value))}
          />
          <button onClick={startCountdown}>Iniciar Corrida</button>
        </NameDialog>
      )}
    </>
  );
};

export default GameStart;
