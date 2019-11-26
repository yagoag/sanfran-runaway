import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NameDialog } from './styles';
import { setPlayerName } from '../../store/actions';

const NameInput = ({ startRace }) => {
  const dispatch = useDispatch();
  const name = useSelector(state => state.playerName);

  return (
    <NameDialog>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={e => dispatch(setPlayerName(e.target.value))}
      />
      <button onClick={startRace}>Iniciar Corrida</button>
    </NameDialog>
  );
};

export default NameInput;
