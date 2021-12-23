import { CLEAR_STATE, SIKAYET, SIKAYET_TUR } from './constants';

export const setSikayetKonuListDataAction = data => ({
  type: SIKAYET.SET_LIST_DATA,
  data,
});

export const clearStateAction = () => ({
  type: CLEAR_STATE,
});

export const setSikayetKonuListLoadingAction = data => ({
  type: SIKAYET.SET_LIST_LOADING,
  data,
});

export const setSikayetTurListDataAction = data => ({
  type: SIKAYET_TUR.SET,
  data,
});


/** Saga Triggers */

export const kaydetSikayetKonuFormAction = data => ({
  type: SIKAYET.SAVE,
  data,
});

export const getSikayetKonuListAction = () => ({
  type: SIKAYET.GET_LIST,
});

export const getSikayetTurListAction = () => ({
  type: SIKAYET_TUR.REQUEST,
});
