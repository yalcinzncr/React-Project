import { clearStateAction } from '../actions';
import { CLEAR_STATE } from '../constants';

describe('AnaSayfa actions', () => {
  describe('Clear State Action', () => {
    it('has a type of CLEAR_STATE', () => {
      const expected = {
        type: CLEAR_STATE,
      };
      expect(clearStateAction()).toEqual(expected);
    });
  });
});
