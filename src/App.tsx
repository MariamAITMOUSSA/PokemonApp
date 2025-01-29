import React from "react";
import PokemonList from "./components/PokemonList";
import Header from "./sharedComponents/Header";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const App = () => {
  return (
    <>
      <Header></Header>
      <div className="main-container">
        <PokemonList></PokemonList>
      </div>
    </>
  )
};

export default App;
