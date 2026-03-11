import { useState, useEffect } from 'react'
import '../styles/FishingMinigame.css'

const FishingMinigame = ({ playerData, onFinish }) => {
  const FISH_TYPES = [
    { name: 'Minnow', value: 5, chance: 0.5, difficulty: 2 },
    { name: 'Perch', value: 15, chance: 0.3, difficulty: 4 },
    { name: 'Trout', value: 30, chance: 0.15, difficulty: 6 },
    { name: 'Pike', value: 60, chance: 0.05, difficulty: 8 }
  ]

  const [phase, setPhase] = useState('casting') // casting, waiting, hooking, result
  const [message, setMessage] = useState('🎣 Casting your line...')
  const [caughtFish, setCaughtFish] = useState(null)
  const [hookPosition, setHookPosition] = useState(0)
  const [targetZone, setTargetZone] = useState(Math.random() * 80 + 10)
  const [timeLeft, setTimeLeft] = useState(5)
  const [success, setSuccess] = useState(false)

  // Casting phase
  useEffect(() => {
    if (phase === 'casting') {
      const timer = setTimeout(() => {
        setPhase('waiting')
        setMessage('🐟 A fish is biting! Get ready...')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [phase])

  // Waiting phase - fish will bite after random delay
  useEffect(() => {
    if (phase === 'waiting') {
      const timer = setTimeout(() => {
        setPhase('hooking')
        setMessage('🎣 HOOK NOW! Press SPACE!')
      }, 1000 + Math.random() * 2000)
      return () => clearTimeout(timer)
    }
  }, [phase])

  // Hooking phase - timer countdown
  useEffect(() => {
    if (phase === 'hooking') {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0.1) {
            clearInterval(timer)
            handleMissed()
            return 0
          }
          return prev - 0.1
        })
      }, 100)
      return () => clearInterval(timer)
    }
  }, [phase])

  // Animate hook position
  useEffect(() => {
    if (phase === 'hooking') {
      const interval = setInterval(() => {
        setHookPosition(prev => {
          const newPos = prev + (Math.random() - 0.5) * 15
          return Math.max(0, Math.min(100, newPos))
        })
      }, 50)
      return () => clearInterval(interval)
    }
  }, [phase])

  const handleMissed = () => {
    setPhase('result')
    setMessage('💨 The fish got away!')
    setSuccess(false)
  }

  const handleHook = (e) => {
    if (e.code !== 'Space' || phase !== 'hooking') return
    e.preventDefault()

    const distance = Math.abs(hookPosition - targetZone)
    if (distance < 15) {
      // Catch successful!
      let roll = Math.random()
      let caught = null
      
      for (let fish of FISH_TYPES) {
        let bonus = 0.02 * playerData.rodLevel
        if (playerData.skills.includes('luck')) {
          bonus += 0.03
        }
        if (roll < fish.chance + bonus) {
          caught = fish
          break
        }
      }

      if (!caught) {
        caught = FISH_TYPES[0]
      }

      setCaughtFish(caught)
      setPhase('result')
      setMessage(`🐟 You caught a ${caught.name}! Worth $${caught.value}!`)
      setSuccess(true)
    } else {
      handleMissed()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleHook)
    return () => window.removeEventListener('keydown', handleHook)
  }, [phase, hookPosition, targetZone, playerData])

  const handleFinish = () => {
    onFinish(success ? caughtFish : null)
  }

  return (
    <div className="fishing-minigame">
      <div className="fishing-container">
        <h2>🎣 Fishing Minigame</h2>
        
        <div className="message">{message}</div>

        {phase === 'hooking' && (
          <div className="hooking-section">
            <div className="timer">Time Left: {timeLeft.toFixed(1)}s</div>
            
            <div className="hook-bar">
              <div className="target-zone" style={{
                left: `${targetZone}%`,
                width: '15%',
                backgroundColor: '#4CAF50'
              }}></div>
              <div className="hook-indicator" style={{
                left: `${hookPosition}%`
              }}></div>
            </div>
            
            <p className="instruction">Press SPACE when the hook enters the green zone!</p>
          </div>
        )}

        {phase === 'casting' && (
          <div className="animation">
            <div className="casting-animation">🎣</div>
            <p>Casting...</p>
          </div>
        )}

        {phase === 'waiting' && (
          <div className="animation">
            <div className="waiting-animation">💧</div>
            <p>Waiting for a bite...</p>
          </div>
        )}

        {phase === 'result' && (
          <div className="result">
            {success ? (
              <div className="success">
                <div className="celebration">🎉</div>
                <h3>{caughtFish.name}</h3>
                <p className="value">Worth: ${caughtFish.value}</p>
              </div>
            ) : (
              <div className="failure">
                <div className="sad">😢</div>
                <p>Try again!</p>
              </div>
            )}
            <button onClick={handleFinish} className="continue-btn">
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default FishingMinigame
