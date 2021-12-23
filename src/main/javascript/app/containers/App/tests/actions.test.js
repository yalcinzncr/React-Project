import { getNavigation, getNavigationSuccess, getUserInfo, getUserInfoSuccess } from '../redux/actions';
import { GET_NAVIGATION, GET_USERINFO } from '../redux/constants';

describe('Navigation actions', () => {
  describe('getNavigation', () => {
    it('should return the correct getNavigation type', () => {
      const expectedResult = {
        type: GET_NAVIGATION.REQUEST,
      };

      expect(getNavigation()).toEqual(expectedResult);
    });
  });

  describe('getNavigationSuccess', () => {
    it('should return the correct getNavigationSuccess type and the passed navigation', () => {
      const data = [];
      const expectedResult = {
        type: GET_NAVIGATION.SUCCESS,
        data,
      };

      expect(getNavigationSuccess(data)).toEqual(expectedResult);
    });
  });

  describe('getUserInfo', () => {
    it('should return the correct getUserInfo type', () => {
      const expectedResult = {
        type: GET_USERINFO.REQUEST,
      };

      expect(getUserInfo()).toEqual(expectedResult);
    });
  });

  describe('getUserInfoSuccess', () => {
    it('should return the correct getUserInfoSuccess type and the passed navigation', () => {
      const data = { a: 'b' };
      const expectedResult = {
        type: GET_USERINFO.SUCCESS,
        data,
      };

      expect(getUserInfoSuccess(data)).toEqual(expectedResult);
    });
  });
});
