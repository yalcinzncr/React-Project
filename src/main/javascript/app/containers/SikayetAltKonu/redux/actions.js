import { CLEAR_STATE, SIKAYET_ALT_KONU, SIKAYET_KONU } from './constants';

export const setSikayetAltKonuListDataAction = data => ({
  type: SIKAYET_ALT_KONU.SET_LIST_DATA,
  data,
});

export const clearStateAction = () => ({
  type: CLEAR_STATE,
});

export const setSikayetAltKonuListLoadingAction = data => ({
  type: SIKAYET_ALT_KONU.SET_LIST_LOADING,
  data,
});

export const setSikayetKonuListDataAction = data => ({
  type: SIKAYET_KONU.SET,
  data,
});


/** Saga Triggers */

export const kaydetSikayetAltKonuFormAction = data => ({
  type: SIKAYET_ALT_KONU.SAVE,
  data,
});

export const getSikayetAltKonuListAction = () => ({
  type: SIKAYET_ALT_KONU.GET_LIST,
});

export const getSikayetKonuListAction = () => ({
  type: SIKAYET_KONU.REQUEST,
});
