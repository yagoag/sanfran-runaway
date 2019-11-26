import React from 'react';
import { NameDialog } from './styles';

const NameInput = ({ startRace }) => (
  <NameDialog>
    <input type="text" placeholder="Nome" />
    <button onClick={startRace}>Iniciar Corrida</button>
  </NameDialog>
);

export default NameInput;
