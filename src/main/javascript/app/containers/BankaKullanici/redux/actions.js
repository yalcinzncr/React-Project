import {
  CLEAR_STATE,
  BANKA_KULLANICI,
  KURULUS
} from './constants';


export const setBankaKullaniciListDataAction = data => ({
  type: BANKA_KULLANICI.SET_LIST_DATA,
  data,
});

export const clearStateAction = () => ({
  type: CLEAR_STATE,
});


export const setBankaKullaniciListLoadingAction = data => ({
  type: BANKA_KULLANICI.SET_LIST_LOADING,
  data,
});

export const setKurulusListDataAction = data => ({
  type: KURULUS.SET,
  data,
});

/** Saga Triggers */

export const kaydetBankaKullaniciFormAction = data => ({
  type: BANKA_KULLANICI.SAVE,
  data,
});

export const getBankaKullaniciListAction = () => ({
  type: BANKA_KULLANICI.GET_LIST,
});

export const getKurulusListAction = () => ({
  type: KURULUS.REQUEST,
});

