import Styled from 'styled-components';

export const NameDialog = Styled.div`
background-color: #ffffffdd;
width: 300px;
position: absolute;
top: 30vh;
left: calc(50vw - 180px);
padding: 30px;
text-align: center;

& input[type='text'] {
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #040091;
  width: 100%;
  padding: 8px;
  margin: 24px 0;
  outline: none;
  font-size: 18px;
  text-align: center;
}

& button {
  width: 100%;
  background-color: #040091;
  color: #ffffff;
  padding: 8px;
  outline: none;
}
`;
