import * as React from 'react';
import PokemonDetailsModal from './PokemonModal';
import { Backdrop, CircularProgress, Paper, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { clearPokemonDetails, setLoading, setPokemonDetails } from '../store/slices/pokemonSlice';
import { PokemonModel } from '../models/pokemon.model';

const PokemonCard = ({ pokemon }: { pokemon: PokemonModel }) => {

  const dispatch = useDispatch();
  const { pokemonDetails, isModalOpen, loading } = useSelector((state: RootState) => state.pokemon);

  const showDetails = async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(pokemon.url);
      const data = await response.json();
      dispatch(
        setPokemonDetails({
          name: pokemon.name,
          sprites: {
            font_default: data.sprites.front_default,
          },
        })
      );
    } catch (error) {
      console.error("Failed to fetch Pokémon:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',

    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
      cursor: 'pointer'
    },

    '&:active': {
      transform: 'scale(0.95)',
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)',
    },
  }));

  if (loading) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  return (
    <React.Fragment>
      <Item onClick={showDetails}>
        {pokemon.name}
      </Item>
      <PokemonDetailsModal
        isOpen={isModalOpen}
        details={pokemonDetails}
        onClose={() => dispatch(clearPokemonDetails())}>
      </PokemonDetailsModal>
    </React.Fragment>
  );
}

export default PokemonCard;