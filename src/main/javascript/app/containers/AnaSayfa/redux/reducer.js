import produce from 'immer';
import { CLEAR_STATE } from './constants';

export const initialState = {};

const anaSayfaReducer = (state = initialState, action) =>
  produce(state, draft => {
    const drafted = draft;
    switch (action.type) {
      case CLEAR_STATE: {
        return initialState;
      }
      default: {
        return drafted;
      }
    }
  });

export default anaSayfaReducer;
