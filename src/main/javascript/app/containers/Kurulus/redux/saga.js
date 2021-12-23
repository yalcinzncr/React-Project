import { all, call, put, takeLatest, select, fork } from 'redux-saga/effects';
import { endpoints } from 'utils/endpoints';
import { toast } from 'react-toastify';
import { KURULUS, KURULUS_TUR } from './constants';
import {
  setKurulusListLoadingAction,
  setKurulusListDataAction,
  setKurulusTurListDataAction,
} from './actions';

export function* getKurulusListSaga() {
  yield put(setKurulusListLoadingAction(true));
  try {
    const resp = yield call(endpoints.kurulusListele);
    yield put(setKurulusListDataAction(resp.data));
    yield put(setKurulusListLoadingAction(false));
    return resp;
  } catch (error) {
    yield put(setKurulusListLoadingAction(false));
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
    return null;
  }
}

export function* kaydetKurulusSaga(kurulusForm) {
  try {
    const kaydetURL = kurulusForm.data.id ? endpoints.kurulusGuncelle : endpoints.kurulusEkle;
    yield call(kaydetURL, kurulusForm.data);
    yield call(getKurulusListSaga);
    if (kurulusForm.data.id) {
      toast.success('Kuruluş başarıyla güncellenmiştir.');
    } else toast.success('Kuruluş başarıyla eklenmiştir.');
  } catch (error) {
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
  }
}

export function* getKurulusTurListSaga() {
  try {
    const resp = yield call(endpoints.kurulusTurListele);
    yield put(setKurulusTurListDataAction(resp.data));
    return resp;
  } catch (error) {
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
    return null;
  }
}

export default function* KurulusSaga() {
  yield all([
    takeLatest(KURULUS.SAVE, kaydetKurulusSaga),
    takeLatest(KURULUS.GET_LIST, getKurulusListSaga),
    takeLatest(KURULUS_TUR.REQUEST, getKurulusTurListSaga),
  ]);
}
