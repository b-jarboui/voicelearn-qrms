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

## Upgrade of 17 November 2026

The chapter grew from 16 to 25 scenes to cover the topic "Introduction to Machine Learning": the kinds of learning, features and labels, train/test split, overfitting, the confusion matrix, four algorithms, cross-validation and the scikit-learn workflow.

New scenes (s17 to s25, in `scenes-c.js`, figures in `data2.js`):

- s17 Three kinds of learning.
- s18 Features and labels, classification and regression (five real visits).
- s19 Split before you fit.
- s20 Overfitting: a real depth curve for 30-day readmissions. Training AUC goes from 0.65 to 1.00; test AUC peaks at 0.71 (depth 4) and falls to 0.56.
- s21 Activity: grow the tree yourself.
- s22 The confusion matrix of the 90-minute rule (605 / 153 / 209 / 4,237; recall 80%, precision 74%).
- s23 Four algorithms.
- s24 Activity: which algorithm wins? Real held-out AUC for readmissions (logistic 0.736 best; random forest 1.000 train, 0.684 test) and complaints (0.932 to 0.949).
- s25 Cross-validation (5 folds, 0.696 to 0.737, mean 0.721) and the scikit-learn workflow.

Figures are from 5,200 visits after removing duplicates, with a 75/25 split stratified on the outcome (random_state 42). The quiz now has 8 questions.

The player now has: a scenes menu, resume, replay, full screen, minutes left, word-by-word captions, scene title cards, a "your turn" badge, an end-of-chapter summary, and a read-along fallback.

`tools/` contains the narration tool (cache `%TEMP%\w11ch1tts`) and the local preview server.