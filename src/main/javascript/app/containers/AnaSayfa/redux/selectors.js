import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAnaSayfaDomain = state => state.get('anaSayfa', initialState);

const makeSelectAnaSayfa = () => createSelector(selectAnaSayfaDomain, substate => substate);

export { makeSelectAnaSayfa };
