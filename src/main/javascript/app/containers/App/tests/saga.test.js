import { put, takeLatest } from 'redux-saga/effects';
import { getNavigationSuccess, getUserInfoSuccess } from '../redux/actions';
import appSaga, { getNavigationSaga, getUserInfoSaga } from '../redux/saga';
import { GET_NAVIGATION, GET_USERINFO } from '../redux/constants';

/* eslint-disable redux-saga/yield-effects */
describe('getNavigationSaga', () => {
  let generator;

  beforeEach(() => {
    generator = getNavigationSaga();

    const callDescriptor = generator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the getNavigationSuccess action if it requests the data successfully', () => {
    const response = {
      data: {
        data: [
          {
            id: 1,
            name: 'Anasayfa',
            icon: 'home',
            key: 'home',
            url: '/',
          },
        ],
      },
    };
    const putDescriptor = generator.next(response).value;
    expect(putDescriptor).toEqual(put(getNavigationSuccess(response.data.data)));
  });
});

describe('getUserInfoSaga', () => {
  let generator;

  beforeEach(() => {
    generator = getUserInfoSaga();

    const callDescriptor = generator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the getUserInfoSuccess action if it requests the data successfully', () => {
    const response = {
      data: {
        a: 'b',
      },
    };
    const putDescriptor = generator.next(response).value;
    expect(putDescriptor).toEqual(put(getUserInfoSuccess(response.data)));
  });
});

describe('navigationSaga nav data', () => {
  const appDataSaga = appSaga();

  it('should load data and watch for GET_NAVIGATION.REQUEST action', () => {
    const takeLatestDescriptor = appDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(GET_NAVIGATION.REQUEST, getNavigationSaga));
  });

  it('should load data and watch for GET_USERINFO.REQUEST action', () => {
    const takeLatestDescriptor = appDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(GET_USERINFO.REQUEST, getUserInfoSaga));
  });
});
