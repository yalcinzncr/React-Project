import produce from 'immer';
import {
  CLEAR_STATE,
  KURULUS_TUR,
} from './constants';

export const initialState = {
  kurulusTurList: { data: [], isLoading: false },
};

export default (state = initialState, action) =>
  produce(state, draft => {
    const drafted = draft;
    switch (action.type) {
      case CLEAR_STATE: {
        return initialState;
      }
      case KURULUS_TUR.SET_LIST_DATA: {
        drafted.kurulusTurList.data = action.data;
        return drafted;
      }
      case KURULUS_TUR.SET_LIST_LOADING: {
        drafted.kurulusTurList.isLoading = action.data;
        return drafted;
      }
      default: {
        return drafted;
      }
    }
  });
