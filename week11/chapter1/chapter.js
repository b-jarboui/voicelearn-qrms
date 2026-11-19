// PHQM830 · Week 11 · one sentence per animation beat.
window.CHAPTER = {
  course: "PHQM830 Quantitative Research Methods and Statistics",
  week: "",
  title: "What machine learning is",
  subtitle: "An introduction to machine-learning tools",
  scenes: [
    { id: "s01", kind: "title", heading: "What can a clinic learn from past visits?", lines: [
      "Imagine opening tomorrow’s clinic with time to call just a few patients about their experience.",
      "At Al Waha, the record of earlier visits gives the team somewhere to begin."
    ]},
    { id: "s02", kind: "recap", heading: "A visit and its outcome", lines: [
      "The Al Waha waiting-time dataset follows five thousand two hundred and four visits with a recorded wait.",
      "About fifteen in every hundred visits ended with a complaint on file.",
      "In a logistic regression curve fitted to these visits, ten additional minutes of waiting went with roughly double the odds of a complaint.",
      "That curve learned its shape from examples, which makes it an early member of our machine learning toolkit."
    ]},
    { id: "s12", kind: "guess", heading: "Where does the complaint rate climb?", wait: true, lines: [
      "Picture the waiting room filling up as the clock moves across the bands below.",
      "Choose the first band where you expect a sustained rise in the share of visits ending in a complaint."
    ]},
    { id: "s03", kind: "bars", heading: "Read the waiting-time bands", lines: [
      "Each bar asks how many visits in its waiting band ended with a complaint.",
      "From twenty to eighty minutes the bars sit near two or three percent, although the shortest waits have a higher rate.",
      "The rate reaches about fifteen percent in the next band and exceeds ninety percent beyond two hours.",
      "Follow the tops of the bars to see how sharply the pattern bends around eighty minutes.",
      "A flexible curve could describe this shape, but we still need fresh visits to check its predictions."
    ]},
    { id: "s04", kind: "rules", heading: "What would a written rule cost?", lines: [
      "A manager could put a mark on the clock and flag every visit that lasts longer than that waiting time.",
      "At sixty minutes the rule catches about nine in ten recorded complaints and flags nearly fifteen hundred visits without one.",
      "At one hundred and ten minutes there are only twenty-seven false alarms, but almost half the complaints are missed.",
      "Each position of the mark gives the staff a different balance of missed complaints and extra calls."
    ]},
    { id: "s13", kind: "slider", heading: "Set a waiting-time cut-off", wait: true, lines: [
      "The dots show a sample of visits, with complaints marked in terracotta.",
      "Move the line to see which visits change sides and how the counts change across the full waiting-time file.",
      "Choose a cut-off you could defend to a manager who wants to know how many calls the team must make."
    ]},
    { id: "s05", kind: "compare", heading: "From written rules to learned rules", lines: [
      "The manager chose the waiting-time rule from experience before seeing how it performed on these records.",
      "Now imagine handing someone the past visits together with the complaint eventually recorded for each visit.",
      "They can try different ways of combining what was known about a visit to predict its outcome.",
      "Fresh cases tell us whether the pattern they found travels beyond the records that first suggested it.",
      "A prediction can put a visit on a review list while the decision about calling stays with the team."
    ]},
    { id: "s06", kind: "flows", heading: "Follow the information", lines: [
      "Look at the arrows to see which piece of information each process produces.",
      "A written rule takes a waiting time and returns the answer specified by the person who wrote it.",
      "When past visits come with known answers, a computer can work backwards to find a rule that fits examples.",
      "We call the fitted rule a model, and we can give it another visit to get a prediction."
    ]},
    { id: "s26", kind: "lesson", heading: "What changes when a model learns?", lines: [
      "Suppose the clinic starts by giving every visit the same estimated chance of a complaint.",
      "For an old visit we can place that estimate beside the answer that eventually appeared in the file.",
      "A visit with a complaint gives a low estimate a larger penalty than it gives a high estimate.",
      "The rule for assigning that penalty is called a loss function.",
      "Adding up the penalties across the training examples gives the computer a way to compare two candidate rules.",
      "One candidate might allow the estimate to rise gradually as the recorded waiting time gets longer.",
      "If that change reduces the total penalty, the computer has a reason to keep the change.",
      "Fitting a model means adjusting its rule against a criterion like this one using examples with known answers.",
      "For the next visit we keep the fitted rule still while we enter the new waiting time."
    ]},
    { id: "s07", kind: "define", heading: "Name the task, experience and measure", lines: [
      "Tom Mitchell suggested describing learning by asking what improves with experience on a particular task.",
      "For Al Waha the task might be identifying visits likely to end with a recorded complaint.",
      "The experience consists of past visits for which there has been time to observe the answer.",
      "Our measure should reflect what matters to the clinic, such as the share of eventual complaints reached.",
      "With complaints in about fifteen percent of visits, predicting no complaint everywhere gets about eighty-five percent right."
    ]},
    { id: "s17", kind: "kinds", heading: "What answer does the learner receive?", lines: [
      "Imagine three teams opening the same clinic file with different information available to guide their work.",
      "Learning from visits with known complaint outcomes is called supervised learning because the training cases supply an answer key.",
      "Grouping visits by their similarities without giving the computer an answer key is called unsupervised learning.",
      "A third approach called reinforcement learning uses rewards following actions to improve a sequence of decisions.",
      "For our complaint prediction question we have an answer key, so we can follow the supervised route."
    ]},
    { id: "s27", kind: "lesson", heading: "Group visits without a complaint label", lines: [
      "Suppose Al Waha wants to understand the kinds of work that tend to arrive together at the front desk.",
      "Put each visit on a map using its waiting time across the page and its number of handoffs up the page.",
      "Two nearby dots now stand for visits that look alike on those two measurements.",
      "An analyst might ask the computer to gather neighbouring dots around a few representative centres.",
      "This way of looking for groups is called clustering.",
      "A centre summarises the visits assigned to it and makes it easier to describe a typical workload.",
      "Moving the centres can change which group receives a visit near the edge between two groups.",
      "Measuring waits in seconds instead of minutes could also change the groups if raw distances were used.",
      "The clinic would need to check whether staff recognise those patterns before giving the groups operational names."
    ]},
    { id: "s18", kind: "features", heading: "Read one row as one visit", lines: [
      "Read across any one of the five real visits shown here to see what a single example contains.",
      "Inputs such as wait, staffing and earlier visits are called features when we use them to make a prediction.",
      "The answer we want to predict is the label, and predicting a category such as complaint status is called classification.",
      "If the answer is a numerical satisfaction score, the task of predicting its value is called regression.",
      "In the course code capital X holds the input columns and lower-case y holds the selected answers."
    ]},
    { id: "s28", kind: "lesson", heading: "Decide when the prediction is made", lines: [
      "Imagine a member of the Al Waha team opening a review list just as a patient finishes waiting.",
      "Draw a line through that moment on the timeline of the visit.",
      "The completed waiting time is now available to someone standing at that line.",
      "A satisfaction questionnaire filled in after the visit belongs on the far side of the line.",
      "A final handoff count also needs a time stamp before we can decide which side it belongs on.",
      "If the team moved the decision to check-in, even the completed waiting time would still lie in the future.",
      "Write the prediction moment into the study question so that two researchers would build the same input record.",
      "Then specify how long staff will look for a complaint before assigning the visit its final answer.",
      "A visit still inside that follow-up window needs more time before its silence can count as an observed negative."
    ]},
    { id: "s10", kind: "goals", heading: "What question will the thesis answer?", lines: [
      "The same visit file can support two quite different questions about waiting.",
      "One researcher might ask how strongly waiting time is associated with the chance of a recorded complaint.",
      "Another might ask how well today’s available information identifies tomorrow’s visits that will end with complaints.",
      "The wording of the question tells us whether an estimated relationship or performance on new visits belongs in the results."
    ]},
    { id: "s11", kind: "check", heading: "Understanding a relationship or making a prediction?", split: 1, lines: [
      "Read the two questions as if each were the first sentence of a thesis and choose its purpose.",
      "The first question asks about a relationship between waiting time and the chance of a complaint.",
      "The second asks for a prediction about patients whose complaint outcomes are still in the future."
    ]},
    { id: "s19", kind: "split", heading: "Reserve a final group before fitting", lines: [
      "For the modelling exercises we switch to five thousand two hundred cleaned episodes after duplicate records were removed.",
      "Three thousand nine hundred episodes form the development pool where we can practise fitting models and making choices.",
      "The other thirteen hundred episodes form a test set whose answers stay sealed while those choices are made.",
      "After every choice is fixed, the test set gives us a check on similar unseen episodes from this source.",
      "Scoring a rule on the visits that shaped it gives those visits a second chance to influence its apparent success."
    ]},
    { id: "s29", kind: "lesson", heading: "Give fitting, choosing and checking different rows", lines: [
      "Inside the development pool, imagine giving some records to a builder and others to a colleague judging the work.",
      "The builder uses the training records to fit each candidate rule to a set of known outcomes.",
      "The colleague keeps a different collection of visits aside for choosing between the candidates.",
      "We call that second collection a validation set because its purpose is to guide a development decision.",
      "Both colleagues leave the final test envelope closed throughout their discussion.",
      "Choose the model settings and the cut-off using the development evidence and the clinic’s stated priorities.",
      "If the plan calls for fitting the chosen model again, use the development pool and the already agreed settings.",
      "Freeze the complete procedure before making predictions for any row in the sealed envelope.",
      "Opening that envelope to change a setting would turn it into another source of validation feedback."
    ]},
    { id: "s30", kind: "leak", heading: "Inspect the information available at discharge", wait: true, lines: [
      "For this exercise Al Waha scores a visit at discharge and watches for a complaint recorded afterwards.",
      "The completed waiting time can enter the score because its value already exists at discharge.",
      "The date a complaint was closed carries information from the investigation that followed the outcome.",
      "A model given that date might appear unusually skilled because somebody has quietly supplied part of the answer.",
      "Information crossing the boundary like this is called data leakage.",
      "A subtler leak occurs if we fill missing values using an average calculated across every visit before splitting.",
      "That average gives the training process a little information about the distribution of its future evaluation cases.",
      "Pick the record field that should be excluded at discharge and read the reason beside your choice."
    ]},
    { id: "s31", kind: "lesson", heading: "Keep related records together", lines: [
      "Imagine seeing the same hospital episode twice because two exports from the records system partly overlapped.",
      "If one copy lands in training and the other in evaluation, recognising an old record can look like successful prediction.",
      "Removing duplicate episodes before the split protects against that particular shortcut.",
      "Now consider two genuinely different visits made by the same person during the study.",
      "If the research question concerns entirely new patients, assign all visits from each patient to the same group.",
      "A different question concerns next winter’s clinic after a change to the way the desk books appointments.",
      "For that question, train on the earlier period and reserve the later period for an evaluation in time order.",
      "Even within the earlier period, allow each training outcome enough time to become known before the evaluation period begins.",
      "State the unit and dates of the split so a reader knows precisely what kind of new case was simulated."
    ]},
    { id: "s32", kind: "lesson", heading: "Grow a decision tree one question at a time", lines: [
      "Imagine sorting a small teaching set of clinic visit cards into piles that a receptionist could describe aloud.",
      "Begin with all the cards together and look at the mixture of complaint and no-complaint marks.",
      "Ask a question about waiting time whose answer can send every card to one of two piles.",
      "Visits on the shorter side travel left and visits on the longer side travel right.",
      "On the longer-wait side we might ask a second question about the number of handoffs already recorded.",
      "Joining these questions with branches gives us a decision tree.",
      "A group where we stop asking questions is called a leaf.",
      "The share of training complaints in a leaf can supply a simple estimate for another visit reaching that leaf.",
      "Follow the highlighted route to see why a new visit answers only the questions along its own branch."
    ]},
    { id: "s33", kind: "splitlab", heading: "Which question makes the groups clearer?", wait: true, lines: [
      "These six invented teaching cards have been arranged from the shortest wait to the longest wait.",
      "The letters on the cards tell us which of these imaginary visits ended with a complaint.",
      "Try a divider after the second card and inspect the mixture of answers on both sides.",
      "A group with only one kind of answer is especially simple to describe.",
      "One way to measure a group’s mixture is the chance that two independent draws with replacement have different answers.",
      "For two categories that chance equals twice the complaint share times the no-complaint share, a measure called Gini impurity.",
      "Give each child group a weight equal to its share of all the cards before adding the two impurities.",
      "Training prefers the candidate with the largest reduction from the original group’s impurity.",
      "Move the divider to find the split with the smallest weighted mixture among the positions offered here."
    ]},
    { id: "s34", kind: "lesson", heading: "When one answer is too simple", lines: [
      "Imagine insisting that every clinic visit must finish in the very same leaf.",
      "The tree can then learn an overall complaint rate but has no way to distinguish one waiting time from another.",
      "That restriction can give similar errors across many different samples of training visits.",
      "We call the problem underfitting when the rule lacks the flexibility to capture a useful pattern.",
      "Allowing a first question gives the tree a chance to distinguish a shorter wait from a longer one.",
      "At the other extreme, enough questions can leave a single training episode sitting in a leaf by itself.",
      "One recorded complaint would then give that leaf an estimated complaint share of one hundred percent.",
      "Requiring a minimum number of training visits per leaf makes such an extreme estimate harder to obtain.",
      "Choose that minimum using validation visits that played no part in constructing the candidate leaves."
    ]},
    { id: "s35", kind: "lesson", heading: "Would a different sample change the answer?", lines: [
      "Picture fitting the same kind of rule to several fresh samples from an otherwise unchanged Al Waha clinic.",
      "For one fixed waiting time, place a dot where each fitted rule puts the estimated complaint chance.",
      "Imagine a teaching target showing the underlying chance that we would like those estimates to recover.",
      "If the average dot lands away from that target, the procedure has systematic error called bias.",
      "If individual dots scatter widely around their own average, the procedure has high variance.",
      "A very rigid rule can put its dots close together while repeatedly missing the target in the same direction.",
      "A highly flexible tree can change its branches when just a few training visits are replaced.",
      "Neither the hidden target nor this collection of repeated samples is available in our single clinic file.",
      "We examine performance on fresh records to judge the practical cost of these competing sources of error."
    ]},
    { id: "s22", kind: "confusion", heading: "Put each visit in one of four boxes", lines: [
      "Return to the original waiting-time file and compare the ninety-minute rule with the complaint recorded for each visit.",
      "Among the seven hundred and fifty-eight complaints the rule flags six hundred and five and misses one hundred and fifty-three.",
      "Among visits without a complaint it flags two hundred and nine and leaves four thousand two hundred and thirty-seven unflagged.",
      "The same four boxes let us ask which share of complaints we reached and which share of our calls found a complaint.",
      "This table of predicted and observed categories is called a confusion matrix."
    ]},
    { id: "s36", kind: "lesson", heading: "Choose the denominator before naming the measure", lines: [
      "Imagine that the quality director and the telephone supervisor have asked for different numbers from our four boxes.",
      "The director starts with every visit that actually produced a complaint, including the ones nobody flagged.",
      "Of those seven hundred and fifty-eight visits the rule reached six hundred and five, giving about eighty percent recall.",
      "The telephone supervisor starts with the eight hundred and fourteen visits that would have appeared on the call list.",
      "Of those flagged visits the same six hundred and five had a recorded complaint, giving about seventy-four percent precision.",
      "For overall correctness we count both the complaints flagged and the visits correctly left off the list.",
      "Dividing that total by all visits gives about ninety-three percent accuracy against a complaint base rate of about fifteen percent.",
      "Before reporting a percentage, finish the phrase out of all what so that the reader can reconstruct your denominator."
    ]},
    { id: "s14", kind: "trap", heading: "Would an always-quiet rule serve the clinic?", split: 2, lines: [
      "Model A leaves every visit unflagged while model B flags visits with waits longer than ninety minutes.",
      "Choose the rule you would investigate if the clinic wants to reach some of the visits that end in complaints.",
      "With a complaint base rate near fifteen percent, model A gets about eighty-five percent right while catching no complaints.",
      "Against that same base rate model B gets roughly ninety-three percent right and reaches six hundred and five complaints.",
      "A manager can now weigh the missed complaints against the two hundred and nine additional calls to visits without complaints."
    ]},
    { id: "s37", kind: "lesson", heading: "Combine precision and recall", lines: [
      "Suppose the review team wants one summary that rewards both finding complaints and keeping the call list relevant.",
      "Precision alone could make a very short list look attractive even if it reached only a handful of complaints.",
      "Recall alone would reward calling everyone because every recorded complaint would appear somewhere on that list.",
      "A measure called the F one score combines precision and recall through their harmonic mean.",
      "This mean is pulled towards the smaller of its two inputs, so a strong value for one cannot hide a very weak other.",
      "For a table of counts, double the hits and divide by twice the hits plus false alarms plus misses.",
      "For the ninety-minute rule this gives about seventy-seven percent using the original counts before rounding.",
      "Correctly unflagged visits never enter that calculation, so keep all four counts available beside the summary.",
      "If missing a complaint carries a particular cost to the clinic, state that cost separately when defending the policy."
    ]},
    { id: "s38", kind: "lesson", heading: "What if complaints become rarer?", lines: [
      "The share of visits with the outcome before any model is applied is called the base rate.",
      "In Al Waha’s waiting-time file roughly fifteen visits per hundred end with a recorded complaint.",
      "When one outcome is much less common than the other, we say the classes are imbalanced.",
      "Imagine a teaching clinic with many more visits without complaints for every visit with one.",
      "Keep the same fraction of complaints caught and the same fraction of quiet visits mistakenly flagged.",
      "Each extra group of quiet visits now contributes additional false alarms to the call list.",
      "With fewer true complaints among those calls, precision falls even though both group-specific flagging rates stayed fixed.",
      "A manager transporting a rule to another clinic should therefore check the local base rate before estimating staff workload.",
      "Report the base rate beside accuracy so the reader can compare the rule with always guessing the common outcome."
    ]},
    { id: "s39", kind: "roclab", heading: "Trace a curve by moving the cut-off", wait: true, lines: [
      "Start with a rule so strict that nobody appears on the call list and both coordinates are zero.",
      "As the waiting-time cut-off falls, some newly flagged visits have complaints and some have none.",
      "Measure progress upwards as the fraction of all recorded complaints that have now been caught.",
      "Measure movement to the right as the fraction of all visits without complaints that have now been falsely flagged.",
      "That horizontal fraction uses every visit without a complaint as its denominator.",
      "Each pair of fractions places the current rule at one point on a plot.",
      "Joining points across cut-offs traces a receiver operating characteristic curve, usually called an R O C curve.",
      "Try the ninety-minute point and compare the height of its marker with its distance from the left edge.",
      "These displayed cut-offs sample the curve for waiting time across the original visit file."
    ]},
    { id: "s40", kind: "lesson", heading: "Read the area as a ranking question", lines: [
      "Imagine drawing one visit that ended with a complaint and one visit that ended without one.",
      "Cover their recorded outcomes and rank the two visits by the scores the model would have issued.",
      "Give the model one point if the complaint visit receives the higher score.",
      "Give it half a point for a tie and zero when the complaint visit receives the lower score.",
      "Average that credit over every possible complaint and no-complaint pair in the evaluation group.",
      "The result is the area under the R O C curve, often shortened to A U C.",
      "A value of one means every pair was in the correct order, while random ordering averages one half.",
      "Ranking stays the same if we raise every score in a way that preserves their order.",
      "That is why this area alone cannot tell the clinic how many phone calls to make at discharge."
    ]},
    { id: "s20", kind: "overfit", heading: "Read an archived tree experiment", lines: [
      "In the cleaned readmission example the outcome is a return to hospital within thirty days.",
      "Allowing more questions eventually gives the fully grown tree perfect ranking on its own training episodes.",
      "On the archived test episodes that same tree has an area under the curve of only about zero point five six.",
      "Such a large gap is evidence of overfitting because distinctions learned in training travel poorly to fresh episodes.",
      "Use validation to decide depth in a new study and reserve a fresh test set for its final check."
    ]},
    { id: "s21", kind: "depth", heading: "Explore what a deeper tree remembers", wait: true, lines: [
      "Move the depth control to see how the number of final groups changes in the readmission experiment.",
      "Compare the training and archived test curves at the fully grown end to describe the gap left by memorising training examples."
    ]},
    { id: "s25", kind: "cv", heading: "Rotate the job of validation", lines: [
      "Within development we can give each part of the data a turn at judging a rule built on the other parts.",
      "In five-fold cross-validation we make five groups and hold a different one aside for validation on each round.",
      "The course readmission example has five ranking scores averaging about zero point seven two.",
      "In a fresh study, run those development rounds before the final fit and the single test evaluation.",
      "In Python the fit method learns the rule and the prediction method applies the fitted rule to other visits."
    ]},
    { id: "s41", kind: "foldlab", heading: "Follow one visit through five rounds", wait: true, lines: [
      "Think of the development records as five trays with a named visit card sitting in tray C.",
      "In the first round the builder uses trays B through E while tray A supplies the validation answers.",
      "The card from tray C helps to fit the rule in this round.",
      "Move to the third round and tray C changes jobs.",
      "This time the builder learns every step from the other four trays before predicting the card you are following.",
      "Save that prediction beside the card so that you can later inspect an error made while it was held out.",
      "By the end each development visit has one such prediction for each fixed candidate procedure.",
      "Fold scores can differ because the mixtures of easier and harder visits differ between trays.",
      "Step through the remaining rounds and check that the final test envelope never enters any of them."
    ]},
    { id: "s23", kind: "algos", heading: "Four ways to turn visits into scores", lines: [
      "An algorithm is the procedure we follow to fit a rule from examples.",
      "Logistic regression builds a smooth estimate of the chance of a complaint from the features supplied to it.",
      "A decision tree asks questions in sequence until a visit reaches a group with an estimated complaint chance.",
      "A random forest averages predictions from many trees built with varied training samples and candidate features.",
      "Nearest neighbours estimates risk from the outcomes of past visits whose features are closest to the new visit.",
      "Different procedures deserve a comparison on the same validation visits using a measure agreed in advance."
    ]},
    { id: "s42", kind: "lesson", heading: "Give competing algorithms the same exam", lines: [
      "Suppose one Al Waha researcher wants a simple waiting-time curve and another wants a more flexible learning procedure.",
      "Agree on the outcome and the prediction moment before assigning the researchers their development records.",
      "Give both procedures exactly the same eligible visits, input information and validation folds for a comparison of algorithms.",
      "If one model receives extra features, describe that as a comparison of complete strategies with different information.",
      "In every fold, learn the values used for replacing missing measurements from that fold’s training rows.",
      "Apply the fitted replacement rule unchanged to the validation rows even when their average waiting time is different.",
      "Treat choices about scaling and model settings as part of each procedure’s development work.",
      "Compare performance on paired visits using the same measure and a comparable opportunity for tuning.",
      "Settle the choice on development evidence before anyone opens the envelope containing final test outcomes."
    ]},
    { id: "s24", kind: "audit", heading: "Audit an archived comparison", wait: true, lines: [
      "Choose an outcome to inspect the fitted algorithms in the archived Al Waha comparison.",
      "Read across one row to see what happened to its ranking score between training and the recorded test evaluation."
    ]},
    { id: "s43", kind: "lesson", heading: "Turn a score into a feasible call list", lines: [
      "A ranking tells Al Waha which visits to review first, but somebody still needs to decide where the list ends.",
      "Put the waiting-time rule at one hundred and ten minutes and count the four hundred and seven visits it flags.",
      "Moving the line down to ninety minutes produces eight hundred and fourteen flagged visits in the same historical file.",
      "The longer list reaches an additional two hundred and twenty-five complaints.",
      "It also adds one hundred and eighty-two calls to visits with no recorded complaint.",
      "Those differences describe the work the rule would have assigned under each policy in this file.",
      "To plan a real shift the manager also needs to know how many eligible visits arrive during that shift.",
      "For a fitted classifier, use development predictions to choose a cut-off under the clinic’s capacity or cost assumptions.",
      "Lock that cut-off with the model so the test result measures the policy the clinic actually proposed."
    ]},
    { id: "s44", kind: "lesson", heading: "Can a score be read as a chance?", lines: [
      "Imagine that several visits each receive an estimated complaint chance close to one in five.",
      "If the numerical chances are reliable, around one visit in five in a large group like this should produce a complaint.",
      "Agreement between predicted chances and observed frequencies is called calibration.",
      "Group comparable predictions and mark each group’s mean estimated chance along the horizontal axis.",
      "Place the fraction of actual complaints in that group on the vertical axis.",
      "A point below the diagonal means the predicted chances were higher than the observed fraction in that group.",
      "Even a model that puts every visit in the same rank order can become poorly calibrated when its scores are stretched.",
      "At Al Waha that matters if staff use predicted probabilities to estimate the total number of complaints to expect.",
      "Show the number of visits behind each point because a small group can move a long way by chance."
    ]},
    { id: "s45", kind: "lesson", heading: "A test result has sampling uncertainty", lines: [
      "Suppose two frozen complaint rules are scored on the same reserved Al Waha visits.",
      "Some of the difference between their scores may reflect which visits happened to enter the evaluation.",
      "For a study of independent patients, one way to explore that uncertainty is to sample patients again with replacement.",
      "Carry each patient’s outcome and both predictions together each time that patient is drawn.",
      "Calculate the chosen performance difference for every resampled evaluation group.",
      "The spread of those differences can be used to construct a bootstrap confidence interval under the sampling assumptions.",
      "When several visits belong to one patient, resample whole patients together to preserve their related observations.",
      "In a report, give the interval method and the unit sampled so another researcher can reproduce it.",
      "This exercise describes evaluation uncertainty for the fitted rules and leaves changes across hospitals as a separate question."
    ]},
    { id: "s46", kind: "lesson", heading: "Write the classifier paragraph in a thesis", lines: [
      "Begin by naming the population, the outcome window and the moment Al Waha staff would receive a score.",
      "Give the number of eligible episodes and explain exclusions that change the population represented by the results.",
      "Identify the prediction inputs and explain how missing values were handled inside the development procedure.",
      "Describe the split, the unit kept together and the validation process used to settle settings and the action threshold.",
      "Name the positive category explicitly so readers know what counts as a hit in the test table.",
      "Give the test outcome count and base rate beside accuracy with the numerator and denominator for each percentage.",
      "Report the four error-table counts, precision and recall at the locked threshold together with an uncertainty interval for your primary measure.",
      "Describe ranking across thresholds and calibration separately if the study claims that its scores can be read as probabilities.",
      "Conclude with the practical consequences of missed visits and extra calls in the population you actually evaluated."
    ]},
    { id: "s47", kind: "claim", heading: "Which sentence belongs in the results?", wait: true, lines: [
      "Imagine a coauthor describing the original ninety-minute rule in the results section of your thesis.",
      "Underline the population in the sentence so the reader can tell whether the figures came from development, test or a descriptive file.",
      "Check the denominator to make sure the sentence is about actual complaints rather than everybody receiving a call.",
      "A record of who complained after a longer wait cannot tell us what would have happened if that same visit had been shorter.",
      "A claim that an intervention prevented complaints would need a study designed to estimate the effect of that intervention.",
      "Choose the sentence that identifies the observed file and states exactly what the waiting-time rule counted."
    ]},
    { id: "s08", kind: "uses", heading: "Recognise the same question in other quality settings", lines: [
      "Listen for the decision that each quality team hopes to make with a prediction.",
      "A maintenance team can use sensor readings to decide which machine deserves inspection before a possible breakdown.",
      "A camera system can flag a suspected surface defect for a second look on a production line.",
      "At our clinic staff could prioritise a courtesy call using the information already recorded by discharge.",
      "A forecast of tomorrow’s visits can help a manager plan staffing before the doors open.",
      "Teams can also look for unusual sensor readings or group written comments by the topics people raise."
    ]},
    { id: "s09", kind: "history", heading: "Where these ideas came from", lines: [
      "The idea of learning a rule from examples predates the laptop on the clinic desk by many decades.",
      "Early models of connected computing units helped lead to a simple learner called the perceptron in the nineteen fifties.",
      "Arthur Samuel gave the field its familiar name in work on computer checkers in nineteen fifty-nine.",
      "Later researchers developed practical ways to train layered networks and to combine many decision trees.",
      "Large modern networks can learn patterns in images and in language from very large collections of examples.",
      "Faster computation and larger datasets helped these earlier ideas reach many more everyday tasks."
    ]},
    { id: "s48", kind: "lesson", heading: "Transfer the design to readmissions", lines: [
      "Before leaving the clinic, try changing the research question from a recorded complaint to a return within thirty days.",
      "Discharge is a plausible moment for choosing which visits a follow-up team should review.",
      "List only inputs that would really be known to that team when the patient leaves.",
      "Keep enough follow-up time after discharge to identify the thirty-day outcome for every evaluation episode.",
      "In the cleaned course example about twenty-two percent of episodes led to readmission, a different starting point from complaints.",
      "Compare a simple model with a forest using the same development folds and the same definition of a return.",
      "State what a missed readmission and a follow-up call without a readmission each mean for this particular service.",
      "Use the final held-out evaluation to describe performance at the previously chosen threshold.",
      "The study can tell the team which visits it might reach, while the benefit of acting on the list requires its own evaluation."
    ]},
    { id: "s15", kind: "quiz", heading: "Chapter quiz · fourteen questions", wait: true, lines: [
      "Work through fourteen questions and use the explanation after each answer to check your reasoning."
    ]},
    { id: "s16", kind: "takeaways", heading: "Four ideas to take back to the clinic", lines: [
      "Think back to the manager who needed to decide which visits to put on tomorrow’s call list.",
      "A model learns a predictive rule from information and outcomes observed on past visits.",
      "Useful flexibility helps that rule recognise shapes such as the sharp rise in the longer waiting-time bands.",
      "Missed complaints and additional calls give different meanings to the same percentage of correct predictions.",
      "Let the research question guide the comparison and keep final evaluation visits apart from every development decision.",
      "And when no answer key is available, unsupervised methods can still look for natural groups among the visits themselves."
    ]}
  ],
  // Descriptive waiting-rule cohort from the lecture: 5,204 valid waits.
  // [minutes, flagged, hits, misses, false alarms, accuracy percent]
  cutoffs: [[20,5083,748,10,4335,16.5],[30,4596,731,27,3865,25.2],[40,3744,712,46,3032,40.9],[50,2904,695,63,2209,56.3],[60,2160,681,77,1479,70.1],[70,1557,665,93,892,81.1],[80,1133,652,106,481,88.7],[90,814,605,153,209,93.0],[100,565,493,265,72,93.5],[110,407,380,378,27,92.2],[120,282,269,489,13,90.4],[130,209,198,560,11,89.0],[140,149,140,618,9,88.0],[150,103,95,663,8,87.1]],
  quiz: [
    { q: "Which training task has a supplied answer for every example?",
      o: ["Finding groups of visits with similar waits", "Predicting complaints from visits with known outcomes", "Grouping comments by the words they share", "Mapping similarities among clinics"], a: 1,
      why: "Complaint status supplies the answer used to fit the rule. Grouping visits can proceed without those answers." },
    { q: "What do the original Al Waha waiting bands show?",
      o: ["Every extra minute adds the same risk", "All short waits are complaint-free", "Complaints rise steeply in the bands beyond 80 minutes", "Complaints fall beyond two hours"], a: 2,
      why: "The 80–90 minute band has a 14.8% complaint rate, up from 3.1% at 70–80 minutes. This describes an association in the waiting-time file." },
    { q: "Moving the cut-off from 110 to 60 minutes does what in the waiting-time file?",
      o: ["Catches more complaints and adds false alarms", "Catches fewer complaints and adds calls", "Leaves the same call list", "Catches more complaints with fewer calls"], a: 0,
      why: "Hits rise from 380 to 681. False alarms rise from 27 to 1,479." },
    { q: "Complaints occur in 14.6% of visits. How can a rule be 85.4% accurate and miss every complaint?",
      o: ["It makes no mistakes", "It has high precision", "It has high recall", "It always predicts no complaint"], a: 3,
      why: "The 85.4% without complaints supply all its correct answers. Recall is zero." },
    { q: "Which claim can the original 90-minute waiting rule support?",
      o: ["Shortening a wait prevents a complaint", "Calling a flagged visit prevents readmission", "It flags 605 of the 758 recorded complaints in that file", "It will catch exactly 605 complaints next year"], a: 2,
      why: "The tally describes predictions against recorded outcomes in the observed file. An intervention effect requires a different design." },
    { q: "An archived tree has training AUC 1.000 and test AUC 0.558. Which interpretation fits?",
      o: ["Perfect training ranking guarantees precise probabilities", "The training distinctions transfer poorly to these held-out visits", "Use the archived test scores to select a new depth", "All tree algorithms fail for readmissions"], a: 1,
      why: "The gap is consistent with overfitting. Select depth using development validation in a fresh comparison." },
    { q: "Where should the clinic choose the operating threshold?",
      o: ["On final test outcomes after reporting", "On the entire dataset before splitting", "On whichever patients give the highest accuracy", "On development validation predictions using the stated cost or capacity"], a: 3,
      why: "Fix the threshold before final evaluation so the test describes one specified policy." },
    { q: "The 90-minute rule reaches 605 of 758 complaints. Which measure is this?",
      o: ["Recall", "Precision", "Accuracy", "F1"], a: 0,
      why: "Recall uses all actual complaints. Precision uses all 814 flagged visits." },
    { q: "Which input leaks information into a score issued at discharge for a later complaint?",
      o: ["Wait recorded at discharge", "Number of previous visits", "Date that the later complaint investigation closed", "Staffing at check-in"], a: 2,
      why: "The closure date becomes available only after the outcome." },
    { q: "How should a tree compare a candidate split with two unequal children?",
      o: ["Count only the larger child", "Weight each child’s impurity by its fraction of parent rows", "Always prefer equal-sized groups", "Use final test answers to choose the split"], a: 1,
      why: "The weighted child impurity measures the remaining mixture for a randomly drawn parent row." },
    { q: "Which counts enter the F1 score for complaints?",
      o: ["Only correctly unflagged visits", "All four counts equally", "Only missed complaints", "Hits, false alarms and misses"], a: 3,
      why: "F1 = 2 × hits / (2 × hits + false alarms + misses). The ninety-minute rule yields about 0.77." },
    { q: "What does ROC AUC measure, allowing half credit for ties?",
      o: ["How often a randomly drawn complaint ranks above a randomly drawn non-complaint", "How close predicted probabilities are to observed rates", "How many calls fit in one shift", "Accuracy at a single threshold"], a: 0,
      why: "AUC averages ranking credit over positive–negative pairs. Calibration and workload answer different questions." },
    { q: "In five-fold development validation, when is a visit used to judge a fixed candidate?",
      o: ["After taking part in that round’s fitting", "Whenever its prediction looks difficult", "Once, in its held-out fold", "Five times as a final test case"], a: 2,
      why: "Each visit is held out once and takes part in training in the other four rounds." },
    { q: "Which comparison best isolates the effect of choosing a different algorithm?",
      o: ["Give the forest extra predictors and different visits", "Keep eligible visits, inputs, validation folds and primary measure the same", "Tune only the more complex algorithm on the final test", "Choose whichever metric gives the largest advantage"], a: 1,
      why: "Paired evaluations with the same information and comparable tuning opportunities give a fairer comparison." }
  ]
};
