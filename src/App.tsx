import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ViewScreen from './ViewScreen/ViewScreen'
import Keyboard from './keyboard/Keyboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='case'>
      <ViewScreen />
      <Keyboard />
    </div>
    </>
  )
}

export default App
