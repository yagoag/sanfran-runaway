import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
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
import messages from '../i18n/messages';

const mockStore = configureStore([]);

describe('GameStart', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <IntlProvider locale="en-US" messages={messages['en-US']}>
        <Provider store={mockStore(INITIAL_STATE)}>
          <GameStart />
        </Provider>
      </IntlProvider>,
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).not.toBeNull();
  });

  it('shows name input', () => {
    expect(wrapper.find(NameInput)).toHaveLength(1);
  });

  it('shows start button', () => {
    expect(wrapper.find('button.start-race')).toHaveLength(1);
  });

  it('shows error message for empty name', () => {
    wrapper.find('button.start-race').simulate('click');
    expect(wrapper.find(NameInputError)).toHaveLength(1);
  });

  it('starts game on button click', () => {
    wrapper = mount(
      <IntlProvider locale="en-US" messages={messages['en-US']}>
        <Provider
          store={mockStore({ ...INITIAL_STATE, playerName: 'Sean Boswell' })}
        >
          <GameStart />
        </Provider>
      </IntlProvider>,
    );

    wrapper.find('button.start-race').simulate('click');
    expect(wrapper.find(NameDialog)).toHaveLength(0);
  });

  it('shows countdown on game start', () => {
    wrapper = mount(
      <IntlProvider locale="en-US" messages={messages['en-US']}>
        <Provider
          store={mockStore({ ...INITIAL_STATE, playerName: 'Sean Boswell' })}
        >
          <GameStart />
        </Provider>
      </IntlProvider>,
    );

    wrapper.find('button.start-race').simulate('click');
    expect(wrapper.find(Countdown)).toHaveLength(1);
  });

  it('shows tutorial button', () => {
    expect(wrapper.find(TutorialButton)).toHaveLength(1);
  });

  it('opens tutorial screen', () => {
    wrapper.find(TutorialButton).simulate('click');
    expect(wrapper.find(NameDialog)).toHaveLength(0);
    expect(wrapper.find(Tutorial)).toHaveLength(1);
  });
});
