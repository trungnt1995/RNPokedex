import {combineReducers} from 'redux';
import favoriteReducer from './favoriteReducer';
import pokemonReducer from './pokemonReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  favoriteReducer: favoriteReducer,
  pokemonReducer: pokemonReducer,
});
export default rootReducer;
