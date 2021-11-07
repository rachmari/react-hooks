// useEffect: HTTP requests
// 💯 store the state in an object
// http://localhost:3000/isolated/exercise/06.js

import React, { useEffect, useState } from 'react'
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = useState({
    pokemon: null, 
    error: null, 
    status: 'idle'
  })
  
  useEffect(() => {
    if (!pokemonName) {
      setState({status: 'idle'})
      return
    }
    setState({
      pokemon: null, 
      error: null, 
      status: 'pending'
    })
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({pokemon, status: 'resolved'})
      },
      error => {
        setState({error, status: 'rejected'})
      },
    )
  }, [pokemonName])
  
  if (state.status === 'idle') {
    return 'Submit a pokemon'
  }
  if (state.status === 'pending') {
    return 'Loading...'
  }
  if (state.status === 'rejected') {
    return (
      <div role="alert">There was an error: <pre style={{whiteSpace: 'normal'}}>{state.error.message}</pre></div>)
  }

  return state.pokemon 
    ? <PokemonDataView pokemon={state.pokemon}/>
    : <PokemonInfoFallback name={pokemonName}/>
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
