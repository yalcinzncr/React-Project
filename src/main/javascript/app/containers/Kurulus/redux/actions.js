import { CLEAR_STATE, KURULUS, KURULUS_TUR } from './constants';

export const setKurulusListDataAction = data => ({
  type: KURULUS.SET_LIST_DATA,
  data,
});

export const clearStateAction = () => ({
  type: CLEAR_STATE,
});

export const setKurulusListLoadingAction = data => ({
  type: KURULUS.SET_LIST_LOADING,
  data,
});

export const setKurulusTurListDataAction = data => ({
  type: KURULUS_TUR.SET,
  data,
});


/** Saga Triggers */

export const kaydetKurulusFormAction = data => ({
  type: KURULUS.SAVE,
  data,
});

export const getKurulusListAction = () => ({
  type: KURULUS.GET_LIST,
});

export const getKurulusTurListAction = () => ({
  type: KURULUS_TUR.REQUEST,
});
