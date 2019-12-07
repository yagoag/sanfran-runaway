import Styled from 'styled-components';
import brFlag from '../../assets/images/br-flag.png';
import usFlag from '../../assets/images/us-flag.png';

export const FlagContainer = Styled.div`
  display: flex;
  position: absolute;
  top: 24px;
  right: ${props => (props.tutorialOpen ? '24px' : '236px')};
  padding: 4px 12px;
  background-color: #b4b4b4;
  border: none;
  outline: none;
  z-index: 999;
  box-shadow: #000000 2px 2px 0;
`;

export const Flag = Styled.button`
  height: 18px;
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: ${props => props.active && 'luminosity'};
  border: none;
  outline: none;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 12px;
  }
`;

export const BrFlag = Styled(Flag)`
  background-image: url(${brFlag});
  width: 26px;
`;

export const UsFlag = Styled(Flag)`
  background-image: url(${usFlag});
  width: 29px;
`;
