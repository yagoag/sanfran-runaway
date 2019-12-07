import React, { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IntlProvider } from 'react-intl';
import car from '../../assets/images/car.png';
import hipster from '../../assets/images/hipster.png';
import starCafe from '../../assets/images/star-cafe.png';
import GameStart from '../../components/GameStart';
import GameInfo from '../../components/GameInfo';
import { setGameStatus } from '../../store/actions';
import {
  NOT_STARTED,
  PAUSED,
  RUNNING,
  FINISHED,
  CRASHED,
} from '../../store/gameStatus';
import EndGame from '../../components/EndGame';
import {
  LAP_SIZE,
  TOTAL_LAPS,
  MIN_OBSTACLE_LOCATION,
  NUMBER_OBSTACLES,
} from '../../gameData';
import messages from '../../i18n/messages';
import {
  Car,
  GameScreen,
  TurboIndicator,
  Obstacle,
  LaneControlButton,
  PauseControlButton,
  TurboControlButton,
  LapMark,
} from './styles';

document.addEventListener('touchmove', e => e.preventDefault());

const Game = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.gameStatus);
  const lang = useSelector(state => state.language);

  const [carLane, setCarLane] = useState(1);
  const [moving, setMoving] = useState(false);
  const [metersRun, setMetersRun] = useState(0);
  const [turboFuel, setTurboFuel] = useState(0);
  const [turboTime, setTurboTime] = useState(0);
  const [obstacles, setObstacles] = useState([]);

  const actions = {
    a: () => {
      if (status === RUNNING) setCarLane(0);
    },
    s: () => {
      if (status === RUNNING) setCarLane(1);
    },
    d: () => {
      if (status === RUNNING) setCarLane(2);
    },
    arrowleft: () => {
      if (status === RUNNING && carLane > 0) setCarLane(carLane - 1);
    },
    arrowright: () => {
      if (status === RUNNING && carLane < 2) setCarLane(carLane + 1);
    },
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
            if (pos <= 1 && pos >= -1 && obst.lane === carLane) {
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
    turboFuel,
    obstacles,
    carLane,
    dispatch,
  ]);

  useEffect(() => {
    if (Math.floor(metersRun / LAP_SIZE) >= TOTAL_LAPS) {
      dispatch(setGameStatus(FINISHED));
    }
  }, [metersRun, dispatch]);

  useEffect(() => {
    if (status === NOT_STARTED) {
      const newObstacles = [];
      for (let i = 0; i < NUMBER_OBSTACLES; i++) {
        const location = Math.floor(
          MIN_OBSTACLE_LOCATION +
            Math.random() * (TOTAL_LAPS * LAP_SIZE - MIN_OBSTACLE_LOCATION),
        );
        const lane = Math.floor(Math.random() * 3);
        newObstacles.push({ location, lane });
      }
      setObstacles(newObstacles);

      setCarLane(1);
      setMetersRun(0);
      setTurboFuel(0);
      setTurboTime(0);
    }
  }, [status]);

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <GameScreen moving={moving}>
        {(status === PAUSED || status === RUNNING) && (
          <>
            <GameInfo metersRun={metersRun} />
            <TurboIndicator amount={turboFuel} />
          </>
        )}
        {status === NOT_STARTED && <GameStart />}
        {(status === FINISHED || status === CRASHED) && <EndGame />}
        {obstacles.map((obstacle, index) => (
          <Obstacle
            key={index}
            src={hipster}
            {...obstacle}
            carPosition={metersRun}
          />
        ))}
        <LapMark src={starCafe} carPosition={metersRun} />
        <Car
          src={car}
          className={carLane === 0 ? 'left' : carLane === 2 ? 'right' : ''}
        />
        <LaneControlButton
          className="left-lane-control"
          onClick={actions.a}
          lane={0}
        />
        <LaneControlButton
          className="middle-lane-control"
          onClick={actions.s}
          lane={1}
        />
        <LaneControlButton
          className="right-lane-control"
          onClick={actions.d}
          lane={2}
        />
        <PauseControlButton
          className="pause-control"
          onClick={actions.escape}
        />
        <TurboControlButton className="turbo-control" onClick={actions.t} />
      </GameScreen>
    </IntlProvider>
  );
};

export default memo(Game);
