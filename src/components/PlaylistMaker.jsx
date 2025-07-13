import React, { useState } from "react";
import InputPick from "./InputPick.jsx"
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  Container,
} from "@mui/material";

const songOptions = [
  "Bad Guy",
  "Blinding Lights",
  "Counting Stars",
  "Kesariya",
  "Let Her Go",
  "Levitating",
  "Perfect",
  "Photograph",
  "Shape of You",
  "Tum Hi Ho",
];

const singerOptions = [
  "Adele",
  "Arijit Singh",
  "Billie Eilish",
  "Coldplay",
  "Doja Cat",
  "Drake",
  "Ed Sheeran",
  "Shreya Ghoshal",
  "Taylor Swift",
  "The Weeknd",
];

const genreOptions = [
  "Classical",
  "Country",
  "Electronic",
  "Hip Hop",
  "Jazz",
  "Pop",
  "R&B",
  "Rock",
];

const decadeOptions = [
  "1930s",
  "1940s",
  "1950s",
  "1960s",
  "1970s",
  "1980s",
  "1990s",
  "2000s",
  "2010s",
  "2020s",
]

export default function PlaylistMaker() {
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [selectedSingers, setSelectedSingers] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedDecades, setSelectedDecades] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  const generatePlaylists = async () => {

    if (!API_KEY) {
      alert("Missing OpenAI API key in .env");
      return;
    }

    setLoading(true);
    setPlaylists([]);

    const songsText = selectedSongs.join(", ");
    const singersText = selectedSingers.join(", ");
    const genresText = selectedGenre.join(", ");
    const decadesText = selectedDecades.join(", ");
    const prompt = `
${songsText !== "" ? "Their favorite songs include " + songsText: ""}
${singersText !=="" ? "Their favorite singers include " + singersText: ""}
${genresText !=="" ? "Their favorite genres include " + genresText: ""}
${decadesText !=="" ? "Their favorite decades include " + decadesText: ""}
Suggest 3 playlists. Each should include:
- A catchy name
- A short description
- A list of 5 songs that fit the theme and vibe.
`;

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a music recommendation AI that generates themed playlists based on songs and favorite singers.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
        }),
      });

      if (res.status === 401) throw new Error("401 Unauthorized – check your OpenAI API key");
      const data = await res.json();
      const text = data.choices?.[0]?.message?.content || "";
      const chunks = text.split(/(?=Playlist|\u{1F3B5}|\u{1F389})/u);
      setPlaylists(chunks);
    } catch (err) {
      console.error("❌ Playlist generation failed:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <Container maxWidth="md">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: "24px",
            background: "rgba(30, 27, 75, 0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            align="center"
            aria-label="Playlist Generator"
            sx={{
              color: "#fff",
              fontWeight: 700,
              background: "linear-gradient(90deg, #6366f1 0%, #ec4899 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 4,
            }}
          >
            🎵 Playlist Generator
          </Typography>

          <InputPick labelText="Favorite Song" options={songOptions} value={selectedSongs} setValue={setSelectedSongs}/>
          <InputPick labelText="Favorite Singer" options={singerOptions} value={selectedSingers} setValue={setSelectedSingers}/>
          <InputPick labelText="Favorite Genre" options={genreOptions} value={selectedGenre} setValue={setSelectedGenre}/>
          <InputPick labelText="Favorite Music Year" options={decadeOptions} value={selectedDecades} setValue={setSelectedDecades}/>

          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Button
              onClick={generatePlaylists}
              aria-label="Generate Playlists"
              variant="contained"
              disabled={loading || (selectedSongs.length ==0 && selectedSingers.length ==0
                && selectedGenre.length ==0 && selectedDecades.length ==0)}
              startIcon={loading && <CircularProgress size={20} />}
              sx={{
                py: 1.5,
                px: 6,
                fontSize: "1.1rem",
                background: "linear-gradient(90deg, #6366f1 0%, #ec4899 100%)",
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 600,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(99, 102, 241, 0.3)",
                },
              }}
            >
              {loading ? "Creating Magic..." : "Generate Playlists ✨"}
            </Button>
          </Box>

          {playlists.length > 0 && (
            <Box mt={4}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  textAlign: "center",
                  mb: 3,
                }}
              >
                🎧 Your Custom Playlists
              </Typography>
              {playlists.map((chunk, idx) => (
                <Paper
                  key={idx}
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: "16px",
                    backgroundColor: "rgba(15, 23, 42, 0.6)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  {chunk.split("\n").map((line, i) => {
                    const match = line.match(/^\d+\.\s(.+)/);
                    if (match) {
                      const song = match[1].trim();
                      const encoded = encodeURIComponent(song);
                      const url = `https://www.youtube.com/results?search_query=${encoded}`;
                      return (
                        <Typography
                          key={i}
                          sx={{
                            pl: 2,
                            color: "rgba(255, 255, 255, 0.9)",
                            py: 0.5,
                          }}
                        >
                          {line.split(".")[0]}.{" "}
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "#6366f1",
                              textDecoration: "none",
                              transition: "color 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.color = "#ec4899";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.color = "#6366f1";
                            }}
                          >
                            {song}
                          </a>
                        </Typography>
                      );
                    }
                    return (
                      <Typography
                        key={i}
                        sx={{
                          color: "rgba(255, 255, 255, 0.9)",
                          fontWeight: i === 0 ? 600 : 400,
                          fontSize: i === 0 ? "1.2rem" : "1rem",
                          mb: 1,
                        }}
                      >
                        {line}
                      </Typography>
                    );
                  })}
                  <Divider sx={{ mt: 2, opacity: 0.2 }} />
                </Paper>
              ))}
            </Box>
          )}
        </Paper>
      </Container>
  );
}
