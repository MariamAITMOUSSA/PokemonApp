import { call, put, takeLatest, select } from 'redux-saga/effects';
import { fetchPokemonsRequest, fetchPokemonsSuccess, fetchPokemonsFailure } from '../slices/pokemonSlice';
import { RootState } from '../store';
import { PokemonModel } from '../../models/pokemon.model';

interface PokemonApiResponse {
  results: PokemonModel[];
  next: string | null;
}

const fetchPokemonApi = async (url: string): Promise<PokemonApiResponse> => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch Pokémon');
  return response.json();
};

function* fetchPokemonsSaga() {
  try {
    const state: RootState = yield select();
    const nextUrl: string | null = state.pokemon.nextUrl;

    if (!nextUrl) return;

    const data: PokemonApiResponse = yield call(fetchPokemonApi, nextUrl);

    yield put(fetchPokemonsSuccess({
        'results': data.results, 
        'next' : data.next? data.next : ''}));
  } catch (error: any) {
    yield put(fetchPokemonsFailure(error.message));
  }
}

export default function* pokemonSaga() {
  yield takeLatest(fetchPokemonsRequest.type, fetchPokemonsSaga);
}
