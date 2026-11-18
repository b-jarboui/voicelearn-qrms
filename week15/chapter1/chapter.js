// PHQM830 Week 15 · Chapter 5 "Evidence synthesis and responsible reporting"
// One scene = one audio file. One sentence = one animation step.
// Revised 18 Nov 2026 after an accuracy audit (own reviewers + Copilot GPT-6.1 Sol and Claude Opus 5.5).
window.CHAPTER = {
  course: "PHQM830 Quantitative Research Methods and Statistics",
  week: "Week 15",
  title: "Evidence synthesis and responsible reporting",
  subtitle: "Chapter 5 · Several answers to one question, and the one you would defend",
  scenes: [
    { id: "s01", kind: "title", heading: "Welcome to Week 15", lines: [
      "Welcome to Week 15, the last week of the course.",
      "For fourteen weeks, you asked one question of one dataset: what is related to patient satisfaction at Al Waha?",
      "You now hold several answers to that question. This week, you put them side by side, and choose the one you would defend."
    ]},
    { id: "s02", kind: "term", heading: "The term on one page", lines: [
      "Here is the whole term on one page.",
      "Weeks 1 to 6: what a sample is, what a formula says, what a p value is worth, and how to read your own code.",
      "Weeks 7 to 10: comparisons, lines, adjusted lines, and probabilities.",
      "Weeks 11 to 14: honest scoring, groups nobody labelled, words as variables, and a model whose weights you cannot read.",
      "One dataset throughout. One topic. Today, the answers meet."
    ]},
    { id: "s03", kind: "many", heading: "One topic, many methods", lines: [
      "Look at what you have now, all about the same episodes.",
      "A group comparison. Two regressions. A classifier. A clustering. A text model. And a neural network.",
      "They answer different questions. They assume different things. And they are judged by different standards.",
      "So the question is never: which model is best? It is: which question was I asking, and which result answers it?"
    ]},
    { id: "s04", kind: "five", heading: "One topic, five different questions", lines: [
      "Let us line up five of the term's answers, each to its own question.",
      "Week 7: do short and long waits differ? Yes: satisfaction is sixteen point four points higher after short waits, a large effect. But it says nothing about how much each extra minute matters.",
      "Week 8: how much per ten minutes? Minus three points. But waiting may stand in for other things that come with it.",
      "Week 9: and holding the other five predictors constant? Minus one point two per ten minutes. But only along a straight line.",
      "Week 12: are there profiles at all? Yes: the clusters are clearer than in shuffled data. But they were formed without the outcome, so on their own they say nothing about satisfaction.",
      "Week 14: what is the best prediction? About five points out on an average episode, an M A E of four point nine. But its weights cannot say why.",
      "Read the last column, not the third. What a result cannot say is the column an examiner asks about."
    ]},
    { id: "s05", kind: "match", heading: "Try it: which question does it answer?", wait: true, lines: [
      "Your turn. Each result answers its own question.",
      "Match every result to the question it answers. Then press Continue."
    ]},
    { id: "s06", kind: "slopes", heading: "Minus three, or minus one point two?", lines: [
      "Two numbers from the same data seem to disagree. Waiting goes with three points less satisfaction per ten minutes in Week 8, and only one point two in Week 9.",
      "Week 8 looked at waiting alone. Long waits come with other things: fewer staff, more handoffs, less training. So the minus three also carries whatever travels with waiting.",
      "Week 9 held the other five measured predictors constant. Minus one point two is the association of waiting with satisfaction among otherwise similar episodes. It is still not proof of cause: unmeasured factors remain.",
      "Neither number is wrong. They answer different questions. Your write-up must say which question you asked."
    ]},
    { id: "s07", kind: "agree", heading: "Agreement can be worth nothing", lines: [
      "When several methods agree, it feels like strong evidence. Be careful.",
      "Fit several models that all assume a straight line. They will agree that the effect of occupancy is a straight line.",
      "That is not evidence. None of them could have found anything else.",
      "Now look at methods that could disagree. The banded averages fall steeply after eighty percent occupancy. The Week 14 network, with the other inputs held at typical values, also bends down, after about eighty five percent, though less steeply.",
      "Agreement is evidence only when the methods could have disagreed. And here, the disagreement is worth more than the agreement."
    ]},
    { id: "s08", kind: "mae", heading: "Mean absolute error, by hand", lines: [
      "One more error measure: mean absolute error, M A E. It is the error a reader can act on.",
      "Take the same four example errors as last week, real minus predicted: minus two, one, minus three, and six.",
      "Drop the signs: two, one, three, and six. Add them: twelve. Divide by four: three points.",
      "So M A E is three point zero, and R M S E was three point five four, for the same predictions.",
      "On average, this model is three points out. That is a sentence a manager can use."
    ]},
    { id: "s09", kind: "gap", heading: "Try it: when MAE and RMSE part ways", wait: true, lines: [
      "Your turn. Make one error bigger, and watch the two measures.",
      "M A E counts every point of error equally. R M S E squares the errors first. Watch the gap grow. Then press Continue."
    ]},
    { id: "s10", kind: "both", heading: "Why both, and never only one", lines: [
      "So why report both?",
      "R M S E is never smaller than M A E. They are equal only when every error has the same size. The gap between them tells you how uneven your errors are.",
      "A model with a small M A E can still be badly wrong, now and then. Of these two measures, only R M S E is pulled up by it.",
      "Report both, in the outcome's own units, beside the outcome's standard deviation. An R squared alone does not tell a manager how far off a prediction will be."
    ]},
    { id: "s11", kind: "onesplit", heading: "One split, outside everything", lines: [
      "This week's script fits three models: one predictor, six predictors, and the network.",
      "The most important line is not a model. It is the split, and it happens once, before the loop.",
      "So every model is trained on the same rows, and scored on the same rows.",
      "Two models scored on two different splits cannot be compared fairly. And nothing in the output would ever tell you."
    ]},
    { id: "s12", kind: "luck", heading: "How lucky can a split be?", lines: [
      "How much can the split alone change a score? We tested it.",
      "The same six predictor regression, on the same cleaned data, scored on fifty different random splits.",
      "Nothing changed but the rows that happened to land in the test set. Yet its R M S E moved by almost half a point, from the luckiest split to the unluckiest.",
      "Compare that with the network's R M S E gain on the slides: zero point nine five points. The split alone can move a score by about half of that.",
      "So score every model on the same rows, ideally on several repeated splits, and report how much the difference itself varies."
    ]},
    { id: "s13", kind: "fix", heading: "Try it: a table that looks fine", wait: true, lines: [
      "This script runs. No error, no warning, and a comparison table that looks fine.",
      "But something is wrong. Find the problem, and choose the fix. Then press Continue."
    ]},
    { id: "s14", kind: "search", heading: "Report the search", lines: [
      "There is one more assumption behind every result you report: that it was not picked out of many.",
      "Across this term, you fitted dozens of models. You tried different variables, settings, subgroups, and cleaning rules.",
      "If you report the best of forty analyses as if it were the only one, its effect looks larger, and its p value smaller, than they really are.",
      "So report the search: how many models, variables and subgroups you tried, and which choices you made after seeing the data. Label exploratory findings as exploratory, and confirm them on data you have not used."
    ]},
    { id: "s15", kind: "four", heading: "The four questions that decide it", lines: [
      "So which result will you defend? Four questions decide it, in this order.",
      "One: is your research question explanatory, or predictive? Answer this first. Everything else follows.",
      "Two: was every model scored on the same held-out rows? If not, you do not have a comparison.",
      "Three: is the simplest adequate model materially worse? On the Week 14 table, the network beats the six predictor regression by about seven tenths of a point of M A E, on an outcome whose standard deviation is sixteen.",
      "Four: if your question is explanatory, can you say what each input does? If not, you cannot defend the model as an explanation, however well it scores."
    ]},
    { id: "s16", kind: "defend", heading: "Try it: the result you would defend", wait: true, lines: [
      "Your turn. Choose the kind of research question, and the model you would defend.",
      "Then read the three reasons, none of which is its score. Then press Continue."
    ]},
    { id: "s17", kind: "chapter", heading: "The structure of the analysis chapter", lines: [
      "Now, the chapter you will write. It has five sections, in this order.",
      "Question and design: the construct, the proxy you measured, and why this design. Do not name the construct and then report only the proxy.",
      "Data and screening: every screening decision, with its size, and who was lost. Never just: the data were cleaned.",
      "Method and assumptions: the assumptions table, checked, with what you did when a check failed.",
      "Results: the estimate, its interval, the effect size, the exact p value, and how many tests you ran.",
      "Limitations: what the result cannot support, and what would overturn it.",
      "Every section draws on weeks of this course. That is not a coincidence. The course was ordered to build this chapter."
    ]},
    { id: "s18", kind: "sentences", heading: "Five sentences: may you write them?", split: 1, lines: [
      "Here are five sentences that examiners see every year. Decide for each one: may you write it, or not?",
      "The model achieved eighty five percent accuracy. On what data, and against what base rate?",
      "Analysis showed a significant relationship. How large, in what units, and out of how many tests?",
      "The data were cleaned and analysed. Which decisions, and how many rows did each one remove?",
      "The network performed best and was therefore selected. Best at what, and what did it cost you?",
      "Further research is needed. On what, specifically, and what would it settle?"
    ]},
    { id: "s19", kind: "prompts", heading: "Two prompts, one last time", lines: [
      "Two prompts have followed you all term. Use them one last time.",
      "The verification prompt: which assumptions does this method require, and does my output show I checked each one?",
      "The adversarial prompt: what is the strongest reason this result should not be trusted?",
      "Run the adversarial prompt on your own conclusion, before your supervisor does. Then write the sentence: this conclusion would not survive if.",
      "Whatever the helper says, you write the response. That has been the rule since Week 1."
    ]},
    { id: "s20", kind: "helper", heading: "You decide; ChatGPT assists, for the last time", lines: [
      "This is the last time this table appears.",
      "On the left, what you do: the question, the method, the code, the diagnostics, the assumptions, the interpretation, and checking every claim.",
      "On the right, what the helper may do: explain an error, explain a function, suggest a test, extend code that already works.",
      "Every row on the left has stayed on the left for fifteen weeks. That was the point."
    ]},
    { id: "s21", kind: "quiz", heading: "Chapter quiz: eight questions", wait: true, lines: [
      "Let us finish with eight quick questions. Take your time, and read the explanation after each answer."
    ]},
    { id: "s22", kind: "takeaways", heading: "Five ideas to keep, and the end of the course", lines: [
      "Well done. Here are five ideas to keep, from this chapter and from the course.",
      "One: different methods answer different questions. State the question before you compare any two results.",
      "Two: agreement is evidence only when the methods could have disagreed.",
      "Three: compare models only on the same held-out rows, and report M A E and R M S E in the outcome's own units.",
      "Four: report the search, and write the sentence that would overturn your conclusion.",
      "Five: you decide, and the helper assists. Now go and write the analysis plan for your own research. Good luck."
    ]}
  ],
  quiz: [
    { q: "Week 8 says −3.01 points per 10 minutes of waiting; Week 9 says −1.23. Which is right?",
      o: ["Week 8, because it uses more of the data", "Week 9, because it has a higher R²", "Both: they answer different questions (waiting alone vs holding the other five predictors constant)", "Neither: they disagree, so the data are wrong"], a: 2,
      why: "Week 8 lets waiting carry whatever travels with long waits. Week 9 is the association among otherwise similar episodes. Say which question you asked." },
    { q: "Three linear models all say the occupancy effect is a straight line. What does their agreement show?",
      o: ["Strong evidence of a straight line", "Nothing: none of them could have found anything else", "That the effect is causal", "That occupancy does not matter"], a: 1,
      why: "Agreement is evidence only when the methods could have disagreed. The banded averages and the network could, and both bend down at high occupancy." },
    { q: "Errors −2, 1, −3 and 6. What is the MAE?",
      o: ["3.0", "3.54", "0.5", "12"], a: 0,
      why: "Drop the signs: 2, 1, 3, 6. Sum 12, divided by 4 = 3.0. The RMSE of the same errors is 3.54." },
    { q: "Model A: MAE 4.9, RMSE 6.1. Model B: MAE 4.9, RMSE 9.0. What does the difference tell you?",
      o: ["Nothing: the MAE is the same", "Model B is occasionally very wrong: its errors are much more uneven", "Model B is better", "Model A overfits"], a: 1,
      why: "RMSE squares the errors, so a bigger gap above MAE signals a few large misses. MAE alone would hide them." },
    { q: "A table compares a regression scored on one split with a network scored on another. What is wrong?",
      o: ["Nothing, if both are held-out scores", "The models were not compared on the same rows, so the winner may just have had easier rows", "The network should be scored on training rows", "Only the R² should be compared"], a: 1,
      why: "On our data, the same regression's RMSE moved by almost half a point across 50 random splits. Split once, before fitting anything, and score all models on the same rows." },
    { q: "Your research question is explanatory: which factors go with lower satisfaction? The network beats the regression by about 0.7 MAE points, on an outcome with a standard deviation of 16. Which result do you defend?",
      o: ["The network: it has the best score", "The six-predictor regression: the question is explanatory, it is nearly as accurate, and each coefficient can be read and checked", "Neither", "The one-predictor regression"], a: 1,
      why: "Answer the first question first: explanatory or predictive. For an explanatory question, you need coefficients you can read, check and defend." },
    { q: "Which sentence may you write in a final chapter?",
      o: ["“Analysis showed a significant relationship.”", "“The data were cleaned and analysed.”", "“Each 10 minutes of waiting was associated with 1.23 points lower satisfaction (95% CI …), holding the other five predictors constant; this was one of 40 models fitted, all listed in Appendix B.”", "“Further research is needed.”"], a: 2,
      why: "It gives the size, the units, the adjustment, the interval and the search. The others hide all of that." },
    { q: "What should the limitations section always contain?",
      o: ["An apology for the sample size", "What the result cannot support, and the finding that would overturn it", "A list of every package version", "The phrase “further research is needed”"], a: 1,
      why: "“This conclusion would not survive if …” is often the strongest paragraph in the chapter." }
  ]
};
