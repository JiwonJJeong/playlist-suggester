import { Routes, Route, Link, useLocation } from "react-router-dom";
import PlaylistMaker from "./PlaylistMaker.jsx";
import PlaylistPlayer from "./PlaylistPlayer.jsx";
import LyricsAssistant from "./LyricsAssistant.jsx";
import '../styles/App.css';
import { useRef, useState } from "react";

function App() {
  const selectedInputsRef = useRef([]);
  const [isFinalized, setFinalized] = useState(false);
  const [diskStrings, setDiskStrings] = useState(["90s", "Pop", "Classical", "Beyonce", "2000s"]);
  const location = useLocation();

  function addSelectedInput(input) {
    selectedInputsRef.current = [...selectedInputsRef.current, input];
    setDiskStrings(diskStrings.filter((string) => string !== input));
    console.log(selectedInputsRef);
  }

  return (
    <div className="app-container">
      <nav className="nav-container">
        <div className="nav-content">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            🎵 Find Music
          </Link>
          <Link 
            to="/validate" 
            className={`nav-link ${location.pathname === '/validate' ? 'active' : ''}`}
          >
            ✨ Inspire Music
          </Link>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              !isFinalized ? (
                <PlaylistMaker
                  diskStrings={diskStrings}
                  addSelectedInput={addSelectedInput}
                  setFinalized={setFinalized}
                />
              ) : (
                <PlaylistPlayer selectedInputsRef={selectedInputsRef} />
              )
            }
          />
          <Route path="/validate" element={<LyricsAssistant />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
