import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectKurulusDomain = state => state.get('kurulus', initialState);

const makeSelectKurulusList = () => createSelector(selectKurulusDomain, substate => substate.kurulusList);
const makeSelectKurulusTurList = () => createSelector(selectKurulusDomain, substate => substate.kurulusTurList);

export { makeSelectKurulusList, makeSelectKurulusTurList };
