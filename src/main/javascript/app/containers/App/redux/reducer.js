import produce from 'immer';
import { 
  FETCH_KULLANICI, 
  CLEAR_STATE,
} from './constants';
import menu from './menu';

export const initialState = {
  kullanici: {
    data: null,
    roller: [],
    loading: true,
    error: false,
  },
  menu,
};

const navigationReducer = (state = initialState, action) =>
  produce(state, draft => {
    const drafted = draft;
    switch (action.type) {
      case FETCH_KULLANICI.SET: {
        drafted.kullanici.data = action.data;
        return drafted;
      }
      case FETCH_KULLANICI.LOADING: {
        drafted.kullanici.loading = action.data;
        return drafted;
      }
      case FETCH_KULLANICI.ERROR: {
        drafted.kullanici.error = action.data;
        return drafted;
      }
      case CLEAR_STATE: {
        return initialState;
      }
      default: {
        return drafted;
      }
    }
  });

export default navigationReducer;
