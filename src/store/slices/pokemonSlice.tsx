import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonModel } from '../../models/pokemon.model';
import { PokemonDetailsModel } from '../../models/pokemon-details.model';


interface PokemonState {
  pokemons: PokemonModel[];
  loading: boolean;
  nextUrl: string | null;
  pokemonDetails: PokemonDetailsModel | null;
  isModalOpen: boolean;
}

const initialState: PokemonState = {
  pokemons: [],
  loading: false,
  nextUrl: "https://pokeapi.co/api/v2/pokemon?limit=50",
  pokemonDetails: null,
  isModalOpen: false,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    fetchPokemonsRequest: (state) => {
      state.loading = true;
    },
    fetchPokemonsSuccess: (state, action: PayloadAction<{ results: PokemonModel[], next: string }>) => {
      state.pokemons = [...state.pokemons, ...action.payload.results];
      state.nextUrl = action.payload.next;
      state.loading = false;
    },
    fetchPokemonsFailure: (state) => {
      state.loading = false;
    },
    setPokemonDetails: (state, action: PayloadAction<PokemonDetailsModel>) => {
      state.pokemonDetails = action.payload;
      state.isModalOpen = true;
    },
    clearPokemonDetails: (state) => {
      state.pokemonDetails = null;
      state.isModalOpen = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { 
  fetchPokemonsRequest, 
  fetchPokemonsSuccess, 
  fetchPokemonsFailure, 
  setPokemonDetails, 
  clearPokemonDetails, 
  setLoading 
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
