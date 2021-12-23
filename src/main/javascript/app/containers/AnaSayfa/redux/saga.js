// import { call, put, takeLatest } from 'redux-saga/effects';
// import { endpoints } from 'utils/endpoints';
// import { toast } from 'react-toastify';
// import { fetchDataLoadingAction, fetchDataErrorAction, setDataAction } from './actions';
// import { FETCH_DATA } from './constants';

// export function* fetchData(action) {
//   yield put(fetchDataLoadingAction(true));
//   try {
//     const response = yield call(null, action.data);
//     yield put(setDataAction(response.data.data));
//     yield put(fetchDataErrorAction(false));
//   } catch (error) {
//     yield put(fetchDataErrorAction(true));
//   }
//   yield put(fetchDataLoadingAction(false));
// }

// export default function* anaSayfaSaga() {
//   yield takeLatest(FETCH_DATA, fetchData);
// }

export default function* anaSayfaSaga() {
  //
}
