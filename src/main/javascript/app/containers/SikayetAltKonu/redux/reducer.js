import produce from 'immer';
import {
  CLEAR_STATE,
  SIKAYET_ALT_KONU,
  SIKAYET_KONU
} from './constants';

export const initialState = {
  sikayetAltKonuList: { data: [], isLoading: false },
  sikayetKonuList: [],
};

export default (state = initialState, action) =>
  produce(state, draft => {
    const drafted = draft;
    switch (action.type) {
      case CLEAR_STATE: {
        return initialState;
      }
      case SIKAYET_ALT_KONU.SET_LIST_DATA: {
        drafted.sikayetAltKonuList.data = action.data;
        return drafted;
      }
      case SIKAYET_ALT_KONU.SET_LIST_LOADING: {
        drafted.sikayetAltKonuList.isLoading = action.data;
        return drafted;
      }

      case SIKAYET_KONU.SET: {
        drafted.sikayetKonuList = action.data.map(item => ({ key: item.id, text : item.ad, value : item.id }));
        return drafted;
      }
      default: {
        return drafted;
      }
    }
  });
