import produce from 'immer';
import {
  CLEAR_STATE,
  DUYURU,
} from './constants';

export const initialState = {
  duyuruList: { data: [], isLoading: false },
};

export default (state = initialState, action) =>
  produce(state, draft => {
    const drafted = draft;
    switch (action.type) {
      case CLEAR_STATE: {
        return initialState;
      }
      case DUYURU.SET_LIST_DATA: {
        drafted.duyuruList.data = action.data;
        return drafted;
      }
      case DUYURU.SET_LIST_LOADING: {
        drafted.duyuruList.isLoading = action.data;
        return drafted;
      }
      default: {
        return drafted;
      }
    }
  });
