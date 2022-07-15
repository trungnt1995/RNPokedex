import {actionsTypes} from '../action/types';

// Initial State
const initialState = {
  favorites: [],
};
const favoriteReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionsTypes.ADD_FAVORITE: {
      const newData: any[] = state.favorites;
      newData.push(action.pokemon);
      return {
        ...state,
        favorites: newData,
      };
    }

    case actionsTypes.REMOVE_FAVORITE: {
      const newData: any[] = state.favorites.filter(
        (fav: any) => fav.id !== action.pokemon.id,
      );
      return {
        ...state,
        favorites: newData,
      };
    }

    default: {
      return state;
    }
  }
};
export default favoriteReducer;
