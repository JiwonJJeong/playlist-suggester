import Features from "./AppBar.jsx"
import { Routes, Route, Link, useLocation } from "react-router-dom";

export default function LandingPage(){
    const featureData = [
        {
            title: "Playlist Maker",
            titlealt: "Let's find some songs~~",
            content: [
                {id: 1, text:"ddddd"}
            ],
            link: (<Link 
            to="/validate" 
            className={`nav-link ${location.pathname === '/validate' ? 'active' : ''}`}
          >
            ✨ Inspire Music
          </Link>)
        },
        {
            title: "Lyrics Helper",
            titlealt: "Let's make songs!",
            content: [
                {id: 1, text:"adc"}
            ]
        },
        {
            title: "Accessibility Features",
            titlealt: "Music, for all!",
            content: [
                {id: 1, text:"adc"}
            ]
        }
    ]

    return(
        <Features content={featureData}/>
    )
}