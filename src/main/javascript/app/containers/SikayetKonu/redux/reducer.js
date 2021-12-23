import produce from 'immer';
import {
  CLEAR_STATE,
  SIKAYET,
  SIKAYET_TUR
} from './constants';

export const initialState = {
  sikayetKonuList: { data: [], isLoading: false },
  sikayetTurList: [],
};

export default (state = initialState, action) =>
  produce(state, draft => {
    const drafted = draft;
    switch (action.type) {
      case CLEAR_STATE: {
        return initialState;
      }
      case SIKAYET.SET_LIST_DATA: {
        drafted.sikayetKonuList.data = action.data;
        return drafted;
      }
      case SIKAYET.SET_LIST_LOADING: {
        drafted.sikayetKonuList.isLoading = action.data;
        return drafted;
      }

      case SIKAYET_TUR.SET: {
        drafted.sikayetTurList = action.data.map(item => ({ key: item.id, text : item.ad, value : item.id }));
        return drafted;
      }
      default: {
        return drafted;
      }
    }
  });
