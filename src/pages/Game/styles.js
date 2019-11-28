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
  position: Math.floor(props.carPosition % LAP_SIZE) - 4500,
  side: Math.floor((props.carPosition / LAP_SIZE) % 2),
}))`
  height: ${props =>
    props.position >= 0 && props.position <= 500
      ? `${10 + props.position / 100}vh`
      : '0'};
  position: absolute;
  top: ${props =>
    props.position >= 0 &&
    props.position <= 500 &&
    `${41 + props.position * 0.02}vh`};
  right: ${props =>
    props.side === 1 &&
    props.position >= 0 &&
    props.position <= 500 &&
    `${lapMarkHorizontalLeftPositions[props.position / 100]}vw`};
  left: ${props =>
    props.side === 0 &&
    props.position >= 0 &&
    props.position <= 500 &&
    `${lapMarkHorizontalLeftPositions[props.position / 100] - 4}vw`};
`;

const lapMarkHorizontalLeftPositions = [58, 66, 73, 80, 87, 95];

export const Obstacle = Styled.img.attrs(props => ({
  position: Math.floor((props.location - props.carPosition) / 100),
}))`
  height: ${props =>
    props.position <= 7 && props.position >= -2
      ? `${12 - props.position}vh`
      : '0'};
  position: absolute;
  left: ${props =>
    props.position <= 7 &&
    props.position >= -2 &&
    `calc(${lanePositionMap[props.lane][props.position]}vw - ${(12 -
      props.position) /
      2}vh)`};
  bottom: ${props =>
    props.position <= 7 &&
    props.position >= -2 &&
    `${(props.position + 2) * 5}vh`};
`;

const lanePositionMap = {
  0: {
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
    '7': 49,
    '6': 49,
    '5': 49.5,
    '4': 49.5,
    '3': 50,
    '2': 50,
    '1': 50.5,
    '0': 50.5,
    '-1': 50.5,
    '-2': 50.5,
  },
  2: {
    '7': 55,
    '6': 59,
    '5': 64,
    '4': 67,
    '3': 70,
    '2': 74,
    '1': 79,
    '0': 82,
    '-1': 86,
    '-2': 89,
  },
};
