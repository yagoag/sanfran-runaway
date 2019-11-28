import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { INITIAL_STATE } from '../store';
import GameInfo from '../components/GameInfo';
import { RUNNING, PAUSED } from '../store/gameStatus';
import {
  PauseIndicator,
  NameIndicator,
  LapIndicator,
  LapSymbol,
} from '../components/GameInfo/styles';
import { LAP_SIZE } from '../gameData';

const mockStore = configureStore([]);

describe('GameInfo', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={mockStore(INITIAL_STATE)}>
        <GameInfo />
      </Provider>,
    );

    expect(wrapper).not.toBeNull();
  });

  it('shows pause indicator on paused game', () => {
    const wrapper = mount(
      <Provider store={mockStore({ ...INITIAL_STATE, gameStatus: PAUSED })}>
        <GameInfo />
      </Provider>,
    );

    expect(wrapper.find(PauseIndicator)).toHaveLength(1);
  });

  it('does not show pause indicator on running game', () => {
    const wrapper = mount(
      <Provider store={mockStore({ ...INITIAL_STATE, gameStatus: RUNNING })}>
        <GameInfo />
      </Provider>,
    );

    expect(wrapper.find(PauseIndicator)).toHaveLength(0);
  });

  it('shows player name when running', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          gameStatus: RUNNING,
          playerName: 'Sean Boswell',
        })}
      >
        <GameInfo />
      </Provider>,
    );

    const nameIndicator = wrapper.find(NameIndicator);
    expect(nameIndicator).toHaveLength(1);
    expect(nameIndicator.text()).toBe('Sean Boswell');
  });

  it('hides player name when paused', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          gameStatus: PAUSED,
          playerName: 'Sean Boswell',
        })}
      >
        <GameInfo />
      </Provider>,
    );

    expect(wrapper.find(NameIndicator)).toHaveLength(0);
  });

  it('shows lap count when running', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          gameStatus: RUNNING,
        })}
      >
        <GameInfo metersRun={0} />
      </Provider>,
    );

    const lapIndicator = wrapper.find(LapIndicator);
    expect(lapIndicator).toHaveLength(1);
    expect(lapIndicator.find(LapSymbol)).toHaveLength(1);
    expect(lapIndicator.text()).toBe('0/5');
  });

  it('shows correct lap number', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          gameStatus: RUNNING,
        })}
      >
        <GameInfo metersRun={3.5 * LAP_SIZE} />
      </Provider>,
    );

    const lapIndicator = wrapper.find(LapIndicator);
    expect(lapIndicator.text()).toBe('3/5');
  });

  it('hides lap number when paused', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({
          ...INITIAL_STATE,
          gameStatus: PAUSED,
        })}
      >
        <GameInfo metersRun={0} />
      </Provider>,
    );

    expect(wrapper.find(LapIndicator)).toHaveLength(0);
  });
});
