import { CLEAR_STATE, SIKAYET_TUR, MUDURLUK_LISTELE } from './constants';

export const setSikayetTurListDataAction = data => ({
  type: SIKAYET_TUR.SET_LIST_DATA,
  data,
});

export const clearStateAction = () => ({
  type: CLEAR_STATE,
});

export const setSikayetTurListLoadingAction = data => ({
  type: SIKAYET_TUR.SET_LIST_LOADING,
  data,
});

export const setMudurlukListDataAction = data => ({
  type: MUDURLUK_LISTELE.SET,
  data,
});


/** Saga Triggers */

export const kaydetSikayetTurFormAction = data => ({
  type: SIKAYET_TUR.SAVE,
  data,
});

export const getSikayetTurListAction = () => ({
  type: SIKAYET_TUR.GET_LIST,
});

export const getMudurlukListAction = () => ({
  type: MUDURLUK_LISTELE.REQUEST,
});
