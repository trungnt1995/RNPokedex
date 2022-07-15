import {actionsTypes} from './types';

export const addFavorite = (pokemon: any) => ({
  type: actionsTypes.ADD_FAVORITE,
  pokemon,
});

export const removeFavorite = (pokemon: any) => ({
  type: actionsTypes.REMOVE_FAVORITE,
  pokemon,
});

export const getPokemons = (params: any) => ({
  type: actionsTypes.GET_POKEMONS,
  payload: params,
});

export const getPokemonsSuccess = (params: any) => ({
  type: actionsTypes.GET_POKEMONS_SUCCESS,
  payload: params,
});

export const getPokemonsFail = (params: any) => ({
  type: actionsTypes.GET_POKEMONS_FAIL,
  payload: params,
});

export const getTypePokemons = (params: any) => ({
  type: actionsTypes.GET_TYPE_POKEMONS,
  payload: params,
});

export const getTypePokemonsSuccess = (params: any) => ({
  type: actionsTypes.GET_TYPE_POKEMONS_SUCCESS,
  payload: params,
});

export const getTypePokemonsFail = (params: any) => ({
  type: actionsTypes.GET_TYPE_POKEMONS_FAIL,
  payload: params,
});
