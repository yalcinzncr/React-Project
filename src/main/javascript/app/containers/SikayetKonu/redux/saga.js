import { all, call, put, takeLatest, select, fork } from 'redux-saga/effects';
import { endpoints } from 'utils/endpoints';
import { toast } from 'react-toastify';
import { SIKAYET, SIKAYET_TUR } from './constants';
import {
  setSikayetKonuListLoadingAction,
  setSikayetKonuListDataAction,
  setSikayetTurListDataAction,
} from './actions';

export function* getSikayetKonuListSaga() {
  yield put(setSikayetKonuListLoadingAction(true));
  try {
    const resp = yield call(endpoints.sikayetKonuListele);
    yield put(setSikayetKonuListDataAction(resp.data));
    yield put(setSikayetKonuListLoadingAction(false));
    return resp;
  } catch (error) {
    yield put(setSikayetKonuListLoadingAction(false));
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
    return null;
  }
}

export function* kaydetSikayetKonuSaga(sikayetKonuForm) {
  try {
    const kaydetURL = sikayetKonuForm.data.id ? endpoints.sikayetKonuGuncelle : endpoints.sikayetKonuEkle;
    yield call(kaydetURL, sikayetKonuForm.data);
    yield call(getSikayetKonuListSaga);
    if (sikayetKonuForm.data.id) {
      toast.success('Şikayet Konu başarıyla güncellenmiştir.');
    } else toast.success('Şikayet Konu başarıyla eklenmiştir.');
  } catch (error) {
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
  }
}

export function* getSikayetTurListSaga() {
  try {
    const resp = yield call(endpoints.sikayetTurListele);
    yield put(setSikayetTurListDataAction(resp.data));
    return resp;
  } catch (error) {
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
    return null;
  }
}

export default function* SikayetKonuSaga() {
  yield all([
    takeLatest(SIKAYET.SAVE, kaydetSikayetKonuSaga),
    takeLatest(SIKAYET.GET_LIST, getSikayetKonuListSaga),
    takeLatest(SIKAYET_TUR.REQUEST, getSikayetTurListSaga),
  ]);
}
