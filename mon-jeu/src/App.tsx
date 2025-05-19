import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { PixiGrid } from './components/PixiGrid'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Ma carte Pokémon personnalisée</h1>
      <PixiGrid />
    </>
  )
}

export default App
