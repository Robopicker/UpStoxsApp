const intitialState = {
  data: [],
  cart: {},
  change: 0,
};
export default function reducer(state = intitialState, action) {
  switch (action.type) {
    case 'SAVE_DATA': {
      return {
        ...state,
        data: action.payload,
      };
    }
    case 'CHANGE_VALUE': {
      return {
        ...state,
        change: action.payload,
      };
    }
    case 'ADD_TO_CHECKOUT': {
      const payload = action.payload;
      const deepCopy = {...state.cart};
      deepCopy[payload] = (deepCopy[payload] || 0) + 1;
      return {
        ...state,
        cart: deepCopy,
      };
    }
    default:
      return state;
  }
}
