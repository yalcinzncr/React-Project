import {
  CLEAR_STATE,
  DUYURU
} from './constants';


export const setDuyuruListDataAction = data => ({
  type: DUYURU.SET_LIST_DATA,
  data,
});

export const clearStateAction = () => ({
  type: CLEAR_STATE,
});


export const setDuyuruListLoadingAction = data => ({
  type: DUYURU.SET_LIST_LOADING,
  data,
});

/** Saga Triggers */

export const kaydetDuyuruFormAction = data => ({
  type: DUYURU.SAVE,
  data,
});

export const getDuyuruListAction = () => ({
  type: DUYURU.GET_LIST,
});

