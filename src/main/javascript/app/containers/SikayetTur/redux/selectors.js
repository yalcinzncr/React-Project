import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSikayetTurDomain = state => state.get('sikayetTur', initialState);

const makeSelectSikayetTurList = () => createSelector(selectSikayetTurDomain, substate => substate.sikayetTurList);
const makeSelectMudurlukList = () => createSelector(selectSikayetTurDomain, substate => substate.mudurlukList);

export { makeSelectSikayetTurList, makeSelectMudurlukList };
