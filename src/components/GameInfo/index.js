import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { PAUSED, RUNNING } from '../../store/gameStatus';
import starCafeLogo from '../../assets/images/star-cafe-logo.png';
import { LAP_SIZE, TOTAL_LAPS } from '../../gameData';
import {
  PauseIndicator,
  LapIndicator,
  NameIndicator,
  LapSymbol,
} from './styles';

const GameStatus = ({ metersRun }) => {
  const playerName = useSelector(state => state.playerName);
  const gameStatus = useSelector(state => state.gameStatus);

  return (
    <>
      {gameStatus === PAUSED && <PauseIndicator>||</PauseIndicator>}
      {gameStatus === RUNNING && (
        <>
          <LapIndicator>
            <LapSymbol src={starCafeLogo} />
            {Math.floor(metersRun / LAP_SIZE)}/{TOTAL_LAPS}
          </LapIndicator>
          <NameIndicator>{playerName}</NameIndicator>
        </>
      )}
    </>
  );
};

export default memo(GameStatus);
