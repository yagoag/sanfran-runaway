import Styled from 'styled-components';
import scenario1 from '../../assets/images/scenario-1.png';
import scenario2 from '../../assets/images/scenario-2.png';

export const GameScreen = Styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${props => (props.moving ? scenario2 : scenario1)});
  background-size: 100% 100%;
  background-repeat: no-repeat;
`;

export const Car = Styled.img`
  width: 15vw;
  position: absolute;
  bottom: 10px;
  left: 40vw;

  &.left {
  left: 10vw;
  transform: skew(-20deg);
  }

  &.right {
  left: 70vw;
  transform: skew(20deg);
  }
`;

export const TurboIndicator = Styled.div`
  position: absolute;
  right: 24px;
  bottom: 96px;
  background-color: #0080f899;
  width: 64px;
  height: 300px;

  &::before {
    position: absolute;
    content: '';
    bottom: 0;
    background-color: #040091;
    width: 64px;
    height: ${props => `${props.amount * 3}px`};
  }

  &::after {
    content: 'Turbo';
    position: absolute;
    top: 308px;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props =>
      props.amount >= 100 ? '#040091' : '#0080f899'};
    font-size: 10px;
    color: ${props => (props.amount >= 100 ? '#ffffff' : '#cccccc')};
  }
`;
