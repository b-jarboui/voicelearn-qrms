# PHQM830 Week 12 · Chapter 1: Finding groups nobody labelled

An animated, narrated chapter for PHQM830 Quantitative Research Methods and Statistics (HBMSU, Fall 2026), made in the VoiceLearn style. It takes about 15 minutes and is built from the Week 12 slides on clustering and segmentation analysis.

Live: https://b-jarboui.github.io/voicelearn-qrms/week12/chapter1/

## The 18 scenes

1. Welcome: unlabelled episodes, real or invented?
2. Until now there was always an answer key; this week there is none (unsupervised learning).
3. Your turn: which picture has real groups? k-means finds four groups in shuffled noise as well.
4. How k-means works, animated on 240 real episodes.
5. Your turn: run k-means step by step (choose k, Assign, Move, new random start, n_init).
6. Distance by hand: occupancy 400 against staff ratio 0.09.
7. Standardise first: the z-score; the real SDs; the share of distance before and after.
8. Your turn: pick two real episodes and switch between raw and standardised units.
9. The noise floor: shuffle each column, run the same clustering, compare.
10. The silhouette score: distances a and b.
11. The Al Waha file: real against shuffled silhouette for k = 2 to 6.
12. Your turn: choose k and get feedback.
13. The three assumptions, including two moons cut in half (hierarchical clustering or DBSCAN).
14. Naming from the centres: stretched wards and well-resourced wards.
15. Your turn: four sentences you may not write.
16. You decide; ChatGPT assists: a good and a bad helper question.
17. Quiz: five questions with explanations.
18. Four ideas to keep, and the self-paced session.

## Data

- `data.js` holds the real figures from the Al Waha episodes file. It uses 4,740 complete rows on staff_ratio, training_hours, occupancy_pct and handoffs (999 and blanks treated as missing).
- The silhouette table matches the Week 12 slides: real 0.504 against shuffled 0.190 at k = 2.
- Recomputed with scikit-learn 1.8, the file gives 0.511 against 0.188.
- In raw units, occupancy and training hours supply 99% of the distance between two episodes, and staff ratio 0.1%. After standardising, each variable supplies about 25%.

## Files

- `index.html` is the player.
- `chapter.js` holds the narration and the quiz.
- `timings.js` holds the sentence cues.
- `scenes-a.js` and `scenes-b.js` are the animated SVG scenes.
- `audio/` holds the narration, one MP3 per scene. The voice is Gemini TTS, voice Charon.

## Tools (not needed to run the page)

- `tools/tts_gemini.ps1` makes the narration and the timings. The key is read from the user profile and never stored here.
- `tools/align_local.ps1` finds sentence times with the Windows speech recogniser.
- `tools/serve.ps1` serves the page for a local preview.

Five sentence cues in `timings.js` were corrected by hand after a check. They are in s05, s09, s14, s15b and s18. Re-running the TTS tool rewrites `timings.js`, so check these cues again after any re-run.
