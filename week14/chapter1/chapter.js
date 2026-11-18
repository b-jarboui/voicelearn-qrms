// PHQM830 Week 14 · Chapter 4 "Neural network concepts for prediction"
// One scene = one audio file. One sentence = one animation step.
// Revised 18 Nov 2026 after an accuracy audit (own reviewers + Copilot GPT-6.1 Sol and Claude Opus 5.5).
window.CHAPTER = {
  course: "PHQM830 Quantitative Research Methods and Statistics",
  week: "Week 14",
  title: "Neural network concepts for prediction",
  subtitle: "Chapter 4 · A neuron is a regression with one extra step",
  scenes: [
    { id: "s01", kind: "title", heading: "Welcome to Week 14", lines: [
      "Welcome to Week 14. This week we open one of the models behind artificial intelligence: the neural network.",
      "Our question stays the same: how satisfied will a patient at Al Waha be? But this time, we want a better prediction.",
      "And you will see that a neural network is far less mysterious than it sounds. A neuron is a regression with one extra step."
    ]},
    { id: "s02", kind: "recall", heading: "What you already have", lines: [
      "You already own almost everything a neural network uses. Let us collect it.",
      "A regression coefficient: how much the prediction moves when a predictor moves by one, with the others held fixed.",
      "An intercept: what the model gives when every predictor is zero.",
      "Held-out scoring: a model is judged on rows it has never seen. And standardising, so that units stop deciding things.",
      "Today these ideas come back, two of them under new names. That is most of what a neural network is."
    ]},
    { id: "s03", kind: "bend", heading: "The bend a straight line cannot draw", lines: [
      "Here is real data from the five thousand two hundred episodes: average satisfaction, for each band of bed occupancy.",
      "Up to about eighty percent, satisfaction stays between eighty one and eighty four points. Then it falls steeply, to forty three in the busiest band.",
      "Now the Week 9 regression, with the other predictors held at typical values. Its occupancy effect is a straight line that falls steadily.",
      "A straight line cannot bend. It falls too early, and nowhere near enough where the danger is.",
      "Here is a neural network, with the same predictors held at typical values. It stays flat, then bends down after eighty five percent. Let us see how it can bend."
    ]},
    { id: "s04", kind: "neuron", heading: "One neuron, step by step", lines: [
      "This is one neuron. Two inputs come in: here, the waiting time and the occupancy of one episode.",
      "Step one: multiply each input by a weight. The weights play the same role as Week 9's coefficients.",
      "Step two: add them up, and add one more number. That number plays the role of the intercept. In a network, it is called the bias.",
      "Step three is the only new idea. Apply one simple rule. The most common one: if the total is negative, output zero. Otherwise, pass it on.",
      "Multiply, add, apply the rule. That is all one neuron in this network does."
    ]},
    { id: "s05", kind: "byhand", heading: "Try it: one neuron by hand", wait: true, lines: [
      "Your turn. This neuron has a weight of zero point five, a weight of minus zero point two, and a bias of one.",
      "Work out two episodes. Episode A has inputs ten and thirty. Episode B has twenty and ten.",
      "Choose an episode, predict the output, and watch the rule decide. Then press Continue."
    ]},
    { id: "s06", kind: "rule", heading: "Why one small rule matters so much", lines: [
      "Why does that small rule matter so much? Look at what happens without it.",
      "A weighted sum of inputs is a straight line, or a flat plane. Feed it into another weighted sum, and you get another straight line.",
      "Stack ten layers, or a hundred. Without the rule, the whole network collapses into one linear function. It could do nothing that Week 9 could not already do with the same inputs.",
      "With the rule, each neuron becomes a hinge: flat on one side, sloped on the other. And hinges can bend."
    ]},
    { id: "s07", kind: "hinges", heading: "Building a bend from hinges", lines: [
      "Let us bend a line to follow the occupancy bands, using nothing but hinges. We will place them by hand.",
      "Start with a constant, the output bias, at eighty four points.",
      "Add a hinge at eighty percent occupancy: below it, nothing changes. Above it, the line starts to fall.",
      "Add a second hinge at eighty six percent, and the fall gets steeper. A third, at ninety four, softens the end.",
      "Three hinges, added together, already follow the real bands closely. A network uses many such hinges, and training decides where they go."
    ]},
    { id: "s08", kind: "network", heading: "From one neuron to a network", lines: [
      "Now connect many neurons. This is the network from this week's script.",
      "Six inputs: waiting time, staff ratio, training hours, occupancy, handoffs, and prior visits.",
      "A first layer of thirty two neurons. Each one multiplies all six inputs, adds a bias, and applies the rule.",
      "A second layer of sixteen neurons does the same with the thirty two answers. Then one output neuron takes a weighted sum of the sixteen, plus its own bias. That is the prediction.",
      "In total, seven hundred and sixty nine numbers to learn: seven hundred and twenty weights and forty nine biases. Call it what it is: a small network with two hidden layers."
    ]},
    { id: "s09", kind: "learn", heading: "How the network learns: walking downhill", lines: [
      "You choose the design. Training finds the seven hundred and sixty nine numbers, starting from small random values.",
      "After its first pass through the training rows, its predictions are still very poor: an R M S E of about seventy five points.",
      "So it measures its error, and nudges every weight and bias a little, in the direction that makes the error smaller. Like walking downhill in fog, one small step at a time.",
      "This is the real training of our network. After about twenty passes, the error has dropped to about twenty points. After three hundred and twenty one passes, it stops, near six.",
      "No formula was solved. The numbers were found by thousands of small corrections."
    ]},
    { id: "s10", kind: "rmse", heading: "Root mean squared error, by hand", lines: [
      "How do we measure how wrong predictions are? With root mean squared error, R M S E.",
      "Four episodes. The real scores are seventy, seventy five, eighty, and eighty five. The model predicted seventy two, seventy four, eighty three, and seventy nine.",
      "The errors, real minus predicted, are minus two, one, minus three, and six. Square them: four, one, nine, and thirty six.",
      "Average them: fifty divided by four is twelve point five. Then take the square root: three point five four points.",
      "Notice the single error of six. It gave thirty six of the fifty. Squaring makes R M S E sensitive to the worst cases."
    ]},
    { id: "s11", kind: "squares", heading: "Try it: the worst error rules", wait: true, lines: [
      "Your turn. Move the fourth prediction, and watch its square grow and shrink.",
      "See how much of the total error one bad prediction can own. Then press Continue."
    ]},
    { id: "s12", kind: "scale", heading: "Scale the inputs first", lines: [
      "One rule matters more for a network than for a regression: scale the inputs.",
      "Waiting time runs from about twenty to over one hundred and sixty minutes. Staff ratio runs from about zero point six to two. Different units, wildly different numbers.",
      "Unscaled, waiting time shouts and staff ratio whispers. Training spends its early steps fighting the units, not learning the pattern.",
      "So standardise every input: subtract the mean, divide by the standard deviation. Now every input is on the same scale.",
      "An ordinary regression gives the same predictions either way. A network does not. On the slides, removing the scaler crashes nothing: the error just rises, quietly, from six point one two to six point nine one."
    ]},
    { id: "s13", kind: "pipeline", heading: "The pipeline keeps the test rows out", lines: [
      "The script chains three steps into one pipeline: fill the gaps, standardise, then train.",
      "The pipeline learns its numbers from the training rows only: the medians that fill the gaps, then the means and spreads that standardise.",
      "Then it applies those same numbers to the test rows. The test rows never help to choose them.",
      "Week 11's rule, split before you fit, now protects the scaling too. And note: the ordinary regression needs no scaler. The network does."
    ]},
    { id: "s14", kind: "results", heading: "What the file actually says", lines: [
      "Here is the result on one thousand three hundred held-out episodes, measured as R M S E, in satisfaction points.",
      "Week 9's linear model: an R M S E of seven point zero seven.",
      "The neural network: six point one two. On the held-out rows, its R squared is zero point eight five, against zero point eight one.",
      "The network without scaling: six point nine one. Worse, but it still beats the linear model, which is why the mistake hides.",
      "And for scale: the standard deviation of satisfaction is sixteen points. The network is zero point nine five points better. Real, and modest."
    ]},
    { id: "s15", kind: "cost", heading: "What the accuracy costs", lines: [
      "So what did the extra accuracy cost?",
      "Week 9 gave you six coefficients. You could read each one, report it, and defend it. Ten more minutes of waiting: about one and a quarter points lower predicted satisfaction, with the others held fixed.",
      "The network has seven hundred and sixty nine parameters, and not one of them means anything on its own.",
      "You gained about one point of accuracy. Its weights cannot tell you why. Whether that trade is worth making depends on your research question, and Week 15 makes you decide."
    ]},
    { id: "s16", kind: "overfit", heading: "When training error flatters", lines: [
      "There is one more danger, and it hides in the training error.",
      "Here, a much bigger network, with sixty seven thousand parameters, was trained on only sixty episodes.",
      "Watch its training error: it falls, and falls, to about five points. It looks brilliant.",
      "Now the error on new episodes. It stays above twelve points, twice the error of the small network trained on three thousand nine hundred episodes. It fits sixty episodes, not the pattern.",
      "That is overfitting. Compare the rows with the parameters, and judge a model only on rows it has never seen."
    ]},
    { id: "s17", kind: "seeds", heading: "Try it: one network, five seeds", wait: true, lines: [
      "A network starts from random values, so a different random seed gives a different model.",
      "Your turn. Reveal five runs with five different seeds, and see how much the result moves. Then press Continue."
    ]},
    { id: "s18", kind: "checks", heading: "Four checks before you report", lines: [
      "Before you report any network, run four checks.",
      "One: were the inputs scaled, with the scaler fitted on the training rows only?",
      "Two: is there enough data for the number of parameters? A training error far below the held-out error is the warning sign.",
      "Three: does it beat the simpler model? Always fit the linear baseline first. If the network does not clearly beat it, the simpler model is the better answer.",
      "Four: does the result survive a new seed? Report the mean and the spread across seeds, never a single lucky run."
    ]},
    { id: "s19", kind: "fix", heading: "Try it: fix a broken script", wait: true, lines: [
      "This script will not run. Read the error before you change anything.",
      "The error names loss, a word you never wrote. Find the cause, and choose the fix. Then press Continue."
    ]},
    { id: "s20", kind: "sentences", heading: "Four sentences: may you write them?", split: 1, lines: [
      "Here are four sentences that often appear in reports about neural networks. Decide for each one: may you write it, or not?",
      "The neural network learned that waiting time matters most. No. Nothing in the network's weights shows that, so you cannot say it.",
      "The network is much better. No. It is zero point nine five points better, on an outcome whose standard deviation is sixteen. Say the number.",
      "Deep learning was applied. No. That label is vague. Say what you fitted: a network with two hidden layers, of thirty two and sixteen neurons.",
      "The model achieved an R squared of zero point eight five. Incomplete: say it was on held-out rows, and give the spread across seeds."
    ]},
    { id: "s21", kind: "helper", heading: "You decide; ChatGPT assists", lines: [
      "As every week: you decide, and the helper assists.",
      "A good question for the helper: explain what max iter controls, and what a convergence warning means if it appears.",
      "A bad one: keep trying settings until my test score improves. Tuning against your held-out rows destroys the only honest number you have.",
      "And deciding whether the extra accuracy is worth the loss of explanation is interpreting the result. That stays with you."
    ]},
    { id: "s22", kind: "quiz", heading: "Chapter quiz: eight questions", wait: true, lines: [
      "Let us finish with eight quick questions. Take your time, and read the explanation after each answer."
    ]},
    { id: "s23", kind: "takeaways", heading: "Five ideas to keep", lines: [
      "Well done. Here are five ideas to keep from this chapter.",
      "One: a neuron multiplies, adds a bias, and applies one rule. The rule is what lets a network bend.",
      "Two: the weights are not solved. They are found by small corrections that walk the error downhill.",
      "Three: scale the inputs inside a pipeline, and judge the model only on held-out rows.",
      "Four: always fit the simpler model first, and check that the gain is larger than the variation between runs.",
      "Five: accuracy has a price. A network predicts, but its weights cannot tell you why. Next week, you decide when that price is worth paying."
    ]}
  ],
  quiz: [
    { q: "What does one neuron in this network compute?",
      o: ["A random guess that improves over time", "Weighted inputs, added up with a bias, then passed through one simple rule", "The average of its inputs", "A p value for each input"], a: 1,
      why: "Multiply each input by a weight, add the bias, apply the rule (here: negatives become zero). That is all one neuron does." },
    { q: "A neuron has w1 = 0.5, w2 = −0.2, b = 1, and the rule “negatives become zero”. Inputs: x1 = 10, x2 = 30. What does it output?",
      o: ["0", "1", "−1", "9"], a: 0,
      why: "0.5 × 10 − 0.2 × 30 + 1 = 5 − 6 + 1 = 0, and the rule passes 0 on. (Episode B, with 20 and 10, gives 9.)" },
    { q: "Why does a network need the rule at all?",
      o: ["To make training faster", "Without it, any number of layers collapses into one linear function of the inputs", "To remove outliers", "To standardise the inputs"], a: 1,
      why: "A weighted sum of weighted sums is still a weighted sum. The rule turns each neuron into a hinge, and hinges can bend." },
    { q: "Real scores 70, 75, 80, 85; predictions 72, 74, 83, 79. What is the RMSE?",
      o: ["3.0 points", "3.54 points", "12.5 points", "6 points"], a: 1,
      why: "Errors (real − predicted) −2, 1, −3, 6. Squares 4, 1, 9, 36. Mean 12.5. Square root 3.54. The error of 6 contributes 36 of the 50." },
    { q: "On the slides, the scaler is removed from the network's pipeline. What happens?",
      o: ["The script crashes", "Nothing changes", "RMSE rises quietly from 6.12 to 6.91, still better than the linear model", "RMSE improves"], a: 2,
      why: "No crash, no warning. The network just underperforms, and because it still beats the baseline, nobody notices." },
    { q: "A network with 67,841 parameters is trained on 60 episodes. Its training error is 5 points; on new episodes it is above 12. What is happening?",
      o: ["The model is improving", "Overfitting: it fits the training rows much better than new rows", "The seed is wrong", "The scaler leaked"], a: 1,
      why: "Far more parameters than rows. The training error flatters the model; judge it on rows it has never seen." },
    { q: "Five seeds give RMSE 6.14, 6.17, 6.05, 6.12 and 6.11. What do you report?",
      o: ["6.05, the best run", "The mean (6.12) and the spread (0.12) across the five seeds", "6.17, to be cautious", "Only the first run"], a: 1,
      why: "The runs vary by about 0.12 points on this split, far less than the 0.95-point gain. Report the spread, never one lucky run." },
    { q: "Which sentence may you write?",
      o: ["“The network is much better.”", "“The network learned that waiting matters most.”", "“On 1,300 held-out episodes, the network’s RMSE was 6.12 (five seeds: 6.05–6.17) against 7.07 for the linear model, 0.95 points better on an outcome with a standard deviation of 16.”", "“Deep learning outperformed regression.”"], a: 2,
      why: "Say the number, the held-out rows, the seeds, the baseline and the scale. The network's weights cannot tell you what matters most." }
  ]
};
