import {API_UTILS} from '../views/StocksView/utils';

const initialState = {
  data: {},
  status: API_UTILS.FETCH,
  change: 0,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCHING_DATA': {
      return {
        ...state,
        status: API_UTILS.FETCH,
      };
    }
    case 'SAVE_DATA': {
      const data = action.payload;
      return {
        ...state,
        data,
        status: API_UTILS.SUCCESS,
      };
    }
    case 'CHANGE_VALUE': {
      return {
        ...state,
        change: action.payload,
      };
    }
    case 'DATA_ERROR': {
      return {
        ...state,
        status: API_UTILS.ERROR,
      };
    }
    default:
      return state;
  }
}
