import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import { INITIAL_STATE } from '../store';
import EndGame from '../components/EndGame';
import { CRASHED, FINISHED, NOT_STARTED } from '../store/gameStatus';
import { Message } from '../components/EndGame/styles';
import { SET_GAME_STATUS } from '../store/actions';

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

    expect(wrapper.find(Message).text()).toBe('Você conseguiu!');
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

  it('resets state on play again click', () => {
    const store = mockStore(INITIAL_STATE);
    const wrapper = mount(
      <Provider store={store}>
        <EndGame />
      </Provider>,
    );

    wrapper.find('.play-again').simulate('click');
    expect(store.getActions()).toEqual([
      { type: SET_GAME_STATUS, gameStatus: NOT_STARTED },
    ]);
  });
});
