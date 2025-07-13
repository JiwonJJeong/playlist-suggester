# 🎵 Music Machine

This is a React-based web application that simplifies tailoring music **playlists** and writing purposed, themed **lyrics**. It leverages Material UI for sleek UI components and uses LLMs from OpenAI, DeepSeek, and Stablity AI to generate themed playlists, lyric feedback, and images.


## Features
### Playlist Generator
* Select favorite **songs**, **singers**, **genres**, and **music years** from dropdowns or **custom inputs**
* Generate **3 personalized playlists** with catchy names, descriptions, and songs
* Songs are **linked to YouTube** for quick listening
### Lyrics Coach and Album Art Generator
* Enter **music verses** and, optionally, mood and genre
* Receive **feedback** + **images** that you can use for your album cover!



## 🛌 Tech Stack

| Feature                       | Technology Used                     |
| ----------------------------- | ----------------------------------- |
| Frontend Framework            | React.js                            |
| UI Components                 | MUI (Material UI)                   |
| AI Playlist Generation        | OpenAI GPT (gpt-3.5-turbo / gpt-4o) |
| AI Feedback Generation        | DeepSeek-V3 model                   |
| AI Album Image Generation     | Stability-ai sdxl model             |
| Usage of LLMs                 | Nebius Studio for access of LLMs    |



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


## Accessibility Development Practices
* Accessibility checks performed using **Lighthouse** to ensure WCAG standards.
* Focus on WAI-ARIA for better screen reader support and tab navigation.


## ✨ Future Improvements

* Feat: Upload your music audios/videos and we'll analyze to provide improvements + generate variations of music/song/audio
* Spotify API integration
* Save playlists to user profile (backend)
* Export playlists as PDF or text
* Share via link or QR
* Input your written verse, and receive a quick 4-5 second short audio on how your music song could start (by using HuggingFace Audio Models)


## Attributions
* Thank you to <a href="https://pixabay.com/users/terydanphiri-364063/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7276511">Terrence Phiri</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7276511">Pixabay</a> for the headphones image.
* And to <a href="https://www.fontshare.com/fonts/clash-display">Indian Type Foundry</a> for the beautiful Clash Display font.

## 📝 License

MIT License


## Some verses to test
Falling stars and midnight skies,<br>
You whispered truth behind the lies.<br>
The silence screamed when you let go,<br>
Now I dance with your shadow.

___

City lights flicker on my skin,<br>
Running wild where dreams begin.<br>
Radio static, a voice unknown,<br>
I built my world with broken tones.

___

Wake me up with your neon glow,<br>
Heartbeat syncing to the show.<br>
Every step we take, electric fire,<br>
You're the spark, my one desire.