import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { INITIAL_STATE } from '../store';
import EndGame from '../components/EndGame';
import { CRASHED, FINISHED } from '../store/gameStatus';
import { Message } from '../components/EndGame/styles';

const mockStore = configureStore([]);

describe('EndGame', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <Provider store={mockStore(INITIAL_STATE)}>
        <EndGame />
      </Provider>,
    );

    expect(wrapper).not.toBeNull();
  });

  it('shows correct finish message', () => {
    const wrapper = mount(
      <Provider store={mockStore({ ...INITIAL_STATE, gameStatus: FINISHED })}>
        <EndGame />
      </Provider>,
    );

    expect(wrapper.find(Message).text()).toBe('Você chegou!');
  });

  it('shows correct crashed message', () => {
    const wrapper = mount(
      <Provider store={mockStore({ ...INITIAL_STATE, gameStatus: CRASHED })}>
        <EndGame />
      </Provider>,
    );

    expect(wrapper.find(Message).text()).toBe('Você atropelou o hipster :(');
  });

  it('shows the play again button', () => {
    const wrapper = mount(
      <Provider store={mockStore(INITIAL_STATE)}>
        <EndGame />
      </Provider>,
    );

    expect(wrapper.find('.play-again')).toHaveLength(1);
  });
});
