import produce from 'immer';
import {
  CLEAR_STATE,
  MUDURLUK,
} from './constants';

export const initialState = {
  mudurlukList: { data: [], isLoading: false },
};

export default (state = initialState, action) =>
  produce(state, draft => {
    const drafted = draft;
    switch (action.type) {
      case CLEAR_STATE: {
        return initialState;
      }
      case MUDURLUK.SET_LIST_DATA: {
        drafted.mudurlukList.data = action.data;
        return drafted;
      }
      case MUDURLUK.SET_LIST_LOADING: {
        drafted.mudurlukList.isLoading = action.data;
        return drafted;
      }
      default: {
        return drafted;
      }
    }
  });
