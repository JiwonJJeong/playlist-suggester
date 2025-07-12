import { useState } from 'react'
import Disk from "./Disk.jsx"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Disk inputText="hi"></Disk>
      <Disk inputText="bye"></Disk>
      <Disk inputText="Beyonce"></Disk>
      <Disk inputText="Pop"></Disk>
      <Disk inputText="90s"></Disk>
    </>
  )
}

export default App
