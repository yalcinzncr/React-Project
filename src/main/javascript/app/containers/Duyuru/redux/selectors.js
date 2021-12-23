import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDuyuruDomain = state => state.get('duyuru', initialState);

const makeSelectDuyuruList = () => createSelector(selectDuyuruDomain, substate => substate.duyuruList);

export { makeSelectDuyuruList };
