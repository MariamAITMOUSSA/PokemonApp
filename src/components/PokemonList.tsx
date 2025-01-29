// import { useEffect, useState } from "react";
// import { PokemonModel } from "../models/pokemon.model";
// import PokemonCard from "./PokemonCard";
// import { Backdrop, Box, CircularProgress, Grid2 } from "@mui/material";

// const PokemonList = () => {
//   const [pokemons, setPokemons] = useState<PokemonModel[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [nextUrl, setNextUrl] = useState<string | null>("https://pokeapi.co/api/v2/pokemon?limit=50");

//   const fetchPokemons = async () => {
//     if (!nextUrl) return;

//     setLoading(true);
//     try {
//       const response = await fetch(nextUrl);
//       const data = await response.json();
//       setPokemons((prev) => [...prev, ...data.results]);
//       setNextUrl(data.next);
//     } catch (error) {
//       console.error("Failed to fetch Pokémon:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log('hey from initial fetch !')
//     fetchPokemons();
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop >=
//         document.documentElement.offsetHeight - 50
//       ) {
//         fetchPokemons();
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [loading, nextUrl]);

//   if (loading) return
//   <Backdrop
//     sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
//     open={loading}
//   >
//     <CircularProgress color="inherit" />
//   </Backdrop>
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//         {pokemons.map((pokemon, index) => (
//           <Grid2 key={index} size={{ xs: 2, sm: 4, md: 4 }}>
//             <PokemonCard key={index} pokemon={pokemon}></PokemonCard>
//           </Grid2>
//         ))}
//       </Grid2>
//     </Box>
//   );
// };

// export default PokemonList;
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PokemonCard from './PokemonCard';
import { Backdrop, Box, CircularProgress, Grid } from '@mui/material';
import { fetchPokemonsRequest } from '../store/slices/pokemonSlice';
import { RootState } from '../store/store';

const PokemonList = () => {
  const dispatch = useDispatch();
  const { pokemons, loading } = useSelector((state: RootState) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemonsRequest());
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 50
    ) {
      dispatch(fetchPokemonsRequest());
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <Backdrop open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {pokemons.map((pokemon, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <PokemonCard pokemon={pokemon} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PokemonList;
