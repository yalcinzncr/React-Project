import { all, call, put, takeLatest, select, fork } from 'redux-saga/effects';
import { endpoints } from 'utils/endpoints';
import { toast } from 'react-toastify';
import { SIKAYET_ALT_KONU, SIKAYET_KONU } from './constants';
import {
  setSikayetAltKonuListLoadingAction,
  setSikayetAltKonuListDataAction,
  setSikayetKonuListDataAction,
} from './actions';

export function* getSikayetAltKonuListSaga() {
  yield put(setSikayetAltKonuListLoadingAction(true));
  try {
    const resp = yield call(endpoints.sikayetAltKonuListele);
    yield put(setSikayetAltKonuListDataAction(resp.data));
    yield put(setSikayetAltKonuListLoadingAction(false));
    return resp;
  } catch (error) {
    yield put(setSikayetAltKonuListLoadingAction(false));
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
    return null;
  }
}

export function* kaydetSikayetAltKonuSaga(sikayetAltKonuForm) {
  try {
    const kaydetURL = sikayetAltKonuForm.data.id ? endpoints.sikayetAltKonuGuncelle : endpoints.sikayetAltKonuEkle;
    yield call(kaydetURL, sikayetAltKonuForm.data);
    yield call(getSikayetAltKonuListSaga);
    if (sikayetAltKonuForm.data.id) {
      toast.success('Şikayet Alt Konu başarıyla güncellenmiştir.');
    } else toast.success('Şikayet Alt Konu başarıyla eklenmiştir.');
  } catch (error) {
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
  }
}

export function* getSikayetKonuListSaga() {
  //yield put(setMudurlukListLoadingAction(true));
  try {
    const resp = yield call(endpoints.sikayetKonuListele);
    yield put(setSikayetKonuListDataAction(resp.data));
    //yield put(setMudurlukListLoadingAction(false));
    return resp;
  } catch (error) {
    //yield put(setMudurlukListLoadingAction(false));
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
    return null;
  }
}

export default function* SikayetAltKonuSaga() {
  yield all([
    takeLatest(SIKAYET_ALT_KONU.SAVE, kaydetSikayetAltKonuSaga),
    takeLatest(SIKAYET_ALT_KONU.GET_LIST, getSikayetAltKonuListSaga),
    takeLatest(SIKAYET_KONU.REQUEST, getSikayetKonuListSaga),
  ]);
}
