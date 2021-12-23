import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectKurulusTurDomain = state => state.get('kurulusTur', initialState);

const makeSelectKurulusTurList = () => createSelector(selectKurulusTurDomain, substate => substate.kurulusTurList);

export { makeSelectKurulusTurList };
