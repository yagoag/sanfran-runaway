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
  z-index: 999;

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

export const Obstacle = Styled.img.attrs(props => ({
  position: Math.floor((props.location - props.carPosition) / 100),
}))`
  width: ${props =>
    props.position <= 6 && props.position >= -2
      ? `${8 - props.position}vw`
      : '0'};
  height: auto;
  position: absolute;
  left: ${props => {
    if (props.position <= 6 && props.position >= -2) {
      console.log(props.lane);
      console.log(props.position);
      console.log(lanePositionMap[props.lane][props.position]);
    }
    return `${lanePositionMap[props.lane][props.position]}vw`;
  }};
  top: ${props =>
    props.position <= 6 && props.position >= -2
      ? `${80 - props.position * 5}vh`
      : '-20vh'};
`;

const lanePositionMap = {
  0: {
    '6': 44,
    '5': 38,
    '4': 30,
    '3': 24,
    '2': 18,
    '1': 13,
    '0': 8,
    '-1': 2,
    '-2': -2,
  },
  1: {
    '6': 47,
    '5': 46,
    '4': 46,
    '3': 46,
    '2': 45,
    '1': 44,
    '0': 43,
    '-1': 42,
    '-2': 42,
  },
  2: {
    '6': 51,
    '5': 55,
    '4': 60,
    '3': 66,
    '2': 71,
    '1': 75,
    '0': 80,
    '-1': 84,
    '-2': 89,
  },
};
