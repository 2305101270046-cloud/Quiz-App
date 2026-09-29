# Quiz App (React Native / Expo)

A simple multiple-choice quiz app built with React Native and Expo.

## Features
- 8 sample questions (edit `questions.js` to add your own)
- Instant feedback (green = correct, red = wrong)
- Progress bar and live score tracking
- Final results screen with percentage and restart option
- Runs on iOS, Android, and Web from the same code

## Setup

1. Install [Node.js](https://nodejs.org/) (LTS version) if you don't have it.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npm start
   ```
   This opens the Expo dev tools. From there you can:
   - Press `w` to run in a web browser
   - Press `a` to run on an Android emulator
   - Press `i` to run on an iOS simulator (Mac only)
   - Scan the QR code with the **Expo Go** app on your phone

## Customizing questions

Open `questions.js` and edit the array. Each question looks like:

```js
{
  question: "What is 2 + 2?",
  options: ["3", "4", "5", "6"],
  correctIndex: 1, // index of the correct answer in "options"
}
```

## Project structure

```
quiz-app/
├── App.js          # Main app UI and quiz logic
├── questions.js     # Quiz question data
├── app.json         # Expo app configuration
├── babel.config.js  # Babel configuration
├── package.json      # Dependencies and scripts
└── assets/           # App icons/images (add your own)
```
