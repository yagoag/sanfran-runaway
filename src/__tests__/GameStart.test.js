import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { INITIAL_STATE } from '../store';
import GameStart from '../components/GameStart';
import {
  NameInput,
  NameDialog,
  NameInputError,
  Countdown,
  TutorialButton,
} from '../components/GameStart/styles';
import Tutorial from '../components/Tutorial';

const mockStore = configureStore([]);

describe('GameStart', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={mockStore(INITIAL_STATE)}>
        <GameStart />
      </Provider>,
    );

    expect(wrapper).not.toBeNull();
  });

  it('shows name input', () => {
    const wrapper = mount(
      <Provider store={mockStore(INITIAL_STATE)}>
        <GameStart />
      </Provider>,
    );

    expect(wrapper.find(NameInput)).toHaveLength(1);
  });

  it('shows start button', () => {
    const wrapper = mount(
      <Provider store={mockStore(INITIAL_STATE)}>
        <GameStart />
      </Provider>,
    );

    expect(wrapper.find('button.start-race')).toHaveLength(1);
  });

  it('shows error message for empty name', () => {
    const wrapper = mount(
      <Provider store={mockStore(INITIAL_STATE)}>
        <GameStart />
      </Provider>,
    );

    wrapper.find('button.start-race').simulate('click');
    expect(wrapper.find(NameInputError)).toHaveLength(1);
  });

  it('starts game on button click', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({ ...INITIAL_STATE, playerName: 'Sean Boswell' })}
      >
        <GameStart />
      </Provider>,
    );

    wrapper.find('button.start-race').simulate('click');
    expect(wrapper.find(NameDialog)).toHaveLength(0);
  });

  it('shows countdown on game start', () => {
    const wrapper = mount(
      <Provider
        store={mockStore({ ...INITIAL_STATE, playerName: 'Sean Boswell' })}
      >
        <GameStart />
      </Provider>,
    );

    wrapper.find('button.start-race').simulate('click');
    expect(wrapper.find(Countdown)).toHaveLength(1);
  });

  it('shows tutorial button', () => {
    const wrapper = mount(
      <Provider store={mockStore(INITIAL_STATE)}>
        <GameStart />
      </Provider>,
    );

    expect(wrapper.find(TutorialButton)).toHaveLength(1);
  });

  it('opens tutorial screen', () => {
    const wrapper = mount(
      <Provider store={mockStore(INITIAL_STATE)}>
        <GameStart />
      </Provider>,
    );

    wrapper.find(TutorialButton).simulate('click');
    expect(wrapper.find(NameDialog)).toHaveLength(0);
    expect(wrapper.find(Tutorial)).toHaveLength(1);
  });
});
