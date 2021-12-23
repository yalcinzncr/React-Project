import produce from 'immer';
import {
  CLEAR_STATE,
  SIKAYET_DEGERLENDIRME,
} from './constants';

export const initialState = {
  sikayetDegerlendirmeList: { data: [], isLoading: false },
};

export default (state = initialState, action) =>
  produce(state, draft => {
    const drafted = draft;
    switch (action.type) {
      case CLEAR_STATE: {
        return initialState;
      }
      case SIKAYET_DEGERLENDIRME.SET_LIST_DATA: {
        drafted.sikayetDegerlendirmeList.data = action.data;
        return drafted;
      }
      case SIKAYET_DEGERLENDIRME.SET_LIST_LOADING: {
        drafted.sikayetDegerlendirmeList.isLoading = action.data;
        return drafted;
      }
      default: {
        return drafted;
      }
    }
  });
