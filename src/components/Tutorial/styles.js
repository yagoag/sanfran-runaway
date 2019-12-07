import Styled from 'styled-components';

export const TutorialDialog = Styled.div`
  background-color: #ffffffdd;
  width: 330px;
  height: 300px;
  position: absolute;
  top: calc(50vh - 180px);
  left: calc(50vw - 180px);
  padding: 30px 15px;
  text-align: center;
  z-index: 998;
  display: flex;
  flex-direction: column;

  & button {
    width: calc(100% - 24px);
    background-color: #040091;
    color: #ffffff;
    padding: 8px;
    margin: 0 12px;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;

export const TutorialContainer = Styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
`;

export const TutorialContent = Styled.div`
  flex: 1;
  align-self: center;
`;

export const Arrow = Styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
`;

export const ArrowSpacer = Styled.div`
  width: 32px;
`;

export const Key = Styled.span`
  background-color: #b4b4b4;
  box-shadow: #000000 2px 2px 0;
  padding: 4px 6px;
`;
