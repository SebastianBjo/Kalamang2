import '../styles/GameMap.css'

const GameMap = ({ playerData }) => {
  const MAP_WIDTH = 40
  const MAP_HEIGHT = 20
  const WATER_TILES = []
  
  for (let x = 10; x < 30; x++) {
    for (let y = 7; y < 15; y++) {
      WATER_TILES.push([x, y])
    }
  }

  const tiles = []
  for (let y = 0; y < MAP_HEIGHT; y++) {
    for (let x = 0; x < MAP_WIDTH; x++) {
      let tileClass = 'tile grass'
      let emoji = '🌲'

      if (x === playerData.x && y === playerData.y) {
        tileClass = 'tile player'
        emoji = '🧍'
      } else if (WATER_TILES.some(([wx, wy]) => wx === x && wy === y)) {
        tileClass = 'tile water'
        emoji = '🌊'
      }

      tiles.push(
        <div key={`${x}-${y}`} className={tileClass}>
          {emoji}
        </div>
      )
    }
  }

  return (
    <div className="game-map">
      <div className="map-grid" style={{
        gridTemplateColumns: `repeat(${MAP_WIDTH}, 1fr)`
      }}>
        {tiles}
      </div>
    </div>
  )
}

export default GameMap
