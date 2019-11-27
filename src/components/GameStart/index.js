import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerName, setGameStatus } from '../../store/actions';
import { RUNNING } from '../../store/gameStatus';
import {
  NameDialog,
  NameInput,
  NameInputError,
  Countdown,
  TutorialButton,
} from './styles';
import Tutorial from '../Tutorial';

const GameStart = () => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.playerName);
  const [countdownNum, setCountdownNum] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [tutorialScreen, setTutorialScreen] = useState(false);

  const startCountdown = () => {
    if (name !== '') {
      setNameError(false);
      setCountdownNum(3);
    } else {
      setNameError(true);
    }
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
      ) : tutorialScreen ? (
        <Tutorial dismiss={() => setTutorialScreen(false)} />
      ) : (
        <>
          <NameDialog>
            <NameInput
              placeholder="Nome"
              value={name}
              onChange={e => dispatch(setPlayerName(e.target.value))}
              error={nameError}
            />
            {nameError && (
              <NameInputError>Você precisa inserir seu nome</NameInputError>
            )}
            <button onClick={startCountdown}>Iniciar Corrida</button>
          </NameDialog>
          <TutorialButton onClick={() => setTutorialScreen(true)}>
            Como Jogar?
          </TutorialButton>
        </>
      )}
    </>
  );
};

export default GameStart;
