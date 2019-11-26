import React, { useState, useEffect } from 'react';
import car from '../../assets/images/car.png';
import NameInput from '../../components/NameInput';
import {
  Car,
  GameScreen,
  PauseIndicator,
  LapIndicator,
  TurboIndicator,
} from './styles';

const Game = () => {
  const [raceStarted, setRaceStarted] = useState(false);
  const [position, setPosition] = useState('s');
  const [paused, setPaused] = useState(true);
  const [moving, setMoving] = useState(false);
  const [metersRun, setMetersRun] = useState(0);
  const [turboFuel, setTurboFuel] = useState(0);
  const [turboTime, setTurboTime] = useState(0);

  const actions = {
    a: () => setPosition('a'),
    s: () => setPosition('s'),
    d: () => setPosition('d'),
    t: () => {
      if (turboFuel >= 100) {
        setTurboFuel(0);
        setTurboTime(15);
      }
    },
    escape: () => setPaused(!paused),
  };

  useEffect(() => {
    if (raceStarted) {
      const handleKeydown = event => {
        const act = actions[event.key.toLowerCase()];
        if (typeof act === 'function') {
          act();
        }
      };
      document.addEventListener('keydown', handleKeydown);
    }
  }, [paused, actions, raceStarted]);

  useEffect(() => {
    if (!paused) {
      const changeBg = setInterval(
        () => {
          setMoving(!moving);
          setMetersRun(metersRun + 100);
          setTurboFuel(Math.min(turboFuel + 1, 100));

          if (turboTime > 0) {
            setTurboTime(turboTime - 1);
          }
        },
        turboTime > 0 ? 100 : 300,
      );

      return () => {
        clearInterval(changeBg);
      };
    }
  }, [
    moving,
    paused,
    metersRun,
    turboTime,
    setTurboTime,
    turboFuel,
    setTurboFuel,
  ]);

  useEffect(() => {
    if (Math.floor(metersRun / 5000) > 4) {
      setPaused(true);
      // setFinished(true);
    }
  });

  return (
    <GameScreen className={moving ? 'moving' : ''}>
      {paused && <PauseIndicator>||</PauseIndicator>}
      {raceStarted && !paused && (
        <LapIndicator>Volta {Math.floor(metersRun / 5000) + 1}/5</LapIndicator>
      )}
      <TurboIndicator amount={turboFuel} />
      {!raceStarted && (
        <NameInput
          startRace={() => {
            setPaused(false);
            setRaceStarted(true);
          }}
        />
      )}
      <Car
        src={car}
        className={position === 'a' ? 'left' : position === 'd' ? 'right' : ''}
      />
    </GameScreen>
  );
};

export default Game;
