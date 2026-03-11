import '../styles/Stats.css'

const Stats = ({ playerData }) => {
  return (
    <div className="stats">
      <h2>📊 Game Stats</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="label">💰 Money</span>
          <span className="value">${playerData.money}</span>
        </div>
        <div className="stat-card">
          <span className="label">🎣 Rod Level</span>
          <span className="value">{playerData.rodLevel}</span>
        </div>
        <div className="stat-card">
          <span className="label">🚤 Boat</span>
          <span className="value">{playerData.hasBoat ? 'Yes' : 'No'}</span>
        </div>
        <div className="stat-card">
          <span className="label">🎒 Fish Caught</span>
          <span className="value">{playerData.inventory.length}</span>
        </div>
        <div className="stat-card">
          <span className="label">📍 Position</span>
          <span className="value">({playerData.x}, {playerData.y})</span>
        </div>
        <div className="stat-card">
          <span className="label">🍀 Skills</span>
          <span className="value">{playerData.skills.length || 'None'}</span>
        </div>
      </div>
    </div>
  )
}

export default Stats
