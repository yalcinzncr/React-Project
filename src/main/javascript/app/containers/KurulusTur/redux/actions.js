import {
  CLEAR_STATE,
  KURULUS_TUR
} from './constants';


export const setKurulusTurListDataAction = data => ({
  type: KURULUS_TUR.SET_LIST_DATA,
  data,
});

export const clearStateAction = () => ({
  type: CLEAR_STATE,
});


export const setKurulusTurListLoadingAction = data => ({
  type: KURULUS_TUR.SET_LIST_LOADING,
  data,
});

/** Saga Triggers */

export const kaydetKurulusTurFormAction = data => ({
  type: KURULUS_TUR.SAVE,
  data,
});

export const getKurulusTurListAction = () => ({
  type: KURULUS_TUR.GET_LIST,
});

