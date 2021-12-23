import React from 'react';
import { mountWithIntl } from 'utils/intl-enzyme-test-helper';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../index';

import configureStore from '../../../configureStore';

describe('<App />', () => {
  let store;

  beforeAll(() => {
    store = configureStore({});
  });
  it('should render the App', () => {
    const dispatch = jest.fn();
    const renderedComponent = mountWithIntl(
      <Provider store={store}>
        <Router>
          <App dispatch={dispatch} />
        </Router>
      </Provider>,
    );
    expect(renderedComponent.exists()).toBe(true);
  });

  it('Navigation collapse', () => {
    const dispatch = jest.fn();
    const wrapper = mountWithIntl(
      <Provider store={store}>
        <Router>
          <App dispatch={dispatch} />
        </Router>
      </Provider>,
    );
    const link = wrapper.find('Header');
    link.prop('navCollapse')();
  });
});
