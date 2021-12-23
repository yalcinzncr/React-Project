import produce from 'immer';
import {
  CLEAR_STATE,
  SIKAYET_SABLON,
  SIKAYET_ALT_KONU,
  SIKAYET_KONU,
  SIKAYET_TUR,
} from './constants';

export const initialState = {
  sikayetSablonList: { data: [], isLoading: false },
  altKonuList: [],
  konuList: [],
  turList: [],
};

export default (state = initialState, action) =>
  produce(state, draft => {
    const drafted = draft;
    switch (action.type) {
      case CLEAR_STATE: {
        return initialState;
      }
      case SIKAYET_SABLON.SET_LIST_DATA: {
        drafted.sikayetSablonList.data = action.data;
        return drafted;
      }
      case SIKAYET_SABLON.SET_LIST_LOADING: {
        drafted.sikayetSablonList.isLoading = action.data;
        return drafted;
      }

      case SIKAYET_ALT_KONU.SET: {
        drafted.altKonuList = action.data.map(item => ({ key: item.id, text : item.ad, value : item.id }));
        return drafted;
      }
      case SIKAYET_KONU.SET: {
        drafted.konuList = action.data.map(item => ({ key: item.id, text : item.ad, value : item.id }));
        return drafted;
      }
      case SIKAYET_TUR.SET: {
        drafted.turList = action.data.map(item => ({ key: item.id, text : item.ad, value : item.id }));
        return drafted;
      }
      default: {
        return drafted;
      }
    }
  });
