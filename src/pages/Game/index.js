import React, { useState, useEffect } from 'react';
import car from '../../assets/images/car.png';
import { Car, GameScreen } from './styles';

const Game = () => {
  const [position, setPosition] = useState('s');
  const [paused, setPaused] = useState(false);
  const [step2, setStep2] = useState(false);

  const actions = {
    a: () => setPosition('a'),
    s: () => setPosition('s'),
    d: () => setPosition('d'),
    escape: () => setPaused(!paused),
  };

  useEffect(() => {
    const handleKeydown = event => {
      const act = actions[event.key.toLowerCase()];
      if (typeof act === 'function') {
        act();
      }
    };
    document.addEventListener('keydown', handleKeydown);
  }, []);

  useEffect(() => {
    const changeBg = setInterval(() => {
      setStep2(!step2);
    }, 300);

    return () => {
      clearInterval(changeBg);
    };
  }, [step2]);

  return (
    <GameScreen className={!paused && step2 ? 'two' : ''}>
      <Car
        src={car}
        className={position === 'a' ? 'left' : position === 'd' ? 'right' : ''}
      />
    </GameScreen>
  );
};

export default Game;
