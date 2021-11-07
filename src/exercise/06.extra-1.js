// useEffect: HTTP requests
// 💯 handle errors
// http://localhost:3000/isolated/exercise/06.js

import React, { useEffect, useState } from 'react'
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    if (!pokemonName) return
    setPokemon(null)
    setError(null)
    fetchPokemon(pokemonName).then(
      pokemonData => setPokemon(pokemonData),
      error => setError(error),
    )
  }, [pokemonName])
  
  if (error) {
    return (
      <div role="alert">There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre></div>)
  }
  if (!pokemonName) return 'Submit a pokemon'
  if (!pokemon) {
    return <PokemonInfoFallback name={pokemonName}/>
  }
  return <PokemonDataView pokemon={pokemon}/>
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
