import produce from 'immer';
import {
  CLEAR_STATE,
  BANKA_KULLANICI,
  KURULUS
} from './constants';

export const initialState = {
  bankaKullaniciList: { data: [], isLoading: false },
  kurulusList: [],
};

export default (state = initialState, action) =>
  produce(state, draft => {
    const drafted = draft;
    switch (action.type) {
      case CLEAR_STATE: {
        return initialState;
      }
      case BANKA_KULLANICI.SET_LIST_DATA: {
        drafted.bankaKullaniciList.data = action.data;
        return drafted;
      }
      case BANKA_KULLANICI.SET_LIST_LOADING: {
        drafted.bankaKullaniciList.isLoading = action.data;
        return drafted;
      }
      case KURULUS.SET: {
        drafted.kurulusList = action.data.map(item => ({ key: item.id, text : item.ad, value : item.id }));
        return drafted;
      }
      default: {
        return drafted;
      }
    }
  });
