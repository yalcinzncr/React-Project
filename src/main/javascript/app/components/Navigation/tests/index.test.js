import React from 'react';
import { Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, configure } from 'enzyme';
import history from 'utils/history';

import Navigation from '../index';

configure({ adapter: new Adapter() });

const navData = [
  {
    id: 1,
    name: 'Test1',
    icon: 'sitemap',
    key: 'test1',
    url: '/',
  },
  {
    id: 2,
    name: 'Test2',
    icon: 'sitemap',
    key: 'test2',
    child: [
      {
        id: 3,
        name: 'Test2-1',
        icon: 'sitemap',
        key: 'test2-1',
        url: '/test2-1',
      },
    ],
  },
];

describe('Navigation render', () => {
  test('renders', () => {
    const wrapper = shallow(<Navigation data={navData} />);

    expect(wrapper.exists()).toBe(true);
  });

  test('Navigation render if data is null', () => {
    const wrapper = shallow(<Navigation />);

    expect(wrapper.html()).toBeNull();
  });

  it('Navigation item click check', () => {
    const wrapper = shallow(<Navigation data={navData} />);
    const link = wrapper.find('#navItem1');
    expect(link.props().to).toEqual('/');
  });

  it('Navigation item child click check', () => {
    const wrapper = shallow(<Navigation data={navData} />);
    const link = wrapper.find('#navTitle2');
    link.prop('onClick', { index: 1 })();
    wrapper.update();
    expect(wrapper.state('activeIndex')).toEqual(1);
  });

  it('Navigation item child click check return false', () => {
    const wrapper = shallow(<Navigation data={navData} />);
    wrapper.setState({ activeIndex: 1 });
    const link = wrapper.find('#navTitle2');
    link.prop('onClick', { index: 1 })();
    wrapper.update();
    expect(wrapper.state('activeIndex')).toEqual(-1);
  });

  it('Navigation item testid click check', () => {
    const wrapper = mount(
      <Router history={history}>
        <Navigation data={navData} />
      </Router>,
    );
    const link = wrapper.find('[data-testid="navItem3"]').at(0);
    expect(link.props().to).toEqual('/test2-1');
  });
});
