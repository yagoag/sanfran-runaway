import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import car from '../../assets/images/car.png';
import rock from '../../assets/images/rock-pile.png';
import NameInput from '../../components/NameInput';
import GameInfo from '../../components/GameInfo';
import { Car, GameScreen, TurboIndicator, Obstacle } from './styles';
import { setGameStatus } from '../../store/actions';
import {
  NOT_STARTED,
  PAUSED,
  RUNNING,
  FINISHED,
  CRASHED,
} from '../../store/gameStatus';
import EndGame from '../../components/EndGame';

const Game = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.gameStatus);

  const [carLane, setCarLane] = useState(1);
  const [moving, setMoving] = useState(false);
  const [metersRun, setMetersRun] = useState(0);
  const [turboFuel, setTurboFuel] = useState(0);
  const [turboTime, setTurboTime] = useState(0);
  const [obstacles, setObstacles] = useState([]);

  const actions = {
    a: () => setCarLane(0),
    s: () => setCarLane(1),
    d: () => setCarLane(2),
    t: () => {
      if (turboFuel >= 100) {
        setTurboFuel(0);
        setTurboTime(15);
      }
    },
    escape: () =>
      (status === PAUSED || status === RUNNING) &&
      dispatch(setGameStatus(status === PAUSED ? RUNNING : PAUSED)),
  };

  useEffect(() => {
    const handleKeydown = event => {
      if (status === RUNNING || status === PAUSED) {
        const act = actions[event.key.toLowerCase()];
        if (typeof act === 'function') {
          act();
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => document.removeEventListener('keydown', handleKeydown);
  }, [status, actions]);

  useEffect(() => {
    if (status === RUNNING) {
      const changeBg = setInterval(
        () => {
          setMoving(!moving);
          setMetersRun(metersRun + 100);
          setTurboFuel(Math.min(turboFuel + 1, 100));

          if (turboTime > 0) {
            setTurboTime(turboTime - 1);
          }

          obstacles.forEach(obst => {
            const pos = Math.floor((obst.location - metersRun) / 100);
            if (pos <= 0 && pos >= -2 && obst.lane === carLane) {
              dispatch(setGameStatus(CRASHED));
            }
          });
        },
        turboTime > 0 ? 100 : 300,
      );

      return () => {
        clearInterval(changeBg);
      };
    }
  }, [
    moving,
    status,
    metersRun,
    turboTime,
    setTurboTime,
    turboFuel,
    setTurboFuel,
    obstacles,
    carLane,
    dispatch,
  ]);

  useEffect(() => {
    if (Math.floor(metersRun / 5000) > 4) {
      dispatch(setGameStatus(FINISHED));
    }
  }, [metersRun, dispatch]);

  useEffect(() => {
    if (status === NOT_STARTED) {
      const newObstacles = [];
      for (let i = 0; i < 20; i++) {
        // max i can be later increased to make for difficult
        const location = Math.floor(1500 + Math.random() * 23500);
        const lane = Math.floor(Math.random() * 3);
        newObstacles.push({ location, lane });
      }
      setObstacles(newObstacles);

      setCarLane(1);
      setMetersRun(0);
      setTurboFuel(0);
      setTurboTime(0);
    }
  }, [status, setObstacles]);

  return (
    <GameScreen moving={moving}>
      {(status === PAUSED || status === RUNNING) && (
        <GameInfo metersRun={metersRun} />
      )}
      <TurboIndicator amount={turboFuel} />
      {status === NOT_STARTED && (
        <NameInput startRace={() => dispatch(setGameStatus(RUNNING))} />
      )}
      {(status === FINISHED || status === CRASHED) && <EndGame />}
      {obstacles.map((obstacle, index) => (
        <Obstacle
          key={index}
          src={rock}
          {...obstacle}
          carPosition={metersRun}
        />
      ))}
      <Car
        src={car}
        className={carLane === 0 ? 'left' : carLane === 2 ? 'right' : ''}
      />
    </GameScreen>
  );
};

export default memo(Game);
