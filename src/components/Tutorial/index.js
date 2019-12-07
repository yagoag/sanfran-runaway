import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
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
              <FormattedMessage id="tutorialIntro" />
            </p>
          )}
          {page === 2 && (
            <p>
              <FormattedMessage id="tutorialObjective" />
            </p>
          )}
          {page === 3 && (
            <>
              <p>
                <FormattedMessage id="laneKeyCmd" />
              </p>
              <p>
                <Key>A</Key>, <Key>S</Key>, <Key>D</Key>
              </p>
              <p>
                <FormattedMessage id="or" />
              </p>
              <p>
                <Key>{'<'}</Key>, <Key>{'>'}</Key>
              </p>
              <p>
                <FormattedMessage id="laneTouchCmd" />
              </p>
            </>
          )}
          {page === 4 && (
            <>
              <p>
                <FormattedMessage id="pauseKeyCmd" />
              </p>
              <p>
                <Key>Esc</Key>
              </p>
              <p>
                <FormattedMessage id="pauseTouchCmd" />
              </p>
            </>
          )}
          {page === 5 && (
            <>
              <p>
                <FormattedMessage id="turboKeyCmd" />
              </p>
              <p>
                <Key>T</Key>
              </p>
              <p>
                <FormattedMessage id="turboTouchCmd" />
              </p>
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
        <FormattedMessage id="dismissTutorial" />
      </button>
    </TutorialDialog>
  );
};

export default Tutorial;
