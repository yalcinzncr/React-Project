import produce from 'immer';
import {
  CLEAR_STATE,
  KURULUS,
  KURULUS_TUR
} from './constants';

export const initialState = {
  kurulusList: { data: [], isLoading: false },
  kurulusTurList: [],
};

export default (state = initialState, action) =>
  produce(state, draft => {
    const drafted = draft;
    switch (action.type) {
      case CLEAR_STATE: {
        return initialState;
      }
      case KURULUS.SET_LIST_DATA: {
        drafted.kurulusList.data = action.data;
        return drafted;
      }
      case KURULUS.SET_LIST_LOADING: {
        drafted.kurulusList.isLoading = action.data;
        return drafted;
      }

      case KURULUS_TUR.SET: {
        drafted.kurulusTurList = action.data.map(item => ({ key: item.id, text : item.ad, value : item.id }));
        return drafted;
      }
      default: {
        return drafted;
      }
    }
  });
