import { fromJS } from 'immutable';

import { makeSelectApp, makeSelectLocation } from 'containers/App/redux/selectors';

describe('makeSelectLocation', () => {
  const locationStateSelector = makeSelectLocation();
  it('should select the location', () => {
    const mockedState = fromJS({
      router: { location: { pathname: '/foo' } },
    });
    expect(locationStateSelector(mockedState)).toEqual(mockedState.getIn(['router', 'location']).toJS());
  });
});

describe('makeSelectApp', () => {
  const appSelector = makeSelectApp();
  it('should select the nav', () => {
    const data = {
      navData: [
        {
          id: 1,
          name: 'Anasayfa',
          icon: 'home',
          key: 'home',
          url: '/',
        },
      ],
    };
    const mockedState = fromJS({
      app: data,
    });
    expect(appSelector(mockedState)).toEqual(data);
  });
});
