import DiskReceiver from "./DiskReceiver.jsx"
import Disk from "./Disk.jsx"
import '../styles/App.css'
import {useRef, useState} from "react";

function App() {
  // Stores an array of input strings like ["90s","Beyonce"]
  // later maybe separate strings by type (decade, artist, genre)
  const selectedInputsRef = useRef([]);

  function addSelectedInput(input){
    selectedInputsRef.current = [...selectedInputsRef.current, input];
    setDiskStrings(diskStrings.filter((string)=> string!=input));
    // transition to show animation should go here
    console.log(selectedInputsRef);
  }
  // consider adding way to remove an input?

  const [diskStrings, setDiskStrings] = useState(["90s", "Pop", "Classical", "Beyonce", "2000s"])

  return (
    <>
      {diskStrings.map((string) => {
        return <Disk inputText={string}></Disk>
      })}
      <DiskReceiver addSelectedInput={addSelectedInput} />
    </>
  )
}

export default App
