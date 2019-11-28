import Styled from 'styled-components';

export const NameDialog = Styled.form`
  background-color: #ffffffdd;
  width: 300px;
  position: absolute;
  top: 30vh;
  left: calc(50vw - 180px);
  padding: 30px;
  text-align: center;
  z-index: 998;

  & button {
    width: 100%;
    background-color: #040091;
    color: #ffffff;
    padding: 8px;
    border: none;
    outline: none;
  }
`;

export const NameInput = Styled.input.attrs({ type: 'text' })`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid;
  border-color: ${props => (props.error ? '#cf0000' : '#040091')};
  width: 100%;
  padding: 8px;
  margin: 24px 0;
  outline: none;
  font-size: 18px;
  text-align: center;
`;

export const NameInputError = Styled.div`
  color: #cf0000;
  font-size: 10px;
  width: 100%;
  text-align: left;
  margin-top: -22px;
  margin-bottom: 12px;
`;

export const Countdown = Styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  top: calc(50vh - 25px);
  left: calc(50vw - 25px);
  text-align: center;
  text-shadow: 2px 2px 0 black;
  color: white;
  font-size: 48px;
`;

export const TutorialButton = Styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 200px;
  padding: 8px;
  background-color: #c7c7c7;
  border: none;
  outline: none;
  z-index: 999;
`;
