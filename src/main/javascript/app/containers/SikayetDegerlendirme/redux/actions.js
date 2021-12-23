import {
  CLEAR_STATE,
  SIKAYET_DEGERLENDIRME
} from './constants';


export const setSikayetDegerlendirmeListDataAction = data => ({
  type: SIKAYET_DEGERLENDIRME.SET_LIST_DATA,
  data,
});

export const clearStateAction = () => ({
  type: CLEAR_STATE,
});


export const setSikayetDegerlendirmeListLoadingAction = data => ({
  type: SIKAYET_DEGERLENDIRME.SET_LIST_LOADING,
  data,
});

/** Saga Triggers */

export const kaydetSikayetDegerlendirmeFormAction = data => ({
  type: SIKAYET_DEGERLENDIRME.SAVE,
  data,
});

export const getSikayetDegerlendirmeListAction = () => ({
  type: SIKAYET_DEGERLENDIRME.GET_LIST,
});

