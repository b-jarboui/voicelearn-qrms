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
    { id: "s21", kind: "dtm", heading: "The document-term matrix", lines: [
      "Here is what all five thousand two hundred reviews look like after that step: one giant table, called the document term matrix.",
      "Each row is a review, and each column is one of about three hundred terms. Each cell holds that term's weight in that review.",
      "Almost every cell is empty. Only about four percent are filled: roughly thirteen terms per review.",
      "A table like this is called sparse. And it is exactly what the models of Weeks 9 to 11 need: rows of numbers."
    ]},
    { id: "s22", kind: "stem", heading: "Stemming: helpful, and dangerous", lines: [
      "One more preparation choice is called stemming. It cuts words back to their root.",
      "Waited and waiting both become wait. In our reviews, that joins three hundred and nineteen uses and three hundred and ninety one uses into one feature.",
      "But watch what it does to complain and complaint. Both become complain, and the happy patients who had nothing to complain about are merged with the patients who are making a complaint.",
      "So stemming can help, and it can hurt. Like every preparation choice, record it, and check what it merged."
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
    { id: "s23", kind: "distinct", heading: "Words that separate complaints", lines: [
      "Which words separate the visits that ended in a complaint from the ones that did not? Compare how often each word appears in each group.",
      "Long appears in forty nine percent of the reviews from patients who complained, and in only eight percent of the others. Far, delay, told, and waiting follow.",
      "On the other side are thank, kindness, and excellent: found in thirteen to eighteen percent of the happy reviews, and in only two or three percent of the complaints.",
      "Together, the words tell a story: complaints are about waiting without information. That is a finding you can check, by reading the reviews themselves."
    ]},
    { id: "s24", kind: "topics", heading: "Topic modelling: what are the reviews about?", lines: [
      "A different question: what are the reviews about? Topic modelling groups the words that tend to appear together into topics. It needs no labels, so it is unsupervised, like Week 12.",
      "Here we asked for four topics, with a method called non negative matrix factorisation. Each topic is a list of words, and each review gets a share of each topic.",
      "The four topics are: kindness and the team, pressure in the emergency department, excellent care, and appointment timing.",
      "Like the number of clusters in Week 12, the number of topics is your choice, and the names are your interpretation. Read the reviews behind each topic before you name it."
    ]},
    { id: "s25", kind: "explore", heading: "Try it: explore the four topics", wait: true, lines: [
      "Your turn. Open each topic, and read its words, a real example review, and how its patients scored.",
      "Notice that a topic is what people talk about, not whether they are happy. Then press Continue."
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
    { id: "s28", kind: "subword", heading: "How language models cut text: sub-word tokens", lines: [
      "Everything so far counted whole words. Modern language models, called transformers, read text differently, and it starts with how they cut it.",
      "They cut text into tokens: pieces of words from a fixed list, here about thirty thousand pieces. Common words stay whole: nothing, complain, complaint.",
      "Rarer words are split into pieces. Midwives becomes mid and wives. Attentive becomes at, ten, and tive.",
      "And no word is ever unknown. Even unprofessionalism can be built from six pieces. That is why a language model can read new words and misspellings that TF-IDF would simply ignore."
    ]},
    { id: "s29", kind: "attention", heading: "The transformer and attention", lines: [
      "The engine inside these models is called a transformer. Its key idea is attention.",
      "Attention lets every token look at every other token in the sentence, and decide how much each one matters for its meaning.",
      "Here are the real attention weights of the token complain, in the first layer of a small transformer, reading: Nothing to complain about. It looks at to, at itself, and at nothing.",
      "TF-IDF threw the word nothing away. A transformer keeps it in view. Stacked in many layers, attention lets context change meaning.",
      "That is the T in GPT: generative, pre-trained, transformer."
    ]},
    { id: "s26", kind: "embed", heading: "Embeddings, tested on our reviews", lines: [
      "Inside a transformer, every sentence becomes a list of numbers called an embedding. Sentences with similar meanings are meant to sit close together.",
      "So we tested a small transformer on three real sentences, and measured how close they are, from zero, unrelated, to one, the same.",
      "Nothing to complain about scored zero point five six with I will be making a complaint, and only zero point one nine with Very impressed with the whole visit. The shared word complain still pulled them together.",
      "TF-IDF scored zero for every pair. Bigger language models such as ChatGPT usually do better, and they can label sentiment without any training data from you.",
      "But the rules of this chapter still apply. Check the model against thirty reviews you read yourself, report the agreement, and never let it read the data for you."
    ]},
    { id: "s30", kind: "bertopic", heading: "BERTopic: topics from embeddings", lines: [
      "Embeddings also give a newer way to find topics, called BERTopic. It follows four steps.",
      "First, every review becomes an embedding. Second, the embeddings are squeezed into a few dimensions with a method called UMAP. Third, a clustering method called HDBSCAN finds dense groups, a close cousin of DBSCAN from Week 12.",
      "Fourth, each group is described by its most distinctive words, using a class based version of TF-IDF.",
      "On our reviews, BERTopic found twenty three topics by itself, much finer than the four from before. One gathers patients who felt ignored, with forty seven percent complaints. Another gathers real kindness, with two percent.",
      "But more than half of the reviews were left as outliers, and one setting changes everything: a minimum topic size of thirty gave more than eighty topics, and one hundred and fifty gave none at all. Choose the setting, report it, and read the reviews."
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
    { id: "s27", kind: "workflow", heading: "The whole workflow in six steps", lines: [
      "Here is the whole text analytics workflow, in six steps.",
      "First, read a sample of reviews. Second, prepare the text, and record every choice.",
      "Third, split the data. Fourth, fit the vectoriser on the training rows only, and build your model.",
      "Fifth, inspect the result: the top terms, the errors, possible leaks, and negation.",
      "Sixth, report what the text adds, whose voices it represents, and what it cannot tell you."
    ]},
    { id: "s19", kind: "quiz", heading: "Chapter quiz: ten questions", wait: true, lines: [
      "Let us finish with ten quick questions. Take your time, and read the explanation after each answer."
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
      why: "It names the check, the sample and the agreement rate. The others claim themes, sentiment or corroboration that the method cannot support." },
    { q: "You apply stemming to the Al Waha reviews. Which merge is misleading?",
      o: ["waited + waiting → wait", "complain + complaint → complain", "team + teams → team", "None: stemming is always safe"], a: 1,
      why: "“complain” comes from “Nothing to complain about” (happy patients, 85.8) and “complaint” from “I will be making a complaint” (unhappy, 52.5). Stemming merges opposite meanings into one feature." },
    { q: "What does topic modelling give you?",
      o: ["The sentiment of each review", "Groups of words that tend to appear together; the names are your interpretation", "A prediction of complaints", "The true number of topics"], a: 1,
      why: "Topics are word groups. A topic is what people talk about, not how they feel: the “appointment timing” topic still had 27.5% complaints. You choose the number and the names." },
    { q: "Only 4.4% of the cells in the document-term matrix are filled. What does that mean?",
      o: ["The data are broken", "Each review uses only a few of the possible terms: the matrix is sparse", "Most reviews are empty", "TF-IDF failed"], a: 1,
      why: "About 13 of the 296 terms appear in a typical review. Sparse matrices are normal in text analytics, and models handle them well." },
    { q: "TF-IDF never saw the word “unprofessionalism”. Why can a transformer still read it?",
      o: ["It looks the word up on the internet", "It splits the word into known sub-word pieces", "It ignores the word, like TF-IDF", "It guesses a random meaning"], a: 1,
      why: "Transformers use a fixed list of about 30,000 word pieces. “unprofessionalism” becomes six known pieces, so no word is ever unknown." },
    { q: "BERTopic on our reviews: minimum topic size 60 gives 23 topics and 53% outliers; size 150 gives no topic at all. What do you report?",
      o: ["Only the 23 topics", "The setting, the number of topics, the share of outliers, and what you read in each topic", "That BERTopic failed", "The setting that gives the most topics"], a: 1,
      why: "Like k in Week 12, the setting is your choice and it changes the answer. Report it with the outliers, and read the reviews behind each topic before naming it." }
  ]
};
