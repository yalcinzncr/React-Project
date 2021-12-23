import { CLEAR_STATE, SIKAYET_SABLON, SIKAYET_ALT_KONU, SIKAYET_KONU, SIKAYET_TUR } from './constants';

export const setSikayetSablonListDataAction = data => ({
  type: SIKAYET_SABLON.SET_LIST_DATA,
  data,
});

export const clearStateAction = () => ({
  type: CLEAR_STATE,
});

export const setSikayetSablonListLoadingAction = data => ({
  type: SIKAYET_SABLON.SET_LIST_LOADING,
  data,
});

export const setSikayetAltkonuListDataAction = data => ({
  type: SIKAYET_ALT_KONU.SET,
  data,
});

export const setSikayetKonuListDataAction = data => ({
  type: SIKAYET_KONU.SET,
  data,
});

export const setSikayetTurListDataAction = data => ({
  type: SIKAYET_TUR.SET,
  data,
});


/** Saga Triggers */

export const kaydetSikayetSablonFormAction = data => ({
  type: SIKAYET_SABLON.SAVE,
  data,
});

export const getSikayetSablonListAction = () => ({
  type: SIKAYET_SABLON.GET_LIST,
});

export const getSikayetAltKonuListAction = () => ({
  type: SIKAYET_ALT_KONU.REQUEST,
});

export const getSikayetKonuListAction = () => ({
  type: SIKAYET_KONU.REQUEST,
});

export const getSikayetTurListAction = () => ({
  type: SIKAYET_TUR.REQUEST,
});
