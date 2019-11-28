import React, { useState } from 'react';
import {
  TutorialDialog,
  TutorialContainer,
  TutorialContent,
  Arrow,
  Key,
  ArrowSpacer,
} from './styles';

export const TOTAL_PAGES = 5;

const Tutorial = ({ dismiss }) => {
  const [page, setPage] = useState(1);

  return (
    <TutorialDialog>
      <TutorialContainer>
        {page > 1 ? (
          <Arrow className="previous-page" onClick={() => setPage(page - 1)}>
            {'<'}
          </Arrow>
        ) : (
          <ArrowSpacer />
        )}
        <TutorialContent>
          {page === 1 && (
            <p>
              Se você conhece um pouco sobre São Francisco sabe que a cidade é
              cheia de hipsters, e não tem nada que um hipster goste mais do que
              um bom café.
            </p>
          )}
          {page === 2 && (
            <p>
              O objetivo do jogo é encontrar cinco lojas da famosa rede "Star
              Café" sem atropelar nenhum dos hipsters que andam pela rua com o
              café da rede na mão.
            </p>
          )}
          {page === 3 && (
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
          {page === 4 && (
            <>
              <p>Para pausar o jogo, pressione</p>
              <p>
                <Key>Esc</Key>
              </p>
              <p>Ou toque no canto superior direito da tela</p>
            </>
          )}
          {page === 5 && (
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
        {page < TOTAL_PAGES ? (
          <Arrow className="next-page" onClick={() => setPage(page + 1)}>
            {'>'}
          </Arrow>
        ) : (
          <ArrowSpacer />
        )}
      </TutorialContainer>
      <button className="dismiss-tutorial" onClick={dismiss}>
        Entendi
      </button>
    </TutorialDialog>
  );
};

export default Tutorial;
