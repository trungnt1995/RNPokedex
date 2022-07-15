import {actionsTypes} from '../action/types';

// Initial State
const initialState = {
  pokemons: [],
  total: 0,
  typePokemons: [],
  typePokemonsCount: 0,
};
const pokemonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionsTypes.GET_POKEMONS_SUCCESS: {
      const {results, count} = action.payload;
      return {
        ...state,
        pokemons: results,
        total: count,
      };
    }

    case actionsTypes.GET_TYPE_POKEMONS_SUCCESS: {
      return {
        ...state,
        typePokemons: action.payload.map((pokemon: any) => pokemon.pokemon),
        typePokemonsCount: action.payload.length,
      };
    }

    default: {
      return state;
    }
  }
};
export default pokemonReducer;
