import {GET} from './base';

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export default class API {
  static getPokemonList(params: any) {
    return GET('pokemon/', params);
  }

  static getPokemonDetail(id: any) {
    return GET(`pokemon/${id}`);
  }

  static getPokemonSpecies(name: any) {
    return GET(`pokemon-species/${name}`);
  }

  static getEvolutionChain(id: any) {
    return GET(`evolution-chain/${id}/`);
  }

  static getTypePokemonList(id: any) {
    return GET(`type/${id}/`);
  }
}
