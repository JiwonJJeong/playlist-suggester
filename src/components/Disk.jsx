import "../styles/Disk.css"

export default function Disk({inputText}){
    function handleDragStart(e){
        e.dataTransfer.setData("text/plain", inputText);
      }

    return (
        <figure draggable="true" onDragStart={handleDragStart} className="disk">
            <img>
            </img>
            <figcaption>{inputText}</figcaption>
        </figure>
    )
}