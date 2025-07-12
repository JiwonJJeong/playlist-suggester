import "../styles/DiskReceiver.css"

export default function DiskReceiver({addSelectedInput}){
    function handleDrop(e){
        const data = e.dataTransfer.getData("text/plain");
        addSelectedInput(data);
        e.preventDefault();
      }

      function handleDragOver(e){
        e.preventDefault();
      }

    return (
        <div onDrop={handleDrop} onDragOver={handleDragOver}>
            Drop Here!
        </div>
    )
}