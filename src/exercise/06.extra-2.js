// useEffect: HTTP requests
// 💯 use a status
// http://localhost:3000/isolated/exercise/06.js

import React, { useEffect, useState } from 'react'
import {PokemonForm, fetchPokemon, PokemonInfoFallback, PokemonDataView} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = useState(null)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')
  
  useEffect(() => {
    if (!pokemonName) {
      setStatus('idle')
      return
    }
    setPokemon(null)
    setError(null)
    setStatus('pending')
    fetchPokemon(pokemonName).then(
      pokemon => {
        setPokemon(pokemon)
        setStatus('resolved')
      },
      error => {
        setError(error)
        setStatus('rejected')
      },
    )
  }, [pokemonName])
  
  if (status === 'idle') return 'Submit a pokemon'
  if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName}/>
  }
  if (status === 'rejected') {
    return (
      <div role="alert">There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre></div>)
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
