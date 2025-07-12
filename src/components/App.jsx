import PlaylistMaker from "./PlaylistMaker.jsx"
import PlaylistPlayer from  "./PlaylistPlayer.jsx"
import '../styles/App.css'
import {useRef, useState} from "react";


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
      {(!isFinalized) ? 
      <PlaylistMaker diskStrings={diskStrings} addSelectedInput={addSelectedInput} setFinalized={setFinalized}></PlaylistMaker>
      :
      <PlaylistPlayer selectedInputsRef={selectedInputsRef} />
      }
    </>
  )
}

export default App
