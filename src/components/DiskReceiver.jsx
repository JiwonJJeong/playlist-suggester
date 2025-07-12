import "../styles/DiskReceiver.css"

export default function DiskReceiver(){
    function handleDrop(e){
        const data = e.dataTransfer.getData("text/plain");
        console.log(data);
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