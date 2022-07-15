import {call, put} from 'redux-saga/effects';
import { getPokemonsFail, getPokemonsSuccess, getTypePokemonsSuccess } from '../action/favoriteAction';
import API, {ResponseGenerator} from '../api/request';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* getPokemonList(action: any) {
  try {
    const res: ResponseGenerator = yield call(
      API.getPokemonList,
      action.payload,
    );
    yield put(getPokemonsSuccess(res.data));
  } catch (e) {
    yield put(getPokemonsFail(e));
  }
}

export function* getTypePokemonList(action: any) {
  try {
    const res: ResponseGenerator = yield call(
      API.getTypePokemonList,
      action.payload,
    );
    yield put(getTypePokemonsSuccess(res.data.pokemon));
  } catch (e) {
    yield put(getPokemonsFail(e));
  }
}
