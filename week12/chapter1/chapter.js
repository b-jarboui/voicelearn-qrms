// PHQM830 Week 12 · Chapter 1 "Finding groups nobody labelled"
// One scene = one audio file. One sentence = one animation step.
window.CHAPTER = {
  course: "PHQM830 Quantitative Research Methods and Statistics",
  week: "Week 12",
  title: "Finding groups nobody labelled",
  subtitle: "Chapter 1 of clustering and segmentation analysis",
  scenes: [
    { id: "s01", kind: "title", heading: "Welcome to Week 12", lines: [
      "Welcome to Week 12. This week, we look for groups in our data that nobody has labelled.",
      "And we will learn the harder half of the job: how to prove that those groups are real."
    ]},
    { id: "s02", kind: "recap", heading: "Until now, there was always an answer key", lines: [
      "In every week so far, our data came with an answer key. For each hospital episode, we knew the outcome: the satisfaction score, or whether the patient complained.",
      "So we could always check our work. We compared the prediction with the real answer, and we counted the errors.",
      "This week, the answer key is gone. There is no outcome, and nothing will tell us whether our answer is right.",
      "This is called unsupervised learning. That single missing piece changes how the method must be judged, and it is the whole lesson of this week."
    ]},
    { id: "s03", kind: "spot", heading: "Your turn: which picture has real groups?", split: 2, lines: [
      "Let us start with a test of your eyes. Here are two clouds of hospital episodes, each squeezed onto a flat map.",
      "One of them has real groups in it. Which one? Choose picture A or picture B.",
      "Now watch what happens when we ask the computer to find four groups in each picture.",
      "It finds four tidy groups in both, and they look equally convincing. But picture A is pure noise: we shuffled it, so it has no structure at all.",
      "Remember this. A clustering method always returns clusters, even from random noise. Finding clusters is not evidence that clusters exist."
    ]},
    { id: "s04", kind: "kmeans", heading: "How k-means works, without the algebra", lines: [
      "The method we use is called k-means. Here is the whole algorithm, in four moves.",
      "First, choose k, the number of groups. Then drop k points at random, and call them centres.",
      "Second, give every episode to its nearest centre. Each episode now wears the colour of its centre.",
      "Third, move each centre to the middle of the episodes it was given.",
      "Then repeat: assign again, and move again, until nothing changes. That is the whole algorithm.",
      "Notice the word nearest. Everything rests on how we measure distance, and that is where most clustering goes wrong."
    ]},
    { id: "s05", kind: "playground", heading: "Try it: run k-means yourself", wait: true, lines: [
      "Now run it yourself, on two hundred and forty real episodes.",
      "Choose the number of groups, then press Assign and Move, one step at a time, until the centres stop moving.",
      "Try a new random start as well, and see whether you always end up with the same groups. Then press Continue."
    ]},
    { id: "s06", kind: "distance", heading: "Distance between two episodes, worked by hand", lines: [
      "So how far apart are two episodes? Take episode A, with occupancy at sixty percent and a staff ratio of one point two, and episode B, with occupancy at eighty percent and a staff ratio of zero point nine.",
      "The gap in occupancy is twenty points. Squared, that is four hundred.",
      "The gap in staff ratio is zero point three. Squared, that is only zero point zero nine.",
      "Add them, take the square root, and the distance is twenty.",
      "Occupancy supplied four hundred of the four hundred point zero nine. Staffing contributed almost nothing, not because it does not matter, but because it is measured in smaller numbers."
    ]},
    { id: "s07", kind: "scale", heading: "Standardise first: the z-score from Week 4", lines: [
      "The cure is the z-score you learned in Week 4. For every column, subtract the mean and divide by the standard deviation.",
      "In the real file, occupancy has a standard deviation of about ten point four, and training hours about nine point seven. The staff ratio has only zero point three four.",
      "Without standardising, occupancy and training hours supply ninety-nine percent of every distance. Staff ratio supplies one tenth of one percent.",
      "After standardising, every column has a standard deviation of one, and each of the four variables supplies about a quarter of the distance.",
      "In Python, this is one line: StandardScaler, fit transform. Skip it, and your segments are just bands of one variable wearing a disguise."
    ]},
    { id: "s08", kind: "units", heading: "Try it: who decides the distance?", wait: true, lines: [
      "Now see it for yourself.",
      "Pick two real episodes, and switch between raw units and standardised units. Watch how much of the distance each variable supplies. Then press Continue."
    ]},
    { id: "s09", kind: "noise", heading: "The noise floor: the check that almost nobody runs", lines: [
      "Since k-means finds groups even in noise, how do we know our groups are real? We build a noise floor.",
      "Take the data, and shuffle each column on its own, like spinning the reels of a slot machine.",
      "Every column keeps exactly the same values, so its average and its spread do not change. But the links between the columns are destroyed. Any real group is gone.",
      "Run exactly the same clustering on the shuffled data. Whatever score it gets is what no structure looks like.",
      "The gap between the real score and the shuffled score is your evidence. It takes four lines of code, and almost nobody runs it."
    ]},
    { id: "s10", kind: "silhouette", heading: "The silhouette score: how well separated are the groups?", lines: [
      "The score we compare is called the silhouette. It asks a simple question about every single episode.",
      "How close is this episode to the members of its own group? Call that distance a.",
      "And how close is it to the members of the nearest other group? Call that distance b.",
      "If b is much bigger than a, the episode sits comfortably in its group, and its silhouette is close to one. Near zero, it sits on a border. The silhouette score is the average over all episodes."
    ]},
    { id: "s11", kind: "gap", heading: "What the Al Waha file actually says", lines: [
      "Here is what our hospital file says, for two to six groups.",
      "With two groups, the real data scores a silhouette of zero point five zero. The shuffled data scores only zero point one nine.",
      "As k grows, the real score falls, while the shuffled score stays near zero point one eight. The gap shrinks, from plus zero point three one at k equals two, to plus zero point zero seven at k equals six.",
      "So there is real structure in this file, and it is strongest with two groups. We only know this because we ran the comparison."
    ]},
    { id: "s12", kind: "choosek", heading: "Your turn: choose k and defend it", wait: true, lines: [
      "Now you choose. Look at the gaps, and pick the number of groups you would report to the hospital director.",
      "Remember: k is chosen, not discovered. Then press Continue."
    ]},
    { id: "s13", kind: "shapes", heading: "The assumptions, and what to do when one fails", lines: [
      "k-means makes three assumptions. Check each one before you trust the groups.",
      "First, the variables are on comparable scales. You check the standard deviations, and you standardise every time.",
      "Second, k must be chosen. Use the elbow plot, the silhouette, the noise floor, and whether the groups mean anything to the organisation.",
      "Third, the groups are roughly round and of similar size. Long, thin, or curved groups get cut in half. When you see that, use hierarchical clustering, or DBSCAN, instead."
    ]},
    { id: "s14", kind: "naming", heading: "Naming is not describing", lines: [
      "Once the groups are real, you must name them. Read each centre in the original units, and say what is high and what is low.",
      "The first group, about two thousand one hundred episodes, has a staff ratio near one, about ten hours of training, wards almost ninety percent full, and five handoffs.",
      "The second group, about two thousand six hundred episodes, has a staff ratio near one point five, twenty-six hours of training, wards about seventy-three percent full, and fewer than three handoffs.",
      "So a defensible pair of names is stretched wards and well-resourced wards. Every word traces back to a number in the profile.",
      "Then apply the final test. Would a hospital manager recognise these groups? If not, you have a statistical artefact, not a segment."
    ]},
    { id: "s15", kind: "sentences", heading: "Four sentences you may not write", split: 1, lines: [
      "Here are four sentences that often appear in reports about clusters. Decide for each one: may you write it, or not?",
      "The data naturally falls into four clusters. No. You chose four.",
      "Cluster two is the high-performing group. No. Performance was not one of the clustering variables, so you are importing a conclusion.",
      "The clusters are statistically significant. No. There is no test here, and no p value exists to support that phrase.",
      "This segmentation explains satisfaction. No. Nothing was explained. A description was produced. In fact, all four sentences are off limits."
    ]},
    { id: "s16", kind: "helper", heading: "You decide; ChatGPT assists", lines: [
      "As in every week, you decide, and ChatGPT assists.",
      "A good helper question is this one: explain what n init equals ten does, and why leaving it at one can give a different answer each time.",
      "A bad one is this: what should I call these clusters? Naming is interpretation, and interpretation is your work. A model that names your segments has written your findings."
    ]},
    { id: "s17", kind: "quiz", heading: "Chapter quiz: five questions", wait: true, lines: [
      "Let us finish with five quick questions. Take your time, and read the explanation after each answer."
    ]},
    { id: "s18", kind: "takeaways", heading: "Four ideas to keep", lines: [
      "Well done. Here are the four ideas to keep from this chapter.",
      "First, clustering has no answer key, and it always returns clusters, even from noise.",
      "Second, distance decides everything, so standardise every variable before you cluster.",
      "Third, compare your silhouette with the same clustering on shuffled data. The gap is the evidence.",
      "Fourth, name each group from its centre in original units, and never claim more than a description.",
      "In your self-paced session, you will compute a distance by hand, cluster on different variables, run the shuffled comparison, and defend every name you give."
    ]}
  ],
  // Real figures, Al Waha episodes file, clustering on staff_ratio, training_hours, occupancy_pct, handoffs (standardised).
  // Silhouette table as on the Week 12 slides: [k, real, shuffled, gap]
  gaps: [[2, 0.504, 0.190, 0.314], [3, 0.404, 0.175, 0.229], [4, 0.331, 0.182, 0.149], [5, 0.290, 0.183, 0.107], [6, 0.254, 0.184, 0.069]],
  quiz: [
    { q: "You run k-means with k = 4 on a file and get four tidy clusters. What does that prove?",
      o: ["That the file has four natural groups", "Nothing yet: k-means returns clusters even from random noise", "That the clusters are statistically significant", "That four is the best number of groups"], a: 1,
      why: "k-means always returns the number of clusters you ask for, even on shuffled data with no structure. Evidence comes from comparing with a noise floor." },
    { q: "Episode A: occupancy 60%, staff ratio 1.2. Episode B: occupancy 80%, staff ratio 0.9. Without standardising, which variable decides the distance?",
      o: ["Staff ratio, because it matters more for care", "Both equally", "Occupancy, because it is measured in bigger numbers", "Neither: distance ignores units"], a: 2,
      why: "Occupancy supplies 400 of the 400.09 squared distance. Staff ratio supplies 0.09, only because it is measured in smaller numbers. Standardise first." },
    { q: "How do you build the noise floor for a clustering?",
      o: ["Delete half of the rows", "Shuffle each column on its own, then run the same clustering", "Add random numbers to every value", "Run k-means with k = 1"], a: 1,
      why: "Shuffling each column keeps every distribution but destroys the links between columns. The same clustering on that data shows what 'no structure' scores." },
    { q: "Real silhouette 0.504 at k = 2, shuffled 0.190. Real 0.254 at k = 6, shuffled 0.184. What should you report?",
      o: ["k = 6, because more groups give more detail", "k = 2, where the gap over the noise floor is largest (+0.314)", "No structure, because 0.504 is below 0.6", "Either: the silhouette cannot help"], a: 1,
      why: "The gap is the evidence. It is largest at k = 2, so that is where the structure is strongest. At k = 6 the real score is barely above noise." },
    { q: "Which sentence may you write about your clusters?",
      o: ["\"The data naturally falls into two clusters.\"", "\"Cluster 2 is the high-performing group.\"", "\"Group 1 has higher occupancy and fewer training hours than group 2.\"", "\"The clusters are statistically significant.\""], a: 2,
      why: "It describes the centres in original units, which is exactly what clustering gives you. The other sentences claim discovery, performance or significance that clustering cannot support." }
  ]
};
