import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>Welcome to CodeAI</h1>
      <p>Start building your project!</p>
      <button onClick={() => setCount((count) => count + 1)}>
        Count: {count}
      </button>
    </div>
  )
}

export default App