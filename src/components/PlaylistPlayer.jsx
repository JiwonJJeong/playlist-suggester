import {useState, useEffect} from "react";

export default function PlaylistPlayer ({selectedInputsRef}){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        fetch("PUT API LINK HERE", {mode: "cors"})
            .then((response)=> {
                if (response.status >= 400) {throw new Error("server error")}
                return response.json();
            })
            .then((response) => /*add stuff here based on what we get back*/ true)
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>
    if (error) return <p>A network error occured.</p>


    return (
        <>
        <h1>hi! This is where the playlist player should go after playlist is produced</h1>
        <p>The selected inputs are... {selectedInputsRef.current}</p>
        </>
    )
}