import Disk from "./Disk.jsx"
import DiskReceiver from "./DiskReceiver.jsx"

export default function PlayerlistMaker({diskStrings,addSelectedInput,setFinalized}){

    return (
        <>
        {diskStrings.map((string) => {
            return <Disk key={string} inputText={string}></Disk>
          })}
          <DiskReceiver addSelectedInput={addSelectedInput} />
          <button onClick={()=>setFinalized(true)} >Let's make the playlist!</button>
          </>
    )
}


