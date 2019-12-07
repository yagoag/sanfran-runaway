import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { INITIAL_STATE } from '../store';
import EndGame from '../components/EndGame';
import { CRASHED, FINISHED, NOT_STARTED } from '../store/gameStatus';
import { Message } from '../components/EndGame/styles';
import { SET_GAME_STATUS } from '../store/actions';
import messages from '../i18n/messages';

const mockStore = configureStore([]);

describe('EndGame', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <IntlProvider locale="en-US" messages={messages['en-US']}>
        <Provider store={mockStore(INITIAL_STATE)}>
          <EndGame />
        </Provider>
      </IntlProvider>,
    );

    expect(wrapper).not.toBeNull();
  });

  it('shows correct finish message', () => {
    const wrapper = mount(
      <IntlProvider locale="en-US" messages={messages['en-US']}>
        <Provider store={mockStore({ ...INITIAL_STATE, gameStatus: FINISHED })}>
          <EndGame />
        </Provider>
      </IntlProvider>,
    );

    expect(wrapper.find(Message).text()).toBe(messages['en-US'].winMessage);
  });

  it('shows correct crashed message', () => {
    const wrapper = mount(
      <IntlProvider locale="en-US" messages={messages['en-US']}>
        <Provider store={mockStore({ ...INITIAL_STATE, gameStatus: CRASHED })}>
          <EndGame />
        </Provider>
      </IntlProvider>,
    );

    expect(wrapper.find(Message).text()).toBe(messages['en-US'].loseMessage);
  });

  it('shows the play again button', () => {
    const wrapper = mount(
      <IntlProvider locale="en-US" messages={messages['en-US']}>
        <Provider store={mockStore(INITIAL_STATE)}>
          <EndGame />
        </Provider>
      </IntlProvider>,
    );

    expect(wrapper.find('.play-again')).toHaveLength(1);
  });

  it('resets state on play again click', () => {
    const store = mockStore(INITIAL_STATE);
    const wrapper = mount(
      <IntlProvider locale="en-US" messages={messages['en-US']}>
        <Provider store={store}>
          <EndGame />
        </Provider>
      </IntlProvider>,
    );

    wrapper.find('.play-again').simulate('click');
    expect(store.getActions()).toEqual([
      { type: SET_GAME_STATUS, gameStatus: NOT_STARTED },
    ]);
  });
});
