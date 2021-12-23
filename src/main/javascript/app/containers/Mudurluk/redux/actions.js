import {
  CLEAR_STATE,
  MUDURLUK
} from './constants';


export const setMudurlukListDataAction = data => ({
  type: MUDURLUK.SET_LIST_DATA,
  data,
});

export const clearStateAction = () => ({
  type: CLEAR_STATE,
});


export const setMudurlukListLoadingAction = data => ({
  type: MUDURLUK.SET_LIST_LOADING,
  data,
});

/** Saga Triggers */

export const kaydetMudurlukFormAction = data => ({
  type: MUDURLUK.SAVE,
  data,
});

export const getMudurlukListAction = () => ({
  type: MUDURLUK.GET_LIST,
});

