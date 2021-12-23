import produce from 'immer';
import {
  CLEAR_STATE,
  SIKAYET_TUR,
  MUDURLUK_LISTELE
} from './constants';

export const initialState = {
  sikayetTurList: { data: [], isLoading: false },
  mudurlukList: [],
};

export default (state = initialState, action) =>
  produce(state, draft => {
    const drafted = draft;
    switch (action.type) {
      case CLEAR_STATE: {
        return initialState;
      }
      case SIKAYET_TUR.SET_LIST_DATA: {
        drafted.sikayetTurList.data = action.data;
        return drafted;
      }
      case SIKAYET_TUR.SET_LIST_LOADING: {
        drafted.sikayetTurList.isLoading = action.data;
        return drafted;
      }

      case MUDURLUK_LISTELE.SET: {
        drafted.mudurlukList = action.data.map(item => ({ key: item.id, text : item.ad, value : item.id }));
        return drafted;
      }
      default: {
        return drafted;
      }
    }
  });
