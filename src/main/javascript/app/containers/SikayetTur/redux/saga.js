import { all, call, put, takeLatest, select, fork } from 'redux-saga/effects';
import { endpoints } from 'utils/endpoints';
import { toast } from 'react-toastify';
import { SIKAYET_TUR, MUDURLUK_LISTELE } from './constants';
import {
  setSikayetTurListLoadingAction,
  setSikayetTurListDataAction,
  setMudurlukListDataAction,
} from './actions';

export function* getSikayetTurListSaga() {
  yield put(setSikayetTurListLoadingAction(true));
  try {
    const resp = yield call(endpoints.sikayetTurListele);
    yield put(setSikayetTurListDataAction(resp.data));
    yield put(setSikayetTurListLoadingAction(false));
    return resp;
  } catch (error) {
    yield put(setSikayetTurListLoadingAction(false));
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
    return null;
  }
}

export function* kaydetSikayetTurSaga(sikayetTurForm) {
  try {
    const kaydetURL = sikayetTurForm.data.id ? endpoints.sikayetTurGuncelle : endpoints.sikayetTurEkle;
    yield call(kaydetURL, sikayetTurForm.data);
    yield call(getSikayetTurListSaga);
    if (sikayetTurForm.data.id) {
      toast.success('Şikayet Tür başarıyla güncellenmiştir.');
    } else toast.success('Şikayet Tür başarıyla eklenmiştir.');
  } catch (error) {
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
  }
}

export function* getMudurlukListSaga() {
  //yield put(setMudurlukListLoadingAction(true));
  try {
    const resp = yield call(endpoints.mudurlukListele);
    yield put(setMudurlukListDataAction(resp.data));
    //yield put(setMudurlukListLoadingAction(false));
    return resp;
  } catch (error) {
    //yield put(setMudurlukListLoadingAction(false));
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
    return null;
  }
}

export default function* SikayetTurSaga() {
  yield all([
    takeLatest(SIKAYET_TUR.SAVE, kaydetSikayetTurSaga),
    takeLatest(SIKAYET_TUR.GET_LIST, getSikayetTurListSaga),
    takeLatest(MUDURLUK_LISTELE.REQUEST, getMudurlukListSaga),
  ]);
}
