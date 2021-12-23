import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import Header from '..';

configure({ adapter: new Adapter() });

const site = {
  name: 'name',
};

describe('<Header/>', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header id="header" className="header" site={site} />)
      .dive()
      .dive();
  });

  test('renders', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('sign-out', () => {
    window.location.reload = jest.fn();
    const link = wrapper.find('[icon="sign out"]');
    link.prop('onClick', { index: 1 })();
    wrapper.update();
    expect(window.location.reload).toHaveBeenCalled();
  });
});
