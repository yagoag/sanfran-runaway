import React from 'react';
import { shallow, mount } from 'enzyme';
import Tutorial, { TOTAL_PAGES } from '../components/Tutorial';
import {
  TutorialContent,
  Arrow,
  ArrowSpacer,
} from '../components/Tutorial/styles';

describe('Tutorial', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Tutorial />);
  });

  it('renders without crashing', () => {
    expect(wrapper).not.toBeNull();
  });

  it('shows tutorial content', () => {
    const tutorialContent = wrapper.find(TutorialContent);
    expect(tutorialContent).toHaveLength(1);
    expect(tutorialContent.text()).not.toEqual('');
  });

  it('shows the dismiss button', () => {
    expect(wrapper.find('.dismiss-tutorial')).toHaveLength(1);
  });

  it('shows next page arrow', () => {
    expect(wrapper.find('.next-page')).toHaveLength(1);
  });

  it('hides next page arrow on last page', () => {
    for (let _ = 0; _ < TOTAL_PAGES - 1; _++) {
      wrapper.find('.next-page').simulate('click');
    }

    expect(wrapper.find('.next-page')).toHaveLength(0);
    expect(wrapper.find(ArrowSpacer)).toHaveLength(1);
  });

  it('shows previous page arrow', () => {
    wrapper.find('.next-page').simulate('click');
    expect(wrapper.find('.previous-page')).toHaveLength(1);
  });

  it('hides previous page arrow on first page', () => {
    expect(wrapper.find('.previous-page')).toHaveLength(0);
    expect(wrapper.find(ArrowSpacer)).toHaveLength(1);
  });

  it('calls dismiss function on button click', () => {
    const testDismiss = jest.fn();
    wrapper = shallow(<Tutorial dismiss={testDismiss} />);
    wrapper.find('.dismiss-tutorial').simulate('click');
    expect(testDismiss).toHaveBeenCalledTimes(1);
  });
});
