import { useState, useEffect } from 'react'
import './App.css'
import GameScreen from './components/GameScreen'
import FishingMinigame from './components/FishingMinigame'

function App() {
  const [gameState, setGameState] = useState('main')
  const [playerData, setPlayerData] = useState({
    x: 10,
    y: 10,
    money: 500,
    inventory: [],
    rodLevel: 1,
    hasBoat: false,
    skills: []
  })

  const updatePlayerData = (newData) => {
    setPlayerData(prev => ({ ...prev, ...newData }))
  }

  const startFishing = () => {
    setGameState('fishing')
  }

  const endFishing = (caught) => {
    if (caught) {
      setPlayerData(prev => ({
        ...prev,
        inventory: [...prev.inventory, caught]
      }))
    }
    setGameState('main')
  }

  return (
    <div className="App">
      {gameState === 'main' && (
        <GameScreen 
          playerData={playerData}
          setPlayerData={updatePlayerData}
          onStartFishing={startFishing}
        />
      )}
      {gameState === 'fishing' && (
        <FishingMinigame 
          playerData={playerData}
          onFinish={endFishing}
        />
      )}
    </div>
  )
}

export default App
