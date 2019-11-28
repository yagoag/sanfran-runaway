import Styled from 'styled-components';

const Indicator = Styled.div`
position: absolute;
top: 24px;
right: 24px;
text-shadow: 2px 2px 0 black;
color: white;
font-size: 32px;
`;

export const PauseIndicator = Styled(Indicator)`
letter-spacing: -0.5em;
`;

export const LapIndicator = Styled(Indicator)`
`;

export const NameIndicator = Styled(Indicator)`
top: 72px;
`;

export const LapSymbol = Styled.img`
  width: 32px;
  height: 32px;
`;
