import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMudurlukDomain = state => state.get('mudurluk', initialState);

const makeSelectMudurlukList = () => createSelector(selectMudurlukDomain, substate => substate.mudurlukList);

export { makeSelectMudurlukList };
