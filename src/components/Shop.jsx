import '../styles/Shop.css'

const Shop = ({ money, rodLevel, hasBoat, onBuy }) => {
  const items = [
    {
      id: 'rod_upgrade',
      name: '🎣 Rod Upgrade',
      price: 100,
      desc: 'Increases your chance to catch better fish',
      available: true
    },
    {
      id: 'boat',
      name: '🚤 Boat',
      price: 200,
      desc: 'Lets you travel on water',
      available: !hasBoat
    },
    {
      id: 'skill_luck',
      name: '🍀 Luck Skill',
      price: 150,
      desc: 'Adds a bonus to catch rare fish',
      available: true
    }
  ]

  return (
    <div className="shop">
      <h2>🏪 Shop</h2>
      <p className="balance">Your Money: ${money}</p>
      <div className="shop-items">
        {items.map(item => (
          <div key={item.id} className="shop-item">
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <p className="price">${item.price}</p>
            </div>
            <button
              onClick={() => onBuy(item.id)}
              disabled={money < item.price || !item.available}
              className="buy-btn"
            >
              {!item.available ? 'Owned' : 'Buy'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Shop
