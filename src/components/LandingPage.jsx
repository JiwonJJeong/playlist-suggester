import Features from "./AppBar.jsx";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import styles from "../styles/LandingPage.module.css";
import bgImage from "../assets/headphones.jpg"

export default function LandingPage() {
  const featureData = [
    {
      title: "🎵 Find Music",
      titlealt: "Playlist Maker",
      arialabel: "Find Music",
      content: [
        {
          id: 1,
          text: "Find songs based on other songs, artists, genre, and time period.",
        },
        { id: 2, text: "Want a mix? Add many in each category!" },
        {
          id: 3,
          text: "Don't care about genre? No problem, only one input needed!",
        },
        { id: 4, text: "What about Mongolian throat singing? Customize your inputs!" },
      ],
      link: { address: "/playlist", text: "🎵 Find Music" },
    },
    {
      title: "✨ Inspire Music",
      titlealt: "Lyrics Suggester",
      arialabel: "Inspire Music",
      content: [
        { id: 1, text: "Write and get inspiriation for all your song lyrics!" },
        {
          id: 3,
          text: "Got a mood in mind? Let's brainstorm together.",
        },
        {
          id: 4,
          text: "Need rhymes for rap? Fit the genre!",
        },
        { id: 5, text: "Browse related images to keep the writing going!" },
      ],
      link: { address: "/validate", text: "✨ Inspire Music" },
    },
  ];

  return (
    <>
      <div
          style={{
            margin: "-72px",
            width: "calc(100%+72px)",
            height: "min-content",
            backgroundImage: `url(${bgImage})`,      
            backgroundPosition: "left bottom",   
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            marginBottom: "50px",
          }}
      >
        <h1 className={styles.gradientHeading}>Music<br></br>Machine</h1>
      </div>
      <Features content={featureData} />
    </>
  );
}
