import { all, call, put, takeLatest, select, fork } from 'redux-saga/effects';
import { endpoints } from 'utils/endpoints';
import { toast } from 'react-toastify';
import { SIKAYET_SABLON, SIKAYET_ALT_KONU, SIKAYET_KONU, SIKAYET_TUR } from './constants';
import {
  setSikayetSablonListLoadingAction,
  setSikayetSablonListDataAction,
  setSikayetAltkonuListDataAction,
  setSikayetKonuListDataAction,
  setSikayetTurListDataAction,
} from './actions';

export function* getSikayetSablonListSaga() {
  yield put(setSikayetSablonListLoadingAction(true));
  try {
    const resp = yield call(endpoints.sikayetSablonListele);
    yield put(setSikayetSablonListDataAction(resp.data));
    yield put(setSikayetSablonListLoadingAction(false));
    return resp;
  } catch (error) {
    yield put(setSikayetSablonListLoadingAction(false));
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
    return null;
  }
}

export function* kaydetSikayetSablonSaga(sikayetSablonForm) {
  try {
    const kaydetURL = sikayetSablonForm.data.id ? endpoints.sikayetSablonGuncelle : endpoints.sikayetSablonEkle;
    yield call(kaydetURL, sikayetSablonForm.data);
    yield call(getSikayetSablonListSaga);
    if (sikayetSablonForm.data.id) {
      toast.success('Şikayet Şablon başarıyla güncellenmiştir.');
    } else toast.success('Şikayet Şablon başarıyla eklenmiştir.');
  } catch (error) {
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
  }
}

export function* getSikayetAltKonuListSaga() {
  //yield put(setMudurlukListLoadingAction(true));
  try {
    const resp = yield call(endpoints.sikayetAltKonuListele);
    yield put(setSikayetAltkonuListDataAction(resp.data));
    //yield put(setMudurlukListLoadingAction(false));
    return resp;
  } catch (error) {
    //yield put(setMudurlukListLoadingAction(false));
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
    return null;
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

export function* getSikayetTurListSaga() {
  //yield put(setMudurlukListLoadingAction(true));
  try {
    const resp = yield call(endpoints.sikayetTurListele);
    yield put(setSikayetTurListDataAction(resp.data));
    //yield put(setMudurlukListLoadingAction(false));
    return resp;
  } catch (error) {
    //yield put(setMudurlukListLoadingAction(false));
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
    return null;
  }
}

export default function* SikayetSablonSaga() {
  yield all([
    takeLatest(SIKAYET_SABLON.SAVE, kaydetSikayetSablonSaga),
    takeLatest(SIKAYET_SABLON.GET_LIST, getSikayetSablonListSaga),
    takeLatest(SIKAYET_ALT_KONU.REQUEST, getSikayetAltKonuListSaga),
    takeLatest(SIKAYET_KONU.REQUEST, getSikayetKonuListSaga),
    takeLatest(SIKAYET_TUR.REQUEST, getSikayetTurListSaga),
  ]);
}
