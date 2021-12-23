import { 
    CLEAR_STATE, 
    FETCH_KULLANICI,
 } from './constants';

export const clearStateAction = () => ({ type: CLEAR_STATE });

export const setKullaniciAction = data => ({ type: FETCH_KULLANICI.SET, data });
export const loadingKullaniciAction = data => ({ type: FETCH_KULLANICI.LOADING, data });
export const errorKullaniciAction = data => ({ type: FETCH_KULLANICI.ERROR, data });

/** Saga Actions */
export const fetchKullaniciAction = () => ({ type: FETCH_KULLANICI.REQUEST });


