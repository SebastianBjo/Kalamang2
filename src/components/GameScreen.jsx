import { useState } from 'react'
import '../styles/GameScreen.css'
import GameMap from './GameMap'
import Inventory from './Inventory'
import Shop from './Shop'
import Stats from './Stats'

const GameScreen = ({ playerData, setPlayerData, onStartFishing }) => {
  const [screen, setScreen] = useState('map')

  const movePlayer = (dx, dy) => {
    let newX = playerData.x + dx
    let newY = playerData.y + dy

    if (newX < 0 || newX >= 40 || newY < 0 || newY >= 20) {
      return
    }

    const waterTiles = []
    for (let x = 10; x < 30; x++) {
      for (let y = 7; y < 15; y++) {
        waterTiles.push([x, y])
      }
    }

    const isWater = waterTiles.some(([wx, wy]) => wx === newX && wy === newY)
    if (isWater && !playerData.hasBoat) {
      return
    }

    setPlayerData({ ...playerData, x: newX, y: newY })
  }

  const sellFish = () => {
    const total = playerData.inventory.reduce((sum, fish) => sum + fish.value, 0)
    setPlayerData({
      ...playerData,
      money: playerData.money + total,
      inventory: []
    })
  }

  const buyItem = (itemName) => {
    const prices = {
      'rod_upgrade': 100,
      'boat': 200,
      'skill_luck': 150
    }

    if (playerData.money < prices[itemName]) {
      alert('Not enough money!')
      return
    }

    if (itemName === 'rod_upgrade') {
      setPlayerData({
        ...playerData,
        money: playerData.money - prices[itemName],
        rodLevel: playerData.rodLevel + 1
      })
    } else if (itemName === 'boat') {
      setPlayerData({
        ...playerData,
        money: playerData.money - prices[itemName],
        hasBoat: true
      })
    } else if (itemName === 'skill_luck') {
      setPlayerData({
        ...playerData,
        money: playerData.money - prices[itemName],
        skills: [...playerData.skills, 'luck']
      })
    }
  }

  return (
    <div className="game-screen">
      <div className="game-header">
        <h1>🎣 KalaMang - Fishing Adventure</h1>
        <div className="header-stats">
          <span>💰 ${playerData.money}</span>
          <span>🎣 Rod Lv.{playerData.rodLevel}</span>
          <span>🚤 {playerData.hasBoat ? 'Yes' : 'No'}</span>
          <span>🎒 {playerData.inventory.length} fish</span>
        </div>
      </div>

      <div className="game-content">
        {screen === 'map' && (
          <div className="map-section">
            <GameMap playerData={playerData} />
            <div className="controls">
              <button onClick={() => movePlayer(0, -1)}>⬆️ Up</button>
              <div>
                <button onClick={() => movePlayer(-1, 0)}>⬅️ Left</button>
                <button onClick={() => movePlayer(1, 0)}>Right ➡️</button>
              </div>
              <button onClick={() => movePlayer(0, 1)}>⬇️ Down</button>
            </div>
          </div>
        )}

        {screen === 'inventory' && (
          <Inventory 
            inventory={playerData.inventory}
            onSell={sellFish}
          />
        )}

        {screen === 'shop' && (
          <Shop 
            money={playerData.money}
            rodLevel={playerData.rodLevel}
            hasBoat={playerData.hasBoat}
            onBuy={buyItem}
          />
        )}

        {screen === 'stats' && (
          <Stats playerData={playerData} />
        )}
      </div>

      <div className="game-actions">
        <button 
          onClick={() => setScreen('map')}
          className={screen === 'map' ? 'active' : ''}
        >
          🗺️ Map
        </button>
        <button 
          onClick={() => setScreen('inventory')}
          className={screen === 'inventory' ? 'active' : ''}
        >
          🎒 Inventory
        </button>
        <button 
          onClick={() => setScreen('shop')}
          className={screen === 'shop' ? 'active' : ''}
        >
          🏪 Shop
        </button>
        <button 
          onClick={() => setScreen('stats')}
          className={screen === 'stats' ? 'active' : ''}
        >
          📊 Stats
        </button>
        <button onClick={onStartFishing} className="fish-btn">
          🎣 Fish!
        </button>
      </div>
    </div>
  )
}

export default GameScreen
