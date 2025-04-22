# Mazer React

A modern, interactive web app for creating, playing, and saving unique musical beats with real-world instrument simulation and secure authentication.

---

## Features

- **Instrument Cluster:** Realistic UI for Piano, Drums, Bass, and Synth with clickable keys/pads and real audio samples.
- **Beat Generator Chatbot:** Describe a beat in natural language and generate unique beats using an AI-powered API.
- **Recording & Playback:** Record your instrument sessions, play back, and download recordings.
- **Save & Reuse Beats:** Save generated beats, play them, and use them with the instrument cluster.
- **Authentication:** Secure login/signup using Firebase Auth (no demo accounts).
- **API Key Security:** API keys are managed securely using environment variables.

---

## Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/Yashasvi-Khatri/mazer-react.git
cd mazer-react
```

### 2. Install Dependencies
```sh
npm install
# or
yarn install
```

### 3. Set Up Environment Variables
Create a `.env` file in the project root:
```env
VITE_UNIQUE_BEAT_API_KEY=your_unique_beat_api_key_here
```
**Note:** The `.env` file is ignored by git for security. Never commit API keys.

### 4. Start the Development Server
```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) in your browser.

---

## Usage
- **Generate a Beat:** Use the Beat Generator to describe and create a custom beat.
- **Play Instruments:** Interact with the instrument cluster to play live sounds.
- **Record & Download:** Record your session and download the audio.
- **Save Beats:** Save generated beats and use them later with instrument playback.

---

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

