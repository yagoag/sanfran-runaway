import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { PauseIndicator, LapIndicator, NameIndicator } from './styles';
import { PAUSED, RUNNING } from '../../store/gameStatus';

const GameStatus = ({ metersRun }) => {
  const playerName = useSelector(state => state.playerName);
  const gameStatus = useSelector(state => state.gameStatus);

  return (
    <>
      {gameStatus === PAUSED && <PauseIndicator>||</PauseIndicator>}
      {gameStatus === RUNNING && (
        <>
          <LapIndicator>
            Volta {Math.floor(metersRun / 5000) + 1}/5
          </LapIndicator>
          <NameIndicator>{playerName}</NameIndicator>
        </>
      )}
    </>
  );
};

export default memo(GameStatus);
