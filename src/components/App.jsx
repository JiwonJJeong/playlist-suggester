import DiskReceiver from "./DiskReceiver.jsx"
import PlaylistPlayer from  "./PlaylistPlayer.jsx"
import Disk from "./Disk.jsx"
import '../styles/App.css'
import {useRef, useState} from "react";
import {Link} from "react-router-dom";


function App() {
  // Stores an array of input strings like ["90s","Beyonce"]
  // later maybe separate strings by type (decade, artist, genre)
  const selectedInputsRef = useRef([]);
  const [isFinalized, setFinalized] = useState(false);

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
      {(!isFinalized) ? <>
        {diskStrings.map((string) => {
          return <Disk inputText={string}></Disk>
        })}
        <DiskReceiver addSelectedInput={addSelectedInput} />
        <button onClick={()=>setFinalized(true)} >Let's make the playlist!</button>
        </>
      :
      <PlaylistPlayer selectedInputsRef={selectedInputsRef} />
      }
    </>
  )
}

export default App
