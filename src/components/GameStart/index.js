import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { setPlayerName, setGameStatus } from '../../store/actions';
import { RUNNING } from '../../store/gameStatus';
import Tutorial from '../Tutorial';
import LanguageChanger from '../LanguageChanger';
import {
  NameDialog,
  NameInput,
  NameInputError,
  Countdown,
  TutorialButton,
} from './styles';

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
        <>
          <LanguageChanger tutorialOpen />
          <Tutorial dismiss={() => setTutorialScreen(false)} />
        </>
      ) : (
        <>
          <NameDialog onSubmit={e => e.preventDefault()}>
            <FormattedMessage id="name">
              {nameTxt => (
                <NameInput
                  placeholder={nameTxt}
                  value={name}
                  onChange={e => dispatch(setPlayerName(e.target.value))}
                  error={nameError}
                />
              )}
            </FormattedMessage>
            {nameError && (
              <NameInputError>
                <FormattedMessage id="insertNameError" />
              </NameInputError>
            )}
            <button className="start-race" onClick={startCountdown}>
              <FormattedMessage id="startRace" />
            </button>
          </NameDialog>
          <LanguageChanger />
          <TutorialButton onClick={() => setTutorialScreen(true)}>
            <FormattedMessage id="tutorialTitle" />
          </TutorialButton>
        </>
      )}
    </>
  );
};

export default GameStart;
