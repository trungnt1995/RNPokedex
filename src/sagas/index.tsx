import {takeLatest} from 'redux-saga/effects';
import {actionsTypes} from '../action/types';
import {getPokemonList, getTypePokemonList} from './pokemonSagas';

function* mySaga() {
  yield takeLatest(actionsTypes.GET_POKEMONS, getPokemonList);
  yield takeLatest(actionsTypes.GET_TYPE_POKEMONS, getTypePokemonList);
}

export default mySaga;
