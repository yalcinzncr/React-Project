import { all, call, put, takeLatest, select, fork } from 'redux-saga/effects';
import { endpoints } from 'utils/endpoints';
import { toast } from 'react-toastify';
import { KURULUS_TUR } from './constants';
import {
  setKurulusTurListLoadingAction,
  setKurulusTurListDataAction,
} from './actions';

export function* getKurulusTurListSaga() {
  yield put(setKurulusTurListLoadingAction(true));
  try {
    const resp = yield call(endpoints.kurulusTurListele);
    yield put(setKurulusTurListDataAction(resp.data));
    yield put(setKurulusTurListLoadingAction(false));
    return resp;
  } catch (error) {
    yield put(setKurulusTurListLoadingAction(false));
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
    return null;
  }
}

export function* kaydetKurulusTurSaga(kurulusTurForm) {
  try {
    const kaydetURL = kurulusTurForm.data.id ? endpoints.kurulusTurGuncelle : endpoints.kurulusTurEkle;
    yield call(kaydetURL, kurulusTurForm.data);
    yield call(getKurulusTurListSaga);
    if (kurulusTurForm.data.id) {
      toast.success('KurulusTur başarıyla güncellenmiştir.');
    } else toast.success('KurulusTur başarıyla eklenmiştir.');
  } catch (error) {
    const message = error.response ? error.response.data.mesaj.join() : error.message;
    toast.error(message);
  }
}

export default function* KurulusTurSaga() {
  yield all([
    takeLatest(KURULUS_TUR.SAVE, kaydetKurulusTurSaga),
    takeLatest(KURULUS_TUR.GET_LIST, getKurulusTurListSaga),
  ]);
}
