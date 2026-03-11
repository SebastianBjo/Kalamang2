import '../styles/Inventory.css'

const Inventory = ({ inventory, onSell }) => {
  const total = inventory.reduce((sum, fish) => sum + fish.value, 0)

  return (
    <div className="inventory">
      <h2>🎒 Inventory</h2>
      {inventory.length === 0 ? (
        <p className="empty">No fish yet. Go fishing!</p>
      ) : (
        <div>
          <div className="fish-list">
            {inventory.map((fish, idx) => (
              <div key={idx} className="fish-item">
                <span className="fish-name">{fish.name}</span>
                <span className="fish-value">${fish.value}</span>
              </div>
            ))}
          </div>
          <div className="inventory-footer">
            <p className="total">Total Value: ${total}</p>
            <button onClick={onSell} className="sell-btn">
              💰 Sell All Fish
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Inventory
