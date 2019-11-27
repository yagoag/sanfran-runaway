import React, { useState } from 'react';
import {
  TutorialDialog,
  TutorialContainer,
  TutorialContent,
  Arrow,
  Key,
  ArrowSpacer,
} from './styles';

const Tutorial = ({ dismiss }) => {
  const [page, setPage] = useState(1);

  return (
    <TutorialDialog>
      <TutorialContainer>
        {page > 1 ? (
          <Arrow onClick={() => setPage(page - 1)}>{'<'}</Arrow>
        ) : (
          <ArrowSpacer />
        )}
        <TutorialContent>
          {page === 1 && (
            <>
              <p>Para mudar de faixa, pressione</p>
              <p>
                <Key>A</Key>, <Key>S</Key>, <Key>D</Key>
              </p>
              <p>ou</p>
              <p>
                <Key>{'<'}</Key>, <Key>{'>'}</Key>
              </p>
              <p>Ou toque na parte inferior das faixas</p>
            </>
          )}
          {page === 2 && (
            <>
              <p>Para pausar o jogo, pressione</p>
              <p>
                <Key>Esc</Key>
              </p>
              <p>Ou toque no canto superior direito da tela</p>
            </>
          )}
          {page === 3 && (
            <>
              <p>
                Para utilizar o turbo, assim que ele estiver totalmente
                carregado pressione
              </p>
              <p>
                <Key>T</Key>
              </p>
              <p>Ou toque no canto superior esquerdo da tela</p>
            </>
          )}
        </TutorialContent>
        {page < 3 ? (
          <Arrow onClick={() => setPage(page + 1)}>{'>'}</Arrow>
        ) : (
          <ArrowSpacer />
        )}
      </TutorialContainer>
      <button onClick={dismiss}>Entendi</button>
    </TutorialDialog>
  );
};

export default Tutorial;
