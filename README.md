# 🎵 Music Genie

This is a React-based web application that uses OpenAI to generate personalized music playlists based on users' favorite **songs** and **singers**. It leverages Material UI (MUI) for sleek UI components and uses OpenAI's GPT model to generate themed playlists.

---

## Features

* Select favorite **songs** and **singers** from dropdowns
* Generate **3 personalized playlists** with catchy names, descriptions, and songs
* Songs are **linked to YouTube** for quick listening
* Enter the music verses **you** have written, to receive feedback + images that you can use for your album cover!

---

## 🛌 Tech Stack

| Feature                       | Technology Used                     |
| ----------------------------- | ----------------------------------- |
| Frontend Framework            | React.js                            |
| UI Components                 | MUI (Material UI)                   |
| AI Playlist Generation        | OpenAI GPT (gpt-3.5-turbo / gpt-4o) |
| AI Feedback Generation        | DeepSeek-V3 model                   |
| AI Album Image Generation     | Stability-ai sdxl model             |
| Usage of LLMs                 | Nebius Studio for access of LLMs    |

---

## 🔧 Setup Instructions

1. **Clone the repo**

```bash
 git clone https://github.com/JiwonJJeong/playlist-suggester.git
 cd playlist-suggester
```

2. **Install dependencies**

```bash
 npm install
```

3. **Add your OpenAI API key**
   Create a `.env` file in the root:

```env
VITE_NEBIUS_API_KEY=your_key
VITE_OPENAI_API_KEY=your_key
```

4. **Run locally**

```bash
 npm run dev
```

App runs at: `http://localhost:5173`

---

## ✨ Future Improvements

* Chance to upload your music performance audios/videos and we'll analyze to provide improvements + generate variations of music/song/audio you can use to produce your new songs
* Spotify API integration
* Save playlists to user profile (backend)
* Export playlists as PDF or text
* Share via link or QR
* Input your written verse, and receive a quick 4-5 second short audio on how your music song could start (by using HuggingFace Audio Models)

---

## Attributions
Thank you to <a href="https://pixabay.com/users/terydanphiri-364063/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7276511">Terrence Phiri</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7276511">Pixabay</a> for the headphones image.
And to Indian Type Foundry for the beautiful Clash Display font.

## 📝 License

MIT License


### Some verses to test
Falling stars and midnight skies,<br>
You whispered truth behind the lies.<br>
The silence screamed when you let go,<br>
Now I dance with your shadow.

--- 

City lights flicker on my skin,<br>
Running wild where dreams begin.<br>
Radio static, a voice unknown,<br>
I built my world with broken tones.

---

Wake me up with your neon glow,<br>
Heartbeat syncing to the show.<br>
Every step we take, electric fire,<br>
You're the spark, my one desire.