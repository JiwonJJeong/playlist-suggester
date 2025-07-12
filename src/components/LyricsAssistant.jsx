import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import '../styles/LyricsAssistant.css';
import InputPick from "./InputPick";

const genreOptions = [
  "Pop",
  "Rock",
  "Hip Hop",
  "R&B",
  "Electronic"
];

export default function LyricsAssistant() {
  const [lyrics, setLyrics] = useState("");
  const [mood, setMood] = useState("");
  const [genre, setGenre] = useState([])
  const [feedback, setFeedback] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_NEBIUS_API_KEY;
  const BASE = "https://api.studio.nebius.com/v1";

  const runAll = async () => {
    if (!lyrics.trim()) return;
    let moodContentToAi = "";
    let genreContentToAi = "";
    let evalMetrics = "rhyme & meter, imagery, and authenticity & emotion"
    if (genre.length!=0) {
      genreContentToAi=`The intended genre(s) is ${genre.join(", ")}`
      evalMetrics = "suitability to genre, " + evalMetrics;
    };
    if (mood.trim()) {
      moodContentToAi=`The intended mood or theme is ${mood.trim()}`
      evalMetrics = "clarity of mood, " + evalMetrics;
    };
    if (!API_KEY) {
      alert("🚨 Missing API key! Set VITE_NEBIUS_API_KEY");
      return;
    }

    setLoading(true);
    setFeedback("");
    setImages([]);

    try {
      // Chat/Feedback
      const chatRes = await fetch(`${BASE}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-ai/DeepSeek-V3",
          messages: [
            {
              role: "system",
              content: `You are a songwriting coach. ${moodContentToAi}. ${genreContentToAi}. Evaluate these lyrics for ${evalMetrics} and suggest 3 concrete next steps. Then append a one-sentence prompt for an album-cover image based on this song. --- ${lyrics.trim()}`
            }
          ]
        })
      });
      if (!chatRes.ok) throw new Error(`Chat failed ${chatRes.status}`);
      const chatJson = await chatRes.json();
      const reply = chatJson.choices?.[0]?.message?.content?.trim() || "";
      setFeedback(reply);

      // Derive prompt from feedback
      const sentences = reply.replace(/\n/g, " ")
                             .split(/(?<=[.!?])\s+/)
                             .slice(0, 2)
                             .join(" ");
      const promptText = `Album cover art reflecting: ${sentences}`;

      // Image generation
      const fetches = Array.from({ length: 5 }).map(() =>
        fetch(`${BASE}/images/generations`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ model: "stability-ai/sdxl", prompt: promptText, n: 1, size: "512x512" })
        }).then(async (res) => {
          if (!res.ok) {
            const txt = await res.text();
            throw new Error(`Image gen failed ${res.status}: ${txt}`);
          }
          const { data } = await res.json();
          return data[0]?.url;
        })
      );

      const urls = (await Promise.all(fetches)).filter(Boolean);
      setImages(urls);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. See console.");
    } finally {
      setLoading(false);
    }
  };

  // Render feedback in Accordion for neat display
  const renderFeedback = () => (
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">Feedback & Prompt</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: '#f9f9f9' }}>
        {feedback.split('\n').map((line, i) => {
          if (!line.trim()) return null;
          return <Typography key={i} paragraph>{line}</Typography>;
        })}
      </AccordionDetails>
    </Accordion>
  );

  return (
        <Container maxWidth="md">
          <Paper
            elevation={8}
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
              📝 Lyrics Coach <br></br>+ 🎨 Album Art Generator
            </Typography>


              <TextField
                label="Paste your lyrics"
                required
                multiline
                rows={5}
                fullWidth
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                sx={{
                  my: 3,
                  margin: "0px",
                  "& .MuiInputBase-root": {
                    background: "rgba(30, 27, 75, 0.8)",
                    color: "#e0e0e0",
                    borderRadius: 2,
                    fontFamily: 'inherit',
                  },
                  "& .MuiInputBase-input": {
                    padding: "16px",
                    "&::placeholder": {
                      opacity: 0.7,
                    },
                    "&:focus": {
                      outline: 'none',
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#b0b3c6",
                    fontSize: "1rem",
                    "&.Mui-focused": {
                      color: "#8e54e9",
                    },
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#44465a", //good
                    transition: "border-color 0.2s ease",
                  },
                  "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                      borderColor: "#4350E0", 
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#6366f1",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#8e54e9", //good
                      borderWidth: "2px",
                    },
                  },
                  // Remove default resize handle
                  "& .MuiInputBase-multiline": {
                    resize: "none",
                  },
                }}
                variant="outlined"
              />

              <TextField
                label="Describe mood"
                multiline
                rows={2}
                fullWidth
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                sx={{
                  my: 3,
                  "& .MuiInputBase-root": {
                    background: "rgba(30, 27, 75, 0.8)",
                    color: "#e0e0e0",
                    borderRadius: 2,
                    fontFamily: 'inherit',
                  },
                  "& .MuiInputBase-input": {
                    padding: "16px",
                    "&::placeholder": {
                      opacity: 0.7,
                    },
                    "&:focus": {
                      outline: 'none',
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#b0b3c6",
                    fontSize: "1rem",
                    "&.Mui-focused": {
                      color: "#8e54e9",
                    },
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#44465a",
                    transition: "border-color 0.2s ease",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#6366f1",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#8e54e9",
                      borderWidth: "2px",
                    },
                  },
                  // Remove default resize handle
                  "& .MuiInputBase-multiline": {
                    resize: "none",
                  },
                }}
                variant="outlined"
              />

              <InputPick labelText="Select Genre" options={genreOptions} value={genre} setValue={setGenre}/>


            {/* Update the loading state */}
            <Box textAlign="center">
              <Button
                className={loading ? 'loading-pulse' : ''}
                variant="contained"
                color="primary"
                onClick={runAll}
                disabled={loading || !lyrics.trim()}
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
                {loading ? "Working…" : "Get Feedback & Art"}
              </Button>
            </Box>

            {feedback && (
              <Box className="generated-content" sx={{ mt: 5 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ color: "#f5f5fa", textShadow: "0 1px 4px #23243a" }}
                >
                  🗒️ Feedback & Prompt
                </Typography>
                <Box sx={{ px: 2 }}>{renderFeedback()}</Box>
              </Box>
            )}

            {images.length > 0 && (
              <Box className="generated-content" sx={{ mt: 5 }}>
                <Grid container spacing={3}>
                  {images.map((url, idx) => (
                    <Grid item xs={12} sm={6} md={4} key={idx}>
                      <Card className="image-card"
                        sx={{
                          borderRadius: 3,
                          boxShadow: "0 4px 16px #23243a",
                          background: "linear-gradient(135deg, #23243a 60%, #181824 100%)",
                          color: "#e0e0e0",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={url}
                          alt={`Generated ${idx + 1}`}
                          sx={{
                            objectFit: "cover",
                            borderRadius: 2,
                            border: "2px solid #44465a",
                            background: "#181824",
                          }}
                        />
                        <CardContent>
                          <Typography variant="body2">Image {idx + 1}</Typography>
                          <IconButton
                            className="download-button"
                            onClick={() => downloadImage(url)}
                            sx={{
                              color: "#8e54e9",
                              background: "#23243a",
                              "&:hover": { background: "#181824" },
                            }}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Paper>
        </Container>
  );
}
