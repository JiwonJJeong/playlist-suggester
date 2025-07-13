import { Routes, Route, Link, useLocation } from "react-router-dom";
import PlaylistMaker from "./PlaylistMaker.jsx";
import PlaylistPlayer from "./PlaylistPlayer.jsx";
import LyricsAssistant from "./LyricsAssistant.jsx";
import LandingPage from  "./LandingPage.jsx"
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
      <nav className="nav-container" role="navigation">
        <div className="nav-content">
        <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            aria-label="See Features"
          >
            🏠 See Features
          </Link>
          <Link 
            to="/playlist" 
            className={`nav-link ${location.pathname === '/playlist' ? 'active' : ''}`}
            aria-label="Find Music"
          >
            🎵 Find Music
          </Link>
          <Link 
            to="/validate" 
            className={`nav-link ${location.pathname === '/validate' ? 'active' : ''}`}
            aria-label="Inspire Music"
          >
            ✨ Inspire Music
          </Link>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route
            path="/playlist"
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
          <Route path="/" element={<LandingPage/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
