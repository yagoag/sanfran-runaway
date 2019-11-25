import Styled from 'styled-components';
import scenario1 from '../../assets/images/scenario-1.png';
import scenario2 from '../../assets/images/scenario-2.png';

export const GameScreen = Styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${scenario1});
  
  &.two {
    background-image: url(${scenario2});
  }

  background-size: 100% 100%;
  background-repeat: no-repeat;
`;

export const Car = Styled.img`
  width: 25vw;
  position: absolute;
  bottom: 10px;
  left: 35vw;

  &.left {
  left: 0vw;
  transform: skew(-20deg);
  }

  &.right {
  left: 70vw;
  transform: skew(20deg);
  }
`;
