import { combineReducers } from 'redux';

const initialState = {
  items: [], // This will store your item data
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  item: itemReducer,
});

export default rootReducer;
