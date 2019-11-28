import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { INITIAL_STATE } from '../store';
import Game from '../pages/Game';
import {
  Car,
  PauseControlButton,
  TurboControlButton,
  LaneControlButton,
} from '../pages/Game/styles';
import { RUNNING, FINISHED, CRASHED, PAUSED } from '../store/gameStatus';
import GameInfo from '../components/GameInfo';
import GameStart from '../components/GameStart';
import EndGame from '../components/EndGame';
import { SET_GAME_STATUS } from '../store/actions';

const mockStore = configureStore([]);

describe('Game', () => {
  describe('renders necessary items', () => {
    it('renders without crashing', () => {
      const wrapper = shallow(
        <Provider store={mockStore(INITIAL_STATE)}>
          <Game />
        </Provider>,
      );

      expect(wrapper).not.toBeNull();
    });

    it('renders the car', () => {
      const wrapper = mount(
        <Provider store={mockStore(INITIAL_STATE)}>
          <Game />
        </Provider>,
      );

      expect(wrapper.find(Car)).toHaveLength(1);
    });

    it('renders GameInfo when running', () => {
      const wrapper = mount(
        <Provider store={mockStore({ ...INITIAL_STATE, gameStatus: RUNNING })}>
          <Game />
        </Provider>,
      );

      expect(wrapper.find(GameInfo)).toHaveLength(1);
    });

    it('hides GameInfo before starting', () => {
      const wrapper = mount(
        <Provider store={mockStore(INITIAL_STATE)}>
          <Game />
        </Provider>,
      );

      expect(wrapper.find(GameInfo)).toHaveLength(0);
    });

    it('hides GameInfo after finishing', () => {
      const wrapper = mount(
        <Provider store={mockStore({ ...INITIAL_STATE, gameStatus: FINISHED })}>
          <Game />
        </Provider>,
      );

      expect(wrapper.find(GameInfo)).toHaveLength(0);
    });

    it('hides GameInfo after crashing', () => {
      const wrapper = mount(
        <Provider store={mockStore({ ...INITIAL_STATE, gameStatus: CRASHED })}>
          <Game />
        </Provider>,
      );

      expect(wrapper.find(GameInfo)).toHaveLength(0);
    });

    it('renders GameStart before game starts', () => {
      const wrapper = mount(
        <Provider store={mockStore(INITIAL_STATE)}>
          <Game />
        </Provider>,
      );

      expect(wrapper.find(GameStart)).toHaveLength(1);
    });

    it('hides GameStart after game starts', () => {
      const wrapper = mount(
        <Provider store={mockStore({ ...INITIAL_STATE, gameStatus: RUNNING })}>
          <Game />
        </Provider>,
      );

      expect(wrapper.find(GameStart)).toHaveLength(0);
    });

    it('renders EndGame after finishing', () => {
      const wrapper = mount(
        <Provider store={mockStore({ ...INITIAL_STATE, gameStatus: FINISHED })}>
          <Game />
        </Provider>,
      );

      expect(wrapper.find(EndGame)).toHaveLength(1);
    });

    it('renders EndGame after crashing', () => {
      const wrapper = mount(
        <Provider store={mockStore({ ...INITIAL_STATE, gameStatus: CRASHED })}>
          <Game />
        </Provider>,
      );

      expect(wrapper.find(EndGame)).toHaveLength(1);
    });

    it('hides EndGame while running', () => {
      const wrapper = mount(
        <Provider store={mockStore({ ...INITIAL_STATE, gameStatus: RUNNING })}>
          <Game />
        </Provider>,
      );

      expect(wrapper.find(EndGame)).toHaveLength(0);
    });

    it('hides EndGame before starting', () => {
      const wrapper = mount(
        <Provider store={mockStore(INITIAL_STATE)}>
          <Game />
        </Provider>,
      );

      expect(wrapper.find(EndGame)).toHaveLength(0);
    });

    it('renders pause command', () => {
      const wrapper = mount(
        <Provider store={mockStore(INITIAL_STATE)}>
          <Game />
        </Provider>,
      );

      expect(wrapper.find(PauseControlButton)).toHaveLength(1);
    });

    it('renders turbo command', () => {
      const wrapper = mount(
        <Provider store={mockStore(INITIAL_STATE)}>
          <Game />
        </Provider>,
      );

      expect(wrapper.find(TurboControlButton)).toHaveLength(1);
    });

    it('renders lane commands', () => {
      const wrapper = mount(
        <Provider store={mockStore(INITIAL_STATE)}>
          <Game />
        </Provider>,
      );

      expect(wrapper.find(LaneControlButton)).toHaveLength(3);
    });
  });

  describe('respects commands', () => {
    let wrapper;
    let store;

    beforeEach(() => {
      store = mockStore({ ...INITIAL_STATE, gameStatus: RUNNING });
      wrapper = mount(
        <Provider store={store}>
          <Game />
        </Provider>,
      );
    });

    it('pauses game on command', () => {
      wrapper.find('button.pause-control').simulate('click');
      expect(store.getActions()).toEqual([
        { type: SET_GAME_STATUS, gameStatus: PAUSED },
      ]);
    });

    it('unpauses game on command', () => {
      store = mockStore({ ...INITIAL_STATE, gameStatus: PAUSED });
      wrapper = mount(
        <Provider store={store}>
          <Game />
        </Provider>,
      );

      wrapper.find('button.pause-control').simulate('click');
      expect(store.getActions()).toEqual([
        { type: SET_GAME_STATUS, gameStatus: RUNNING },
      ]);
    });

    it('moves the car to the left lane', () => {
      wrapper.find('button.left-lane-control').simulate('click');
      expect(wrapper.find(Car).find('img.left')).toHaveLength(1);
    });

    it('moves the car to the right lane', () => {
      wrapper.find('button.right-lane-control').simulate('click');
      expect(wrapper.find(Car).find('img.right')).toHaveLength(1);
    });

    it('moves the car to the middle lane', () => {
      wrapper.find('button.middle-lane-control').simulate('click');
      expect(wrapper.find(Car).find('img')).toHaveLength(1);
      expect(wrapper.find(Car).find('img.left')).toHaveLength(0);
      expect(wrapper.find(Car).find('img.right')).toHaveLength(0);
    });
  });
});
