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
  height: 10vh;
  position: absolute;
  bottom: 0;
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

export const Obstacle = Styled.img.attrs(props => ({
  position: Math.floor((props.location - props.carPosition) / 100),
}))`
  width: ${props =>
    props.position <= 6 && props.position >= -2
      ? `${8 - props.position}vw`
      : '0'};
  height: auto;
  position: absolute;
  left: ${props => `${lanePositionMap[props.lane][props.position]}vw`};
  bottom: ${props =>
    props.position <= 6 && props.position >= -2
      ? `${(props.position + 2) * 5}vh`
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
