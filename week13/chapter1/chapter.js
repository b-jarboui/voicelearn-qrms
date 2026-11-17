// PHQM830 Week 13 · Chapter 1 "Turning written reviews into variables"
// One scene = one audio file. One sentence = one animation step.
window.CHAPTER = {
  course: "PHQM830 Quantitative Research Methods and Statistics",
  week: "Week 13",
  title: "Turning written reviews into variables",
  subtitle: "Chapter 1 of text analytics",
  scenes: [
    { id: "s01", kind: "title", heading: "Welcome to Week 13", lines: [
      "Welcome to Week 13. Five thousand two hundred patients at Al Waha wrote a few sentences about their visit.",
      "This week, we ask a simple question: can those sentences be measured, and used as variables?"
    ]},
    { id: "s02", kind: "recap", heading: "What you already have", lines: [
      "Three ideas from the last two weeks come with us. First, split before you fit, and score on rows the model has never seen.",
      "Second, the units of a variable decide how much it counts.",
      "Third, a model that runs perfectly can still be measuring nothing.",
      "Today, the data arrives as sentences instead of numbers. Nothing about the statistics changes."
    ]},
    { id: "s03", kind: "tokens", heading: "From a sentence to a row of numbers", lines: [
      "Here is a real review, written ninety nine times in the file: The staff were outstanding. Nothing to complain about.",
      "First, the computer cuts it into words, and makes every letter lower case.",
      "Next, it throws away stop words, the small words like the, were, and to. Watch which words go. Nothing goes too.",
      "Then it can keep pairs of neighbouring words as well, called bigrams, like staff outstanding.",
      "Each word or pair that survives becomes a column, and this review becomes one row of numbers. A text feature is a variable like any other."
    ]},
    { id: "s04", kind: "choices", heading: "Try it: four choices, and the results move", wait: true, lines: [
      "Between the raw sentence and the variable, there are four decisions, and every one of them is yours.",
      "Switch them on and off: lower case, stop words, word pairs, and dropping rare words. Each setting is a real model, scored on thirteen hundred reviews it has never seen.",
      "Watch the score, and then watch the top words. Then press Continue."
    ]},
    { id: "s05", kind: "tfidf", heading: "Frequent, and distinctive", lines: [
      "Now, how much should each word count? The method we use is called TF-IDF.",
      "TF means term frequency. Count how often the word appears in this review.",
      "IDF means inverse document frequency. Ask how many of all the reviews contain the word at all.",
      "Hospital appears in almost thirteen hundred of our five thousand two hundred reviews. Disappointing appears in only three hundred and fifty three.",
      "So a word that is everywhere gets almost no weight, and a word found in only a few reviews gets a lot. That is the whole idea."
    ]},
    { id: "s06", kind: "formula", heading: "Same count, twenty times the weight", lines: [
      "Let us work one by hand. A review has sixty words, and the word disappointing appears three times. So the term frequency is three divided by sixty, which is zero point zero five.",
      "Disappointing appears in five hundred of five thousand reviews. The natural log of five thousand over five hundred is the log of ten, which is two point three.",
      "Multiply them: zero point zero five times two point three gives zero point one one five.",
      "Now take hospital, which appears in four and a half thousand of the five thousand reviews. Its log is only zero point one, so the same three appearances give zero point zero zero five.",
      "Same count, about twenty times the weight. A word that is everywhere distinguishes nothing."
    ]},
    { id: "s07", kind: "weigh", heading: "Try it: weigh a word", wait: true, lines: [
      "Now weigh some real words from the Al Waha reviews.",
      "Choose a word, set how often it appears in a review, and compare its weight with hospital. Then press Continue."
    ]},
    { id: "s08", kind: "complain", heading: "The word complain: why one term is not a finding", lines: [
      "Here is a puzzle. In our satisfaction model, the word with the largest positive weight is complain. Read alone, that looks absurd.",
      "Some form of the word appears in one thousand one hundred and sixty three reviews. Those episodes average seventy three point three in satisfaction. All the others average seventy three point one. On its own, the word seems to carry nothing.",
      "So read the sentences. Seven hundred and twenty eight reviews say: Nothing to complain about. Those patients average eighty five point eight.",
      "Four hundred and thirty five say: I will be making a complaint. They average fifty two point five, and the computer counts that as a different word, complaint.",
      "And remember the stop words: the word nothing was thrown away. So the model only sees complain, and here that word means a happy patient. A single coefficient from a text model is never the meaning of a word."
    ]},
    { id: "s09", kind: "assume1", heading: "The assumptions, part one", lines: [
      "Text analytics has six assumptions. Here are the first three.",
      "One: your preparation choices change the result. So record them, lower case, stop words, word pairs, rare words, and fix them before you compare anything.",
      "Two: frequent is not the same as important. If hospital and staff top every list, use TF-IDF, and extend the stop word list for this collection of reviews.",
      "Three: a sentiment model trained somewhere else may not transfer. Read a sample by hand, compare it with the model, and report the agreement rate."
    ]},
    { id: "s10", kind: "readit", heading: "Try it: you read, the word list reads", split: 2, lines: [
      "Let us test assumption three. Here are six real reviews from the file.",
      "Read each one, and label it positive, mixed, or negative. A general purpose sentiment word list will then read the same six.",
      "Now compare. The word list counts good words and bad words, and it has never seen a hospital review.",
      "It counts complain as a bad word, so Nothing to complain about scores negative. And it counts improve as a good word, so This needs to improve scores positive.",
      "Across all five thousand two hundred reviews, the word list agreed with a careful human reading only about seven times in ten. That agreement rate is what you report."
    ]},
    { id: "s11", kind: "assume2", heading: "The assumptions, part two", lines: [
      "Here are the other three assumptions, and two of them are unique to text.",
      "Four: the people who wrote the text are not everyone in your sample. Often the reviews come from the most delighted and the most angry. Report the coverage, and say whose voice you are analysing.",
      "Five: a feature built from text can contain the outcome. A patient who writes I will be making a complaint has partly told you the answer already.",
      "Six: text features still need honest held-out evaluation, and that has a trap of its own. Let us look at it."
    ]},
    { id: "s12", kind: "pipeline", heading: "Fit on train, transform on test", lines: [
      "First, split. Three thousand nine hundred reviews go to training, and thirteen hundred are locked away for testing.",
      "Then the vectoriser reads the training reviews only, and learns its vocabulary. This is fit transform. Here it learns two hundred and ninety terms.",
      "Next, the test reviews pass through that same vocabulary, without learning anything new. This is transform. A word the training reviews never used is simply ignored.",
      "The classic mistake is to fit the vectoriser on all the reviews before the split. Then the test rows help choose the very features they are scored with.",
      "The order is the method. Fit transform on the training rows, and transform on the test rows."
    ]},
    { id: "s13", kind: "fix", heading: "Try it: fix a broken script", wait: true, lines: [
      "This script will not run. Read the error before you change anything.",
      "Find the line that causes it, and choose the fix. Then press Continue."
    ]},
    { id: "s14", kind: "results", heading: "Three feature sets, one held-out test", lines: [
      "Here is the honest result, on the same thirteen hundred test episodes. The review text alone explains seventy four percent of the variation in satisfaction. That is an R squared of zero point seven three nine.",
      "The six operational measures, everything the hospital recorded, reach zero point eight zero six.",
      "Both together reach zero point eight six eight. So the text adds about six points on top of everything the hospital measured.",
      "And with the vectoriser leaked, fitted on all the rows? Also zero point seven three nine. Here, the leak changed nothing.",
      "That is because these reviews are built from just thirty sentences, so the vocabulary barely changes. In real review data, the leak flatters every number, and the output looks identical. You cannot know in advance that a check will cost nothing, which is exactly why you run it."
    ]},
    { id: "s15", kind: "leak", heading: "Try it: hunt for leaked words", wait: true, lines: [
      "Now switch the outcome to a yes or no: did the patient file a formal complaint? Here, leaked words are far more dangerous.",
      "Read the six words below, and tick every one that could only have been written once the outcome was known. Then remove them, and watch the score."
    ]},
    { id: "s16", kind: "readthirty", heading: "Read thirty reviews, by hand, every time", lines: [
      "Before any modelling, read thirty reviews at random, and write down what you see. It takes ten minutes.",
      "Do it here, and something jumps out at once. The same sentences keep coming back.",
      "In fact, all five thousand two hundred reviews are built from just thirty sentences. No score and no coefficient would ever tell you that.",
      "That is why reading comes first. Mejia and colleagues did exactly this before their operations analysis. It is standard practice, not a precaution."
    ]},
    { id: "s17", kind: "sentences", heading: "Four sentences you may not write", split: 1, lines: [
      "Here are four sentences that often appear in reports about text. Decide for each one: may you write it, or not?",
      "Patients care most about complain. No. A coefficient is not a topic, and this one is not even about complaining.",
      "The most common themes were team, hospital, and visit. No. Those are simply the words that almost every review contains.",
      "Sentiment analysis shows patients are dissatisfied. No. Which model, trained on what, and how well did it agree with a human reader?",
      "The reviews confirm the satisfaction scores. No. They were written by the same people, about the same visits. Agreement is not corroboration. All four are off limits."
    ]},
    { id: "s18", kind: "helper", heading: "You decide; ChatGPT assists", lines: [
      "As in every week, you decide, and ChatGPT assists.",
      "A good helper question is this one: explain what min d f equals five removes, and what n gram range one to two adds.",
      "A bad one is this: what are patients complaining about? That is a reading of qualitative data, and it starts with you reading some. Reading thirty reviews by hand is the one step in this course that cannot be delegated at all."
    ]},
    { id: "s19", kind: "quiz", heading: "Chapter quiz: five questions", wait: true, lines: [
      "Let us finish with five quick questions. Take your time, and read the explanation after each answer."
    ]},
    { id: "s20", kind: "takeaways", heading: "Four ideas to keep", lines: [
      "Well done. Here are the four ideas to keep from this chapter.",
      "First, a text feature is a variable like any other, and every choice between the sentence and the column is yours to record.",
      "Second, TF-IDF rewards words that are frequent in one review but rare across all of them.",
      "Third, never read meaning into one coefficient. Go back to the sentences.",
      "Fourth, fit the vectoriser on the training rows only, and read the text yourself before you trust any model of it.",
      "In your self-paced session, you will read thirty reviews by hand, predict a yes or no outcome from text, hunt for leaked words on purpose, and compare the model's judgement with your own."
    ]}
  ],
  quiz: [
    { q: "A word appears in 4,500 of 5,000 reviews. How much TF-IDF weight does it get?",
      o: ["A lot, because it is so frequent", "Almost none, because it is everywhere", "Exactly the same as every other word", "It depends only on how long the review is"], a: 1,
      why: "IDF = ln(5000 / 4500) = 0.105, close to zero. A word that is in almost every review distinguishes nothing, however often it appears." },
    { q: "Where should the TF-IDF vectoriser learn its vocabulary?",
      o: ["From all the reviews, before the split", "From the test reviews only", "From the training reviews only: fit_transform on train, transform on test", "It does not matter where"], a: 2,
      why: "Fitting on all rows lets the test reviews help choose the features they are scored with. In real data that flatters every score, and the output looks identical." },
    { q: "'complain' has the largest positive weight in the satisfaction model. What do you do?",
      o: ["Report that complaining patients are more satisfied", "Go back to the sentences that contain it", "Drop the variable, because it is absurd", "Report it as the main theme"], a: 1,
      why: "Here the stop-word list removed 'nothing', so 'complain' stands for 'Nothing to complain about' (average 85.8). One coefficient is never the meaning of a word." },
    { q: "Honest R² = 0.739. Leaked vectoriser R² = 0.739. What follows?",
      o: ["The rule about fitting on training rows is unnecessary", "Keep the rule: here the vocabulary barely changed, but in real data the leak flatters every number", "The leaked model is better", "Text features cannot leak"], a: 1,
      why: "These reviews use only 30 sentences, so the vocabulary hardly moves. You cannot know in advance that a check will cost nothing, which is why you always run it." },
    { q: "Which sentence may you write?",
      o: ["\"Sentiment analysis shows patients are dissatisfied.\"", "\"The most common themes were team, hospital and visit.\"", "\"On thirty reviews I read by hand, the word list agreed with my labels on 21.\"", "\"The reviews confirm the satisfaction scores.\""], a: 2,
      why: "It names the check, the sample and the agreement rate. The others claim themes, sentiment or corroboration that the method cannot support." }
  ]
};
