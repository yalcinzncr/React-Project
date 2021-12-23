import { all, call, put, takeLatest, select, fork } from 'redux-saga/effects';
import { endpoints } from 'utils/endpoints';
import { toast } from 'react-toastify';
import { BANKA_KULLANICI, KURULUS } from './constants';
import {
  setBankaKullaniciListLoadingAction,
  setBankaKullaniciListDataAction,
  setKurulusListDataAction,
} from './actions';

export function* getBankaKullaniciListSaga() {
  yield put(setBankaKullaniciListLoadingAction(true));
  try {
    const resp = yield call(endpoints.bankaKullaniciListele);
    yield put(setBankaKullaniciListDataAction(resp.data));
    yield put(setBankaKullaniciListLoadingAction(false));
    return resp;
  } catch (error) {
    yield put(setBankaKullaniciListLoadingAction(false));
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
    return null;
  }
}

export function* kaydetBankaKullaniciSaga(bankaKullaniciForm) {
  try {
    const kaydetURL = bankaKullaniciForm.data.id ? endpoints.bankaKullaniciGuncelle : endpoints.bankaKullaniciEkle;
    yield call(kaydetURL, bankaKullaniciForm.data);
    yield call(getBankaKullaniciListSaga);
    if (bankaKullaniciForm.data.id) {
      toast.success('Banka Kullanıcı başarıyla güncellenmiştir.');
    } else toast.success('Banka Kullanıcı başarıyla eklenmiştir.');
  } catch (error) {
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
  }
}

export function* getKurulusListSaga() {
  try {
    const resp = yield call(endpoints.kurulusListele);
    yield put(setKurulusListDataAction(resp.data));
    return resp;
  } catch (error) {
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
    return null;
  }
}


export default function* BankaKullaniciSaga() {
  yield all([
    takeLatest(BANKA_KULLANICI.SAVE, kaydetBankaKullaniciSaga),
    takeLatest(BANKA_KULLANICI.GET_LIST, getBankaKullaniciListSaga),
    takeLatest(KURULUS.REQUEST, getKurulusListSaga),
  ]);
}
