import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlagContainer, BrFlag, UsFlag } from './styles.js';
import { setLanguage } from '../../store/actions.js';

const LanguageChanger = ({ tutorialOpen }) => {
  const dispatch = useDispatch();
  const language = useSelector(state => state.language);

  return (
    <FlagContainer tutorialOpen={tutorialOpen}>
      <BrFlag
        active={language === 'pt-BR'}
        onClick={() => dispatch(setLanguage('pt-BR'))}
      />
      <UsFlag
        active={language === 'en-US'}
        onClick={() => dispatch(setLanguage('en-US'))}
      />
    </FlagContainer>
  );
};

export default LanguageChanger;
