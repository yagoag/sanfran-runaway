import Styled from 'styled-components';
import scenario1 from '../../assets/images/scenario-1.png';
import scenario2 from '../../assets/images/scenario-2.png';
import { LAP_SIZE } from '../../gameData';

export const GameScreen = Styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url(${props => (props.moving ? scenario2 : scenario1)});
  background-size: 100% 100%;
  background-repeat: no-repeat;
`;

export const Car = Styled.img`
  height: 15vh;
  position: absolute;
  bottom: 0;
  left: calc(50vw - 8vh);

  &.left {
  left: calc(16vw - 8vh);
  transform: skew(-20deg);
  }

  &.right {
  left: calc(82vw - 8vh);
  transform: skew(20deg);
  }
`;

export const TurboIndicator = Styled.div`
  position: absolute;
  left: 24px;
  top: 24px;
  background-color: #0080f899;
  width: 300px;
  height: 32px;
  z-index: 990;

  &::before {
    content: '';
    position: absolute;
    display: flex;
    align-items: center;
    background-color: #040091;
    height: 32px;
    width: ${props => `${props.amount * 3}px`};
    font-size: 10px;
    color: ${props => (props.amount >= 100 ? '#ffffff' : '#cccccc')};
  }

  &::after {
    content: 'Turbo';
    position: absolute;
    display: flex;
    align-items: center;
    left: 12px;
    height: 32px;
    font-size: 10px;
    color: ${props => (props.amount >= 100 ? '#ffffff' : '#cccccc')};
  }

  @media screen and (max-width: 639px) {
    top: 128px;
  }
`;

const ControlButton = Styled.button`
  position: absolute;
  bottom: 0;
  width: 33vw;
  height: 33vh;
  z-index: 995;
  background-color: transparent;
  border: none;
  outline: none;
`;

export const LaneControlButton = Styled(ControlButton)`
  left: ${props => `${props.lane * 33}vw`};
`;

export const PauseControlButton = Styled(ControlButton)`
  right: 0;
  top: 0;
`;

export const TurboControlButton = Styled(ControlButton)`
  left: 0;
  top: 0;
`;

export const LapMark = Styled.img.attrs(props => ({
  position: Math.floor(props.carPosition % LAP_SIZE) - (LAP_SIZE - 1100),
  side: Math.floor((props.carPosition / LAP_SIZE) % 2),
}))`
  height: ${props =>
    props.position >= 0 && props.position <= 1000
      ? `${10 + props.position / 100}vh`
      : '0'};
  position: absolute;
  top: ${props =>
    props.position >= 0 &&
    props.position <= 1000 &&
    `${39 + props.position * 0.02}vh`};
  right: ${props =>
    props.side === 1 &&
    props.position >= 0 &&
    props.position <= 1000 &&
    `${lapMarkHorizontalLeftPositions[props.position / 100]}vw`};
  left: ${props =>
    props.side === 0 &&
    props.position >= 0 &&
    props.position <= 1000 &&
    `${lapMarkHorizontalLeftPositions[props.position / 100]}vw`};
`;

const lapMarkHorizontalLeftPositions = [
  56,
  59,
  63,
  68,
  72,
  76,
  81,
  86,
  90,
  94,
  99,
];

export const Obstacle = Styled.img.attrs(props => ({
  position: Math.floor((props.location - props.carPosition) / 100),
}))`
  height: ${props =>
    props.position <= 8 && props.position >= -2
      ? `${12 - props.position}vh`
      : '0'};
  position: absolute;
  left: ${props =>
    props.position <= 8 &&
    props.position >= -2 &&
    `calc(${lanePositionMap[props.lane][props.position]}vw - ${(12 -
      props.position) /
      2}vh)`};
  bottom: ${props =>
    props.position <= 8 &&
    props.position >= -2 &&
    `${(props.position + 2) * 5}vh`};
`;

const lanePositionMap = {
  0: {
    '8': 47,
    '7': 45,
    '6': 41,
    '5': 38,
    '4': 34,
    '3': 31,
    '2': 28,
    '1': 24,
    '0': 19,
    '-1': 14,
    '-2': 12,
  },
  1: {
    '8': 51,
    '7': 51,
    '6': 51,
    '5': 51,
    '4': 51,
    '3': 51,
    '2': 51,
    '1': 51,
    '0': 51,
    '-1': 51,
    '-2': 51,
  },
  2: {
    '8': 55,
    '7': 58,
    '6': 63,
    '5': 66,
    '4': 69,
    '3': 72,
    '2': 76,
    '1': 81,
    '0': 84,
    '-1': 88,
    '-2': 91,
  },
};
