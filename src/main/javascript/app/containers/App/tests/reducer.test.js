import { fromJS } from 'immutable';
import appReducer from '../redux/reducer';
import { getNavigationSuccess, getUserInfoSuccess } from '../redux/actions';
import menu from '../redux/menu';

describe('appReducer', () => {
  let state;

  beforeEach(() => {
    state = fromJS({
      navData: menu.data,
      userInfo: {},
    });
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the getNavigationSuccess action correctly', () => {
    const navigation = [];
    const expectedResult = state.merge({ navData: navigation });
    expect(appReducer(state, getNavigationSuccess(navigation))).toEqual(expectedResult);
  });

  it('should handle the getUserInfoSuccess action correctly', () => {
    const data = { a: 'b' };
    const expectedResult = state.merge({ userInfo: data });
    expect(appReducer(state, getUserInfoSuccess(data))).toEqual(expectedResult);
  });
});
