# PHQM830 · Chapter 3 (Week 13): Turning written reviews into variables

An animated, narrated chapter for PHQM830 Quantitative Research Methods and Statistics (HBMSU, Fall 2026), made in the VoiceLearn style. It is Chapter 3 of the course "Machine learning for quality research":
- Chapter 1 is Week 11.
- Chapter 2 is Week 12.
- Chapter 3 is this chapter, Week 13.

It takes about 18 minutes and is built from the Week 13 slides on text analytics.

Live: https://b-jarboui.github.io/voicelearn-qrms/week13/chapter1/

## The 20 scenes

1. Welcome: 5,200 patients wrote something. Can it be measured?
2. What you already have: split first, units decide, running is not measuring.
3. From a sentence to a row of numbers: tokens, stop words, bigrams, the real TF-IDF row.
4. Your turn: four preprocessing choices. 16 real models, each with its vocabulary, held-out R² and top words.
5. TF and IDF on real document counts.
6. Worked by hand: 0.115 against 0.005 (slide 9).
7. Your turn: weigh a real word against "hospital".
8. The word "complain", and why one term is not a finding.
9. Assumptions 1 to 3.
10. Your turn: you read six real reviews, then a general word list reads them. Agreement is 70.7%.
11. Assumptions 4 to 6.
12. Fit on train, transform on test.
13. Your turn: fix the NotFittedError script.
14. Results: text 0.739, operations 0.806, both 0.868, leaked 0.739.
15. Your turn: hunt for leaked words in a complaint model.
16. Read thirty reviews by hand.
17. Four sentences you may not write.
18. You decide; ChatGPT assists.
19. Quiz: five questions.
20. Four ideas to keep, and the self-paced session.

## Data

All figures come from the Al Waha episodes file (`PHQM830_Week11_Dataset.csv`). After removing duplicates there are 5,200 rows. The script on slides 16 and 17 was run with scikit-learn 1.8.

**Reproduced exactly from the slides:**
- 290 terms.
- Held-out R²: 0.739 text, 0.806 operations, 0.868 both, 0.739 leaked.
- 1,163 reviews containing "complain": 73.3 against 73.1.

**Found while building the chapter (not on the slides):**
- The reviews are built from only 30 distinct sentences, which make 580 distinct reviews.
- The token "complain" comes only from "Nothing to complain about." That covers 728 reviews, averaging 85.8. The English stop-word list deletes "nothing", "no" and "not". "I will be making a complaint." becomes the separate token "complaint" (435 reviews, averaging 52.5). This is why "complain" has the largest positive weight.
- The 16 preprocessing settings give held-out R² between 0.733 and 0.740, but the top words change completely.
- For the complaint model, the text AUC is 0.837. Removing "complaint" and "making" leaves it at 0.838. Only 167 of the 761 patients who filed a complaint wrote that sentence.
- The sentiment word list in scene 10 is a small illustrative general-purpose list, not a published lexicon. Its 70.7% agreement is measured against a hand reading of the 30 sentences.

## Files

- `index.html` is the player.
- `chapter.js` holds the narration and the quiz.
- `data.js` holds the real figures.
- `timings.js` holds the sentence cues.
- `scenes-a.js` and `scenes-b.js` are the animated SVG scenes.
- `audio/` holds the narration. The voice is Gemini 2.5 Flash TTS (gemini-2.5-flash-preview-tts), voice Charon. Chapters 1 and 2 used Gemini 3.1 Flash TTS with the same voice; its daily quota was used up on 17 Nov.
- `tools/` holds the narration, alignment and local preview scripts. The key is read from the user profile and is never stored here.

One sentence cue in `timings.js` was corrected by hand after a check: s14, the 5th sentence, at 38.67 s. Re-running the TTS tool rewrites `timings.js`, so check it again after any re-run.
