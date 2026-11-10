# PHQM830 Week 11 · Chapter 1: What machine learning is

A narrated, animated chapter for PHQM830 Quantitative Research Methods and Statistics (HBMSU, Fall 2026), in the style of VoiceLearn. It covers Part 1 of the Week 11 deck "Introduction to Machine Learning".

- **Open it:** https://b-jarboui.github.io/voicelearn-qrms/week11/chapter1/
- **What it is:** 16 scenes, about 12 minutes. Each spoken sentence reveals one step of the picture, and captions are shown.
- **Hands-on activities:**
  - Guess where the complaint risk jumps.
  - Try any cut-off on a slider, with real numbers.
  - The accuracy trap: choose between a lazy model and a 90-minute rule.
  - Understanding or predicting?
  - A five-question quiz with explanations and a score, then four takeaways.
- **Data:** the complaint rates and the rule table come from the course dataset (5,204 visits with a valid waiting time).
- **Voice:** Google Gemini text-to-speech (`gemini-3.1-flash-tts-preview`, voice "Charon"). The audio is pre-generated as MP3 files, so students need no key and no account.
- **Files:**
  - `index.html` is the player.
  - `chapter.js` holds the narration and scene text.
  - `timings.js` holds the start time of each sentence.
  - `audio/` holds one MP3 per scene.
  - `tools/` holds the scripts that made the audio. They are kept for re-generation and contain no keys.

To regenerate the audio after editing `chapter.js`, run `tools/tts_gemini.ps1` on Windows. The Gemini key is read from `%USERPROFILE%\.gemini_api_key` and never stored here. The free tier allows 10 requests per model per day.
