// PHQM830 Week 11 · Chapter 1 "What machine learning is"
// One scene = one audio file. One sentence = one animation step.
window.CHAPTER = {
  course: "PHQM830 Quantitative Research Methods and Statistics",
  week: "Week 11",
  title: "What machine learning is",
  subtitle: "Chapter 1 of the introduction to machine-learning tools",
  scenes: [
    { id: "s01", kind: "title", heading: "Welcome to Week 11", lines: [
      "Welcome to Week 11. In this chapter, we answer one simple question: what is machine learning, and why should a quality manager care about it?",
      "We will not start with computers. We will start with a clinic you already know."
    ]},
    { id: "s02", kind: "recap", heading: "What Week 10 already gave us", lines: [
      "Remember the Al Waha clinic from Week 10. We followed more than five thousand patient visits, and for each one we knew whether the patient later filed a complaint.",
      "About fifteen visits in every hundred ended with a complaint. So complaints are a minority, but an expensive one.",
      "With logistic regression, we found that every ten extra minutes of waiting roughly doubled the odds of a complaint.",
      "Here is the surprise of today. That logistic regression was already a machine-learning tool. You have been doing machine learning without calling it that."
    ]},
    { id: "s12", kind: "guess", heading: "Your turn: where does the risk jump?", wait: true, lines: [
      "Before we look at the real numbers, make a guess.",
      "At what waiting time do you think complaints start to jump? Tap the waiting band you choose."
    ]},
    { id: "s03", kind: "bars", heading: "Complaints jump once the wait passes about 80 minutes", lines: [
      "Now let us look at the same data in a new way. Each bar shows, for one band of waiting time, the share of patients who complained.",
      "For waits up to eighty minutes, the bars stay low, between two and four percent, because most patients accept a normal wait.",
      "After eighty minutes, the picture changes completely. The rate climbs to fifteen percent, then forty-five, then seventy-one, and beyond two hours almost every patient complains.",
      "So the risk does not rise in a smooth, steady line. It stays flat, and then it jumps, like water held back by a wall.",
      "A method that can bend and follow this shape, instead of forcing a straight line, describes these patients better. That flexibility is one of the things machine learning offers."
    ]},
    { id: "s04", kind: "rules", heading: "A rule written by a person: call everyone who waits longer than X minutes", lines: [
      "Before learning anything from data, a manager might simply write a rule: call every patient who waits longer than a certain number of minutes.",
      "If the cut-off is sixty minutes, the clinic catches ninety percent of the complaints. But it also calls almost fifteen hundred patients who would never have complained.",
      "If the cut-off is one hundred and ten minutes, the false alarms fall to only twenty-seven. But now half of the complaints are missed.",
      "There is no free lunch. Catching more problems costs more false alarms. Keep this trade-off in mind, because every machine-learning model faces it too."
    ]},
    { id: "s13", kind: "slider", heading: "Try it: you are the clinic manager", wait: true, lines: [
      "Now it is your turn to be the manager.",
      "Move the slider to choose a cut-off, and watch how many complaints you catch, how many you miss, and how many patients you call for nothing.",
      "Find a cut-off you would be happy to defend in front of your director. Then press Continue."
    ]},
    { id: "s05", kind: "compare", heading: "Rules written by people, or rules learned from data", lines: [
      "That rule was written by a person, from experience. It is only as good as the experience behind it, and it uses only one piece of information: the waiting time.",
      "Machine learning turns this around. We show the computer thousands of past cases, together with what really happened in each one.",
      "The computer searches for the patterns that link the information to the outcome, and it can use many variables at the same time.",
      "Then we test those patterns on cases the computer has never seen, because a pattern that only works on old cases is useless.",
      "And one thing does not change. The computer predicts, but people still decide what to do with the predictions."
    ]},
    { id: "s06", kind: "flows", heading: "Traditional programming versus machine learning", lines: [
      "Here is the same idea as two pictures.",
      "In traditional programming, people give the computer data and rules, and the computer produces answers.",
      "In machine learning, we give the computer data together with the answers we already know from the past, and the computer produces the rules.",
      "Those learned rules are called a model. Once we have a model, we use it like any program: new data goes in, and predictions come out."
    ]},
    { id: "s07", kind: "define", heading: "What does it mean for a machine to learn?", lines: [
      "So what does it mean for a machine to learn? Tom Mitchell gave a simple test in 1997. A program learns when its performance on a task gets better with experience.",
      "In our clinic, the task is to say whether a patient will complain.",
      "The experience is thousands of past visits whose outcome we already know.",
      "The measure is how well it does on new visits: how many real complaints it catches, how many it misses, and how many patients it flags by mistake.",
      "Be careful with the word accuracy. A lazy model that always says no complaint is right eighty-five percent of the time, because most patients do not complain. And yet it catches no complaint at all."
    ]},
    { id: "s14", kind: "trap", heading: "The accuracy trap: which model would you choose?", split: 2, lines: [
      "Here are two models for the clinic. The first one always says no complaint. The second one calls every patient who waits more than ninety minutes.",
      "Which one would you put to work? Choose one.",
      "The lazy model scores eighty-five percent accuracy, yet it never catches a single complaint.",
      "The ninety-minute rule scores ninety-three percent, and it catches six hundred and five of the seven hundred and fifty-eight complaints.",
      "So always ask two questions: how often is the model right, and how many of the cases that matter does it actually catch?"
    ]},
    { id: "s08", kind: "uses", heading: "Where machine learning already works in quality", lines: [
      "Where does this already work in quality management? Here are six examples.",
      "In predictive maintenance, sensor readings warn that a machine is likely to fail, so the repair is planned instead of urgent. Your Assessment 3 is exactly this kind of problem.",
      "In visual inspection, cameras spot scratches, cracks, or missing parts on a production line, faster than a tired human eye.",
      "In complaint prediction, like in our clinic, staff can reach a patient before the complaint is ever written.",
      "Demand forecasting predicts tomorrow's patients, orders, or calls, so that managers can plan staff and stock.",
      "Anomaly detection spots unusual readings that no written rule expected. And text analytics sorts thousands of customer comments by topic and tone, which we will study in Week 13."
    ]},
    { id: "s09", kind: "history", heading: "Machine learning is older than most people think", lines: [
      "Machine learning sounds new, but most of its ideas are old.",
      "The first mathematical model of a brain cell appeared in 1943. In 1957, the perceptron became one of the first machines to learn from examples.",
      "In 1959, Arthur Samuel's checkers program made the phrase machine learning popular.",
      "Training networks with many layers became practical in 1986. Support vector machines followed in 1995, and random forests in 2001.",
      "Since 2012, deep learning has won contest after contest, and in 2022, ChatGPT brought language models to the public.",
      "So the ideas are decades old. What changed after 2010 was the amount of data and the speed of computers."
    ]},
    { id: "s10", kind: "goals", heading: "Understanding and predicting are different goals", lines: [
      "One last idea will guide your own research. A model can serve two different goals.",
      "The first goal is understanding. You ask which factors go with complaints, and how sure you are. You look at coefficients and confidence intervals.",
      "The second goal is prediction. You ask which future patients will complain. You judge the model by its errors on new cases.",
      "Statistics and machine learning can both serve either goal. Your research question decides which goal matters most."
    ]},
    { id: "s11", kind: "check", heading: "Quick check: understanding or predicting?", quiz: true, lines: [
      "Let us check. Read the two questions on the screen, and decide for each one: is it about understanding, or about prediction? Choose your answers now.",
      "The first question asks whether a longer wait is linked to more complaints. So it is about understanding a relationship.",
      "The second question asks which patients tomorrow are most likely to complain. So it is about prediction."
    ]},
    { id: "s15", kind: "quiz", heading: "Chapter quiz: five questions", wait: true, lines: [
      "Let us finish with five quick questions. Take your time, and read the explanation after each answer."
    ]},
    { id: "s16", kind: "takeaways", heading: "Four ideas to keep", lines: [
      "Well done. Here are the four ideas to keep from this chapter.",
      "First, machine learning finds rules in past cases, instead of having a person write them.",
      "Second, a flexible model can follow real shapes in the data, like the jump in complaints after eighty minutes.",
      "Third, every rule trades complaints caught against false alarms, so accuracy alone can fool you.",
      "Fourth, your research question decides whether you want to understand a relationship or to predict an outcome.",
      "In the next chapter, we will see how a machine actually learns from data, and how we make sure it has not simply memorised the past."
    ]}
  ],
  // Real figures from the course dataset (5,204 visits, 758 complaints): rule "call every patient who waits longer than X minutes"
  // [cut-off, patients called, complaints caught, complaints missed, false alarms, accuracy %]
  cutoffs: [[20,5083,748,10,4335,16.5],[30,4596,731,27,3865,25.2],[40,3744,712,46,3032,40.9],[50,2904,695,63,2209,56.3],[60,2160,681,77,1479,70.1],[70,1557,665,93,892,81.1],[80,1133,652,106,481,88.7],[90,814,605,153,209,93.0],[100,565,493,265,72,93.5],[110,407,380,378,27,92.2],[120,282,269,489,13,90.4],[130,209,198,560,11,89.0],[140,149,140,618,9,88.0],[150,103,95,663,8,87.1]],
  quiz: [
    { q: "In machine learning, what does the computer receive in order to learn?",
      o: ["Rules written by an expert", "Past cases together with their known outcomes", "Only the new cases it must predict", "The correct answers for future cases"], a: 1,
      why: "The computer learns from past cases whose outcome is already known. A person writing the rules is the traditional way, and future answers are exactly what we do not have." },
    { q: "In the clinic data, what happens to complaints as the waiting time grows?",
      o: ["They rise by the same amount every ten minutes", "They stay low until about 80 minutes, then climb steeply", "They fall after two hours", "They do not change"], a: 1,
      why: "The rate stays between 2% and 4% up to 80 minutes, then rises to 15%, 45%, 71% and over 90% after two hours. A straight line cannot show this jump." },
    { q: "The manager lowers the cut-off from 110 to 60 minutes. What happens?",
      o: ["More complaints are caught, and there are many more false alarms", "Fewer complaints are caught, and there are fewer false alarms", "The same complaints are caught, with fewer false alarms", "Nothing changes"], a: 0,
      why: "At 110 minutes the clinic catches 380 complaints with 27 false alarms. At 60 minutes it catches 681, but with 1,479 false alarms. Catching more always costs more false alarms." },
    { q: "A model is 85% accurate on the clinic data. What should you check before you trust it?",
      o: ["Nothing: 85% is already high", "How many of the real complaints it actually catches", "How fast it runs", "Whether it uses a neural network"], a: 1,
      why: "A model that always says \"no complaint\" is 85.4% accurate and catches no complaint at all. When the event is rare, check how many real cases the model catches." },
    { q: "\"Which patients tomorrow are most likely to complain?\" is a question about…",
      o: ["Understanding a relationship", "Prediction", "Cleaning the data", "The history of machine learning"], a: 1,
      why: "It asks about future cases, so it is about prediction. A question such as \"is a longer wait linked to more complaints?\" is about understanding a relationship." }
  ]
};
