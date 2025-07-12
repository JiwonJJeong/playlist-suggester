import DiskReceiver from "./DiskReceiver.jsx"
import Disk from "./Disk.jsx"
import '../styles/App.css'

function App() {

  return (
    <>
      <Disk inputText="hi"></Disk>
      <Disk inputText="bye"></Disk>
      <Disk inputText="Beyonce"></Disk>
      <Disk inputText="Pop"></Disk>
      <Disk inputText="90s"></Disk>
      <DiskReceiver />
    </>
  )
}

export default App
