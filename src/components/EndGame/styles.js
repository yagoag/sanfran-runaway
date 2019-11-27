import Styled from 'styled-components';

export const EndModal = Styled.div`
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
    outline: none;
  }
`;

export const Message = Styled.div`
  padding: 24px;
`;
