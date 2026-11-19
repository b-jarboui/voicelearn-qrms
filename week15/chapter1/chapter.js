// PHQM830 Week 15 · Chapter 5 "Evidence synthesis and responsible reporting"
// One scene = one audio file. One sentence = one animation step.
// Revised and expanded for the full 90-minute doctoral session (49 scenes, 11 interactive scenes, 14 quiz questions).
window.CHAPTER = {
  course: "PHQM830 Quantitative Research Methods and Statistics",
  week: "",
  title: "Evidence synthesis and responsible reporting",
  subtitle: "Several answers to one question, and the one you would defend",
  scenes: [
    { id: "s01", kind: "title", heading: "Putting the evidence together", lines: [
      "Welcome to evidence synthesis and responsible reporting.",
      "Across many different methods, we can ask one question of one dataset: what is related to patient satisfaction at Al Waha?",
      "Those methods yield several answers to that question. Here, you put them side by side, and choose the one you would defend."
    ]},
    { id: "s02", kind: "term", heading: "The toolkit on one page", lines: [
      "Here is the full quantitative toolkit on one page.",
      "Foundations: what a sample is, what a formula says, what a p value is worth, and how to read your own code.",
      "Classical models: group comparisons, simple lines, adjusted lines, and probabilities.",
      "Machine learning and text: honest held-out scoring, groups nobody labelled, words as variables, and a model whose weights you cannot read.",
      "One dataset throughout. One topic. Here, the answers meet."
    ]},
    { id: "s03", kind: "many", heading: "One topic, many methods", lines: [
      "Look at what you have now, all about the same episodes.",
      "A group comparison. Two regressions. A classifier. A clustering. A text model. And a neural network.",
      "They answer different questions. They assume different things. And they are judged by different standards.",
      "So the question is never: which model is best? It is: which question was I asking, and which result answers it?"
    ]},
    { id: "s23", kind: "estimand", heading: "Naming the target first: estimand, estimator, and estimate", lines: [
      "Imagine three archers aiming at three different targets on a wall. You cannot judge an arrow until you know which target the archer was aiming at.",
      "In data analysis, we often jump straight to the calculation and forget to name the target we were trying to measure.",
      "At Al Waha hospital, asking how much average satisfaction differs between short and long waits is one target. Asking how much satisfaction changes per ten minutes of waiting when staffing and occupancy are held fixed is a second target.",
      "Statisticians call that target the estimand. An estimand is the exact quantity in the population or process that your research question asks for, stated before you choose a model.",
      "Once you name the estimand, you choose an estimator. An estimator is the rule or method used to calculate an answer from data, such as ordinary least squares regression or a sample mean difference.",
      "When you apply that estimator to the five thousand two hundred Al Waha episodes, the number that comes out is the estimate. Minus one point two three points per ten minutes is an estimate.",
      "Keep the three words distinct: the estimand is the target you aim at, the estimator is the tool you use, and the estimate is the number you obtain from your sample.",
      "When two analyses produce different estimates on the same hospital dataset, ask first whether they were aiming at different estimands."
    ]},
    { id: "s24", kind: "estimand3", heading: "Three different estimands for Al Waha waiting time", lines: [
      "Let us look closely at three distinct estimands we might care about when studying waiting time at Al Waha.",
      "The first target is the total marginal association. How much lower is satisfaction per ten minutes of waiting across routine clinic visits, letting everything else vary naturally as it does in the hospital?",
      "The simple regression with waiting time alone estimated this first target at minus three point zero one points per ten minutes. It captures waiting time together with the crowded wards and stretched shifts that travel alongside long waits.",
      "The second target is the conditional association. How much lower is satisfaction per ten minutes of waiting when we compare episodes that have the same bed occupancy, staffing, handoffs, and training?",
      "The adjusted regression with six predictors estimated this second target at minus one point two three points per ten minutes. It isolates the association of waiting among episodes that match on the other five measured predictors.",
      "The third target is the causal effect of an intervention. If hospital managers intervened tomorrow to cut every patient's wait by ten minutes without changing anything else, how much would satisfaction rise?",
      "Because our Al Waha dataset is observational, an unmeasured factor such as patient illness severity at arrival could still affect both waiting time and satisfaction.",
      "So minus one point two three estimates the conditional association, not the causal effect. Naming your estimand honestly prevents you from promising a causal gain that observational data cannot guarantee."
    ]},
    { id: "s04", kind: "five", heading: "One topic, five different questions", lines: [
      "Let us line up five answers on the same Al Waha dataset, each to its own question.",
      "Group comparison: do short and long waits differ? Yes: satisfaction is sixteen point four points higher after short waits, a large effect. But it says nothing about how much each extra minute matters.",
      "Simple regression: how much per ten minutes? Minus three points. But waiting may stand in for other things that come with it.",
      "Adjusted regression: and holding the other five predictors constant? Minus one point two per ten minutes. But only along a straight line.",
      "Clustering: are there profiles at all? Yes: the clusters are clearer than in shuffled data. But they were formed without the outcome, so on their own they say nothing about satisfaction.",
      "Neural network: what is the best prediction? About five points out on an average episode, an M A E of four point nine. But its weights cannot say why.",
      "Read the last column, not the third. What a result cannot say is the column an examiner asks about."
    ]},
    { id: "s05", kind: "match", heading: "Try it: which question does it answer?", wait: true, lines: [
      "Your turn. Each result answers its own question.",
      "Match every result to the question it answers. Then press Continue."
    ]},
    { id: "s06", kind: "slopes", heading: "Minus three, or minus one point two?", lines: [
      "Two numbers from the same data seem to disagree. Waiting goes with three points less satisfaction per ten minutes in the simple regression, and only one point two in the adjusted regression.",
      "The simple regression looked at waiting alone. Long waits come with other things: fewer staff, more handoffs, less training. So the minus three also carries whatever travels with waiting.",
      "The adjusted regression held the other five measured predictors constant. Minus one point two is the association of waiting with satisfaction among otherwise similar episodes. It is still not proof of cause: unmeasured factors remain.",
      "Neither number is wrong. They answer different questions. Your write-up must say which question you asked."
    ]},
    { id: "s25", kind: "triangulate", heading: "Triangulation: sighting one problem from different angles", lines: [
      "When a surveyor wants to locate a distant mountain peak, sighting it from one spot is never enough. Sighting it from two or three hills at different angles pins down its true position.",
      "In research synthesis, every statistical method has its own lens and its own blind spot. A linear regression sees straight slopes, a banded plot sees local averages, and a text model sees complaint words.",
      "At Al Waha, suppose we ask whether high bed occupancy is tied to lower patient satisfaction. We can inspect that question through four very different methods.",
      "First, the six predictor regression fits a straight downward slope across occupancy. Second, banded averages compute the mean satisfaction inside each five percent occupancy slice without assuming any line.",
      "Third, a neural network learns a flexible curve while holding the other five inputs at typical values. Fourth, text analysis of patient reviews counts negative words during crowded shifts.",
      "Using multiple methods with different assumptions to study the same phenomenon is called triangulation. When independent approaches with different blind spots point toward the same conclusion, they provide convergent evidence.",
      "Crucially, triangulation only strengthens your argument when the methods do not share the same fatal flaw. Combining two methods that make different assumptions tests whether your finding is an artifact of one formula.",
      "Let us see what happens when methods share the same assumption, versus when they are genuinely free to disagree."
    ]},
    { id: "s07", kind: "agree", heading: "Agreement can be worth nothing", lines: [
      "When several methods agree, it feels like strong evidence. Be careful.",
      "Fit several models that all assume a straight line. They will agree that the effect of occupancy is a straight line.",
      "That is not evidence. None of them could have found anything else.",
      "Now look at methods that could disagree. The banded averages fall steeply after eighty percent occupancy. The neural network, with the other inputs held at typical values, also bends down, after about eighty five percent, though less steeply.",
      "Agreement is evidence only when the methods could have disagreed. And here, the disagreement is worth more than the agreement."
    ]},
    { id: "s26", kind: "converge", heading: "Convergent evidence and when disagreement is the discovery", lines: [
      "Look closely at what the three curves on the Al Waha occupancy plot agree on, and where they part ways.",
      "Between sixty percent and eighty percent bed occupancy, the banded averages hover near eighty three points, and the neural network stays flat near seventy seven points.",
      "In that comfortable operating zone, moderate changes in bed occupancy have almost no relationship with patient satisfaction.",
      "Once occupancy passes eighty percent, however, the banded averages plunge from about eighty one points down to forty three points at full capacity. The network also bends sharply downward after eighty five percent, falling to about fifty six points.",
      "Why does the network fall less steeply than the unadjusted banded averages? Because the network holds waiting time and staffing at their median values, whereas the raw bands also carry the longer waits that happen when wards are full.",
      "Meanwhile, the linear regression predicts about eighty two points at sixty percent occupancy and sixty six points at one hundred percent, because it is forced to average a flat plateau and a steep cliff into one straight line.",
      "Here, convergent evidence between the bands and the network tells us that the occupancy relationship is non-linear, with a tipping point around eighty to eighty five percent.",
      "At the same time, the difference in steepness between the unadjusted bands and the adjusted network tells us that part of the high-occupancy drop comes through longer waits and tighter staffing. Synthesizing both gives a richer story than any single model."
    ]},
    { id: "s27", kind: "forest", heading: "Effect sizes and confidence intervals on a forest plot", lines: [
      "When you synthesize quantitative results in a thesis, listing p values in a paragraph hides the two things a reader needs most: how big each estimate is, and how uncertain it is.",
      "Imagine a chart where every analysis sits on its own horizontal row. A dot marks the point estimate, and a horizontal bar stretches left and right to show the ninety five percent confidence interval.",
      "This chart is called a forest plot. A vertical reference line marks zero, the point of no association, so your eye can compare the size, direction, and precision of several estimates at once.",
      "In the simple regression with waiting time alone, the unadjusted slope on the cleaned data is minus three point zero three points per ten minutes, with a ninety five percent confidence interval from minus three point one three to minus two point nine two.",
      "In the adjusted regression holding the other five predictors constant across the four thousand seven hundred and twenty four complete episodes, the slope is minus one point two three points per ten minutes, with a ninety five percent confidence interval from minus one point three one to minus one point one six.",
      "We can also plot the adjusted waiting slope estimated on separate subsets or alternative specifications. Every row stays in the exact same units: satisfaction points per ten minutes of waiting.",
      "Notice how much more informative the forest plot is than the word significant. You see immediately that adjusting for the other five predictors shifts the estimate more than halfway toward zero, yet the entire interval remains well below zero.",
      "In your results chapter, always pair every point estimate with its confidence interval in real units, so the reader can judge both statistical precision and practical importance."
    ]},
    { id: "s28", kind: "cishape", heading: "What makes a confidence interval wide or narrow?", lines: [
      "A confidence interval shows the range of values that remain compatible with your data under your model's assumptions. What makes that bar wide or narrow?",
      "First, sample size. With all five thousand two hundred cleaned Al Waha episodes, random sampling noise averages out, producing a tight interval around our estimate.",
      "In our group comparison of short and long waits, split at the fifty four point one minute cutoff, the mean difference is sixteen point three eight points, with a ninety five percent confidence interval from fifteen point six four to seventeen point one two points.",
      "If you repeat the same regression inside one small weekend clinic of only eighty episodes, the standard error grows and the confidence interval widens dramatically.",
      "Second, correlation among predictors, known as collinearity. When two predictors move closely together, the regression has less independent variation to separate their slopes, so both confidence intervals widen.",
      "Now look at why a p value alone misleads. In a massive dataset, a tiny estimate of minus zero point one points per ten minutes can have a tight interval that does not touch zero, making it statistically significant yet clinically trivial.",
      "Conversely, in a small ward subgroup, an estimate of minus one point five points can have a wide interval that crosses zero. Crossing zero does not prove waiting time has zero effect; it means the sample is too noisy to tell.",
      "Read the whole interval from one end to the other. Ask what the smallest and largest plausible values at the two ends of the bar mean for patients and managers at Al Waha."
    ]},
    { id: "s29", kind: "ciplay", heading: "Try it: explore the forest plot and interval width", wait: true, lines: [
      "Your turn. Change the sample size and the level of predictor correlation below the stage.",
      "Watch how the confidence interval widens and shrinks around the waiting-time estimate on the forest plot.",
      "Notice when an interval crosses zero or the one-point clinical threshold, then press Continue."
    ]},
    { id: "s08", kind: "mae", heading: "Mean absolute error, by hand", lines: [
      "One more error measure: mean absolute error, M A E. It is the error a reader can act on.",
      "Take four example prediction errors, real minus predicted: minus two, one, minus three, and six.",
      "Drop the signs: two, one, three, and six. Add them: twelve. Divide by four: three points.",
      "So M A E is three point zero, and R M S E is three point five four, for the same predictions.",
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
      "Our comparison script fits three models: one predictor, six predictors, and the network.",
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
    { id: "s30", kind: "paired", heading: "Comparing models fairly across repeated paired splits", lines: [
      "Suppose you want to know which of two runners is faster. If Runner A races uphill into a headwind on Monday and Runner B races downhill with a tailwind on Tuesday, comparing their times is useless.",
      "If both runners race side by side on the same track fifty Mondays in a row, windy days slow both runners down together, and calm days speed both runners up together.",
      "The same principle governs model comparison at Al Waha. Across fifty random splits, the six predictor regression's held-out R M S E moves across a range of zero point four six points, with a standard deviation of zero point one two.",
      "Why does a single model's score bounce so much from split to split? Because some random test sets happen to contain more unusual or hard-to-predict hospital episodes than others.",
      "When we evaluate the six predictor regression and the neural network on the exact same test rows in every split, a hard test set pulls both models up together, and an easy test set pulls both down together.",
      "Instead of comparing two separate clouds of scores, we compute the paired difference on each split: regression error minus network error on those identical rows.",
      "Across all fifty random splits of the cleaned Al Waha data, the paired difference in held-out R M S E between the six predictor regression and the neural network averages zero point nine two points, with a standard deviation of zero point one zero points.",
      "Reporting the average paired gain together with its spread across repeated splits proves that one model's advantage is genuine and not a lucky draw of test rows."
    ]},
    { id: "s31", kind: "cv", heading: "Cross-validation: giving every episode a turn in the test set", lines: [
      "A single seventy five to twenty five train-test split has a limitation: only one quarter of the five thousand two hundred Al Waha episodes ever get tested, while three quarters are used only for training.",
      "Can we test our models on every single episode in the dataset without ever letting a model peek at its own test rows?",
      "Yes. Divide the cleaned Al Waha dataset randomly into five equal slices, called folds, of about one thousand and forty episodes each.",
      "In round one, hold out Fold One as the test set, train both models on Folds Two through Five, and record their held-out M A E and R M S E on Fold One.",
      "In round two, hold out Fold Two as the test set and train on the other four folds. Repeat until all five folds have served as the held-out test set exactly once.",
      "This method is called k-fold cross-validation. Across ten folds on the cleaned Al Waha episodes, the six predictor regression achieves a cross-validated M A E of five point six seven points with a fold-to-fold standard deviation of zero point two zero, compared with four point nine three points and a standard deviation of zero point two one for the neural network.",
      "One rule is non-negotiable in cross-validation: every preparation step that learns from data, such as standardizing predictors or imputing missing values, must happen inside each training fold.",
      "If you scale or impute across the entire dataset before splitting into folds, information from the held-out fold leaks into training, and your cross-validated score is no longer honest."
    ]},
    { id: "s32", kind: "cvplay", heading: "Try it: single split versus paired cross-validation", wait: true, lines: [
      "Your turn. Switch between unpaired random splits, paired splits on the same rows, and cross-validation.",
      "Drag the split slider across the fifty real Al Waha splits to see how much split luck affects unpaired scores versus paired comparisons.",
      "When you have explored all three designs, press Continue."
    ]},
    { id: "s14", kind: "search", heading: "Report the search", lines: [
      "There is one more assumption behind every result you report: that it was not picked out of many.",
      "In a real study, you often fit dozens of models. You try different variables, settings, subgroups, and cleaning rules.",
      "If you report the best of forty analyses as if it were the only one, its effect looks larger, and its p value smaller, than they really are.",
      "So report the search: how many models, variables and subgroups you tried, and which choices you made after seeing the data. Label exploratory findings as exploratory, and confirm them on data you have not used."
    ]},
    { id: "s33", kind: "forking", heading: "The garden of forking paths", lines: [
      "Most researchers never sit down intending to cheat or falsify a result. Yet false discoveries fill published journals every month because of quiet choices made during data analysis.",
      "Think about what happened the moment you opened the Al Waha dataset. You had to decide what to do with bed occupancy values above one hundred percent: drop the rows, cap them at one hundred, or set them to missing.",
      "Next, you had to decide how to represent waiting time: raw minutes, tens of minutes, a logarithm, or a binary cutoff at thirty or forty five minutes.",
      "Then you had to choose which covariates to adjust for, whether to drop extreme residuals, and whether to test all episodes together or split by shift and ward.",
      "Each choice is a fork in a path. Even four reasonable binary decisions create two times two times two times two, or sixteen plausible ways to analyze the exact same research question.",
      "Statisticians Andrew Gelman and Eric Loken call this branching tree the garden of forking paths. Every single path through the garden can be defended after the fact as sensible.",
      "The danger arises when you look at the data, try several branches, and report only the branch that gave the clearest story or the smallest p value.",
      "Once your analytical path depends on the numbers you saw in the data, standard p values and confidence intervals lose their face-value meaning unless you disclose or test the whole tree."
    ]},
    { id: "s34", kind: "prereg", heading: "Pre-registration: locking the map before you see the score", lines: [
      "How do you prove to a skeptical examiner — and to yourself — that your main result was not selected after wandering through the garden of forking paths?",
      "Before an archer shoots, they must point to the target they intend to hit. Painting a bullseye around wherever the arrow happened to land is not marksmanship.",
      "In quantitative research, pointing to your target in advance is called pre-registration, or locking an explicit statistical analysis plan before inspecting outcome relationships.",
      "For an Al Waha study, a pre-registered plan states the primary research question, the exact estimand, the screening rules for impossible values, the six predictors in the primary model, and the evaluation metric.",
      "When you lock those choices in a time-stamped document before fitting the outcome model, your primary test is genuinely confirmatory. Its p value and confidence interval mean what they claim.",
      "Does pre-registration forbid you from exploring unexpected patterns, such as the non-linear bend in bed occupancy above eighty percent? Not at all.",
      "Science needs exploration to discover curves and patterns nobody anticipated. The rule is simply to separate confirmatory results, which followed your pre-planned protocol, from exploratory results, which emerged after inspecting the data.",
      "An exploratory finding openly labelled as exploratory is honest, valuable science. An exploratory finding dressed up as a pre-planned confirmation is a methodological failure."
    ]},
    { id: "s35", kind: "multitest", heading: "Multiple testing and false-alarm inflation", lines: [
      "Imagine rolling a fair twenty-sided die. The chance of rolling a twenty on a single toss is one in twenty, or five percent.",
      "That five percent is the exact same threshold as a standard significance level of alpha equals zero point zero five when a null hypothesis is actually true.",
      "Now suppose you roll that twenty-sided die twenty times in a row, looking for at least one twenty. The chance that at least one roll comes up twenty is not five percent; it is sixty four percent.",
      "In data analysis, every separate hypothesis test you run — across fifteen hospital wards, four shift types, or twenty pairs of variables — is another roll of the die.",
      "This problem is called multiple testing. Even if waiting time had zero true effect in a specific subgroup difference, running twenty independent tests at alpha equals zero point zero five gives a sixty four percent chance of at least one false alarm.",
      "When we test the waiting-time slope across the six clinical subgroups at Al Waha, the smallest p value is in the Emergency subgroup, at about nine point nine times ten to the minus eighty eight unadjusted, and six point zero times ten to the minus eighty seven after Bonferroni correction — a signal strong enough to survive correction easily.",
      "How do you protect your chapter against false alarms from multiple testing? First, designate one primary hypothesis in advance and treat subgroup checks as exploratory.",
      "Second, when you must judge several tests together, adjust your threshold — for instance with the Bonferroni correction, which divides alpha by the number of tests run, or by controlling the false discovery rate — and report every test you performed."
    ]},
    { id: "s36", kind: "forkplay", heading: "Try it: walk the garden of forking paths", wait: true, lines: [
      "Your turn. Choose a data-cleaning rule, a model specification, and whether to test the full sample or cherry-pick the most extreme subgroup.",
      "Watch how branching choices move the estimate and inflate the false-alarm risk on the stage.",
      "Try both a pre-planned confirmatory path and a cherry-picked path, then press Continue."
    ]},
    { id: "s37", kind: "sensitivity", heading: "Sensitivity analysis: testing whether conclusions hold up", lines: [
      "Even when you pre-register a sensible analysis plan, an examiner will ask: what if you had made a slightly different, equally reasonable decision at one of the forks?",
      "Think of an engineer testing a bridge design. They do not only check whether the bridge stands on a calm afternoon; they check whether it still stands under crosswinds, heavy trucks, and cold weather.",
      "In quantitative research, systematically re-running your analysis under alternative defensible choices is called a sensitivity analysis, or a robustness check.",
      "At Al Waha, our primary six predictor regression on cleaned data gives an adjusted waiting-time slope of minus one point two three points per ten minutes. Let us stress-test that finding across alternative choices.",
      "First, what if extreme waiting times are driving the line? When we trim the top one percent of longest waiting times at Al Waha, the adjusted slope shifts from minus one point two three to minus one point three three points per ten minutes.",
      "Second, what if the straight-line assumption for bed occupancy distorts the waiting slope? When we add a quadratic term for bed occupancy to capture the bend above eighty percent, the adjusted waiting-time slope becomes minus one point one six points per ten minutes.",
      "Third, what if we compare complete-case deletion against multiple imputation for the episodes where invalid occupancy or negative waits were set to missing?",
      "Plotting all of these alternative estimates and their confidence intervals together creates a specification curve. Instead of hiding the other paths in the garden, you lay them side by side on the page."
    ]},
    { id: "s38", kind: "fragile", heading: "Robust versus fragile findings on a specification curve", lines: [
      "When you lay five or six reasonable specifications side by side on a specification curve, one of two patterns will appear.",
      "In the first pattern, the point estimate nudges slightly from minus one point two three to minus one point one six or minus one point three three, and every confidence interval remains clearly on the negative side of zero.",
      "That is a robust finding. You can tell your examiner with confidence that the negative association between waiting time and satisfaction does not depend on one arbitrary cleaning cutoff or functional form.",
      "In the second pattern, removing three extreme rows or allowing occupancy to bend causes the estimate to collapse to zero or flip sign from negative to positive.",
      "That is a fragile finding. A fragile finding is not something to hide in a drawer; it is an essential warning that your data cannot support a firm conclusion on that variable.",
      "Notice how sensitivity analysis flips the logic of p-hacking on its head. P-hacking searches the garden in secret to report the single most dramatic branch.",
      "Sensitivity analysis walks the plausible branches in public to show whether the substantive conclusion survives across all of them.",
      "In your thesis chapter, include a dedicated subsection or table showing your primary specification alongside two or three pre-planned sensitivity checks."
    ]},
    { id: "s39", kind: "repro", heading: "Computational reproducibility: raw data to final table", lines: [
      "Imagine an examiner reading Table Four of your dissertation and asking a simple question: how did you get minus one point two three in row two?",
      "If your answer involves opening a spreadsheet where you deleted some rows by hand last autumn, pasting columns into a menu window, and typing numbers into a document, your work cannot be verified.",
      "The standard expected in modern doctoral research is computational reproducibility. Given the same raw dataset and your code script, another researcher — or you six months later — must obtain the exact same numbers, tables, and figures automatically.",
      "Rule one of reproducibility: never edit the raw data file. The original Al Waha CSV stays read-only in its folder, untouched by human hands.",
      "Rule two: every screening decision happens in code. Setting occupancy above one hundred percent and negative waiting times to missing is written as explicit Python lines, never done by deleting cells in a spreadsheet.",
      "Rule three: fix the random seed in code. Passing a fixed random state to your train-test split and neural network ensures that the split and initial weights are identical every time the script runs.",
      "Be careful to distinguish reproducibility from replicability. Reproducibility means the same data and the same code produce the exact same output.",
      "Replicability means collecting new data — such as next year's episodes at Al Waha or episodes at another hospital — and finding a consistent scientific pattern. Reproducibility is the minimum baseline you owe every reader."
    ]},
    { id: "s40", kind: "codeshare", heading: "Code sharing, environment locks, and the audit trail", lines: [
      "What does a reproducible doctoral analysis folder actually look like when you hand it to a supervisor, an examiner, or a journal repository?",
      "First, organize a clean pipeline: a read-only raw data folder, numbered scripts or a single master notebook that runs from top to bottom without errors, and an output folder for generated tables and figures.",
      "Second, make your script print an explicit data audit log as it runs, stating the starting row count and exactly how many rows changed at each screening step.",
      "On our dataset, the cleaning script logs five thousand two hundred starting episodes, and records that seven episodes with bed occupancy above one hundred percent and seven episodes with negative waiting times were set to missing before modelling.",
      "Third, add automated assertions directly inside your Python code. An assertion line checks that no negative waiting times remain after cleaning and that the training and test row counts add up to the cleaned total.",
      "Fourth, record your software environment. As we saw in data.js, scikit-learn version one point nine produced our fifty-split results; listing exact package versions in a requirements file prevents silent version drift.",
      "Finally, include a short README file that explains in three lines how to install the packages, which command runs the analysis, and which script produces each table in your thesis.",
      "Sharing clean, commented, runnable code transforms your thesis from a story the reader is asked to take on faith into an auditable scientific record."
    ]},
    { id: "s41", kind: "standards", heading: "Reporting standards: STROBE and TRIPOD checklists", lines: [
      "Airline pilots with twenty years of experience still read a printed pre-flight checklist before every takeoff. Checklists exist because under complex workloads, human memory skips vital details.",
      "In quantitative health, management, and social science research, journals and examiners rely on international reporting guidelines to ensure no essential detail is left out of a paper or thesis.",
      "Which reporting standard applies to your chapter depends on the first question we asked: is your analysis an explanatory observational study, or a multivariable prediction model?",
      "For observational studies that estimate associations between exposures and outcomes — like our group comparison and our simple and adjusted regressions at Al Waha — the standard is STROBE.",
      "STROBE stands for Strengthening the Reporting of Observational Studies in Epidemiology. It is a twenty-two item checklist covering study design, setting, variables, bias, and statistical methods.",
      "For studies that develop, validate, or update a model meant to predict individual outcomes — like a held-out classifier or our neural network — the standard is TRIPOD.",
      "TRIPOD stands for Transparent Reporting of a multivariable prediction model for Individual Prognosis Or Diagnosis. It specifies how to report model building, held-out validation, and predictive accuracy.",
      "Neither STROBE nor TRIPOD tells you which statistical model you must choose. Instead, they guarantee that whatever model you chose is described clearly enough to be judged, reproduced, and synthesized."
    ]},
    { id: "s42", kind: "checklist", heading: "What STROBE and TRIPOD require for Al Waha", lines: [
      "Let us look at four specific disclosures that STROBE and TRIPOD require on the Al Waha study — items that unguided thesis drafts omit every single year.",
      "First, both checklists require a complete participant flow. You must state how many hospital episodes were recorded, how many had missing values on each variable, and how many entered the final analysis.",
      "Second, STROBE Item Sixteen requires you to report both unadjusted estimates and confounder-adjusted estimates with their confidence intervals, and to state clearly which variables were adjusted for and why.",
      "That is why our synthesis report includes both the minus three point zero one unadjusted slope from waiting alone and the minus one point two three adjusted slope with six predictors, naming all five covariates held constant.",
      "Third, TRIPOD requires you to state the exact validation strategy — whether a single pre-loop holdout split, fifty repeated splits, or cross-validation — and to report performance in meaningful clinical units.",
      "For Al Waha, that means reporting held-out M A E of four point nine versus five point six points and R M S E of six point one two versus seven point zero seven points, alongside the outcome standard deviation of sixteen.",
      "Fourth, TRIPOD requires checking model behavior across ranges of predicted risk or outcomes, rather than relying on one overall average score.",
      "Before you submit your analysis chapter, place the STROBE or TRIPOD checklist beside your draft and verify that every item has a home in your text or tables."
    ]},
    { id: "s43", kind: "ethics", heading: "Ethics, patient privacy, and de-identification", lines: [
      "Responsible reporting has a human side that comes before any formula. Behind the five thousand two hundred rows of the Al Waha dataset are five thousand two hundred real hospital visits by real patients.",
      "Earlier we saw that open science asks you to share code and make analyses reproducible. At the same time, research ethics and data protection laws require you to protect participant privacy. How do you balance both?",
      "Many beginners assume that deleting a patient's name and national identity number makes a dataset anonymous. In health and organizational data, that is rarely true.",
      "A combination of indirect fields — admission date, clinic shift, bed occupancy, waiting time, and especially free-text patient review sentences — can uniquely identify an individual patient or staff member.",
      "Removing direct names is only basic de-identification. True anonymization requires scrubbing free-text notes of personal details, coarsening exact timestamps, and checking that no rare combination of traits singles out one person.",
      "When raw hospital records cannot legally or ethically be posted online, you still share your full cleaning and modelling code, together with a synthetic dataset that mimics the variable distributions without containing real patients.",
      "One modern ethical rule is critical for your doctoral workflow: never paste raw, confidential patient rows or clinical text into public external AI chat tools unless your institution has an approved private environment.",
      "Always state your ethics committee approval number, data governance rules, and privacy safeguards explicitly in the data section of your chapter."
    ]},
    { id: "s44", kind: "fairness", heading: "Subgroup errors and responsible model deployment", lines: [
      "Ethics in quantitative reporting goes beyond locking up data files. It also includes asking who benefits and who could be harmed if managers act on your model.",
      "Remember that a summary metric like M A E of four point nine points is an average across the entire held-out test set. An average can look reassuring while hiding severe errors in a vulnerable subgroup.",
      "On the held-out Al Waha test set, across the four hundred and seventy eight episodes above eighty five percent bed occupancy, the neural network's M A E rises from four point seven seven points on routine shifts to five point one eight points, while the six predictor regression's M A E jumps from five point one six points to six point four four points.",
      "Suppose Al Waha leadership used a prediction model to score ward performance or allocate nursing bonuses without understanding how the model behaves under overcrowding.",
      "If the model systematically mispredicts satisfaction during emergency surges above eighty five percent occupancy, or if a black-box network cannot explain why it flagged a ward, staff on the hardest shifts could be penalized unfairly.",
      "Equally, if an analyst mistakes the observational slope of minus one point two three for a guaranteed causal lever, managers might focus solely on waiting-room clocks while ignoring clinical staffing and handoffs.",
      "Responsible reporting therefore requires disaggregating your error metrics across key operational and demographic subgroups, rather than reporting only a single headline score.",
      "In your discussion chapter, state clearly which real-world decisions your analysis can safely inform, and which high-stakes decisions would require a controlled trial or fairness audit first."
    ]},
    { id: "s15", kind: "four", heading: "The four questions that decide it", lines: [
      "So which result will you defend? Four questions decide it, in this order.",
      "One: is your research question explanatory, or predictive? Answer this first. Everything else follows.",
      "Two: was every model scored on the same held-out rows? If not, you do not have a comparison.",
      "Three: is the simplest adequate model materially worse? On our model comparison table, the network beats the six predictor regression by about seven tenths of a point of M A E, on an outcome whose standard deviation is sixteen.",
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
      "Every section draws on a distinct part of the quantitative workflow. Put together in this order, they build a complete, defensible analysis chapter."
    ]},
    { id: "s18", kind: "sentences", heading: "Five sentences: may you write them?", split: 1, lines: [
      "Here are five sentences that examiners see every year. Decide for each one: may you write it, or not?",
      "The model achieved eighty five percent accuracy. On what data, and against what base rate?",
      "Analysis showed a significant relationship. How large, in what units, and out of how many tests?",
      "The data were cleaned and analysed. Which decisions, and how many rows did each one remove?",
      "The network performed best and was therefore selected. Best at what, and what did it cost you?",
      "Further research is needed. On what, specifically, and what would it settle?"
    ]},
    { id: "s45", kind: "limitations", heading: "Writing limitations that actually bite", lines: [
      "Open almost any weak draft dissertation to the limitations section and you will see the same two sentences: the sample size could have been larger, and further research is needed.",
      "Examiners call that throat-clearing. It names no specific threat to your estimate, says nothing about which direction the threat pulls, and avoids taking responsibility for what your method cannot show.",
      "A doctoral limitation is not an apology; it is a boundary map. It names a specific methodological constraint, explains how that constraint affects your exact estimate, and bounds your claim.",
      "For our Al Waha study, three concrete limitations belong on the page. The first is internal validity: unmeasured confounding in observational data.",
      "Although the adjusted minus one point two three slope holds five measured covariates constant, unmeasured patient acuity or emergency triage severity could simultaneously lengthen waits and lower satisfaction.",
      "The second limitation is functional form. Our six predictor linear regression forces a straight line across bed occupancy, missing the steep non-linear drop above eighty percent revealed by the banded averages and the network.",
      "The third limitation is external validity and construct measurement. Patient satisfaction scores come from a single hospital system, and our survey score is an imperfect proxy for overall quality of care.",
      "Notice how each of those three limitations names the exact mechanism, connects directly to an Al Waha figure, and tells the reader how to interpret the results safely."
    ]},
    { id: "s46", kind: "overturn", heading: "Conclusions and the finding that would overturn them", lines: [
      "How do you write the final conclusion paragraph of your analysis chapter so that it is both clear to a manager and bulletproof in front of an examiner?",
      "First, answer the exact research question you posed in Section One, using the units of the outcome and matching your estimand.",
      "Write that among episodes matched on occupancy, staffing, handoffs, and training at Al Waha, each additional ten minutes of waiting is associated with one point two three points lower satisfaction.",
      "Second, never slide from an observational association into an unguarded causal promise in your very last paragraph. Do not write that cutting wait times by ten minutes is guaranteed to raise satisfaction by one point two three points.",
      "Third, synthesize the convergent and divergent evidence: note that the negative relationship holds across sensitivity checks, while high bed occupancy above eighty percent adds a sharp non-linear drop.",
      "Fourth, write the single most powerful sentence in any empirical chapter: state explicitly what specific empirical finding would make you withdraw or revise your conclusion.",
      "For example: this conclusion would not survive if adjusting for clinical triage severity at arrival reduced the waiting-time slope below half a point per ten minutes, or if external validation on next quarter's episodes failed to replicate the drop.",
      "A conclusion that states clearly how it could be proved wrong is the hallmark of rigorous scientific thinking."
    ]},
    { id: "s47", kind: "limitplay", heading: "Try it: upgrade a weak limitation into a doctoral one", wait: true, lines: [
      "Your turn. Select each of the three Al Waha findings below the stage.",
      "Compare the vague throat-clearing statement against the specific limitation and overturning condition, and choose the one that belongs in a doctoral chapter.",
      "When you have reviewed all three claims, press Continue."
    ]},
    { id: "s48", kind: "viva", heading: "Defending your analysis in a doctoral viva", lines: [
      "At the end of your doctorate comes the oral examination, the viva. Two examiners sit across from you with your open thesis, and their job is to test whether you truly own every decision in it.",
      "Students often fear that examiners will attack them unless their model achieved the highest R squared or the tiniest p value. In reality, examiners rarely reject a thesis over a modest effect size.",
      "Examiners challenge candidates who cannot explain why they chose their method, who hid failed assumption checks, who confused prediction with explanation, or who claimed causal proof from observational correlations.",
      "Consider four classic viva questions on our Al Waha chapter. Question one: why defend the six predictor regression when the neural network had a lower M A E by zero point seven two points?",
      "Your defense: my primary research question was explanatory, requiring interpretable adjusted slopes; a zero point seven two point gain on a sixteen point scale did not justify losing explainability, so I reported the network alongside it as a non-linear benchmark.",
      "Question two: your linear regression missed the steep satisfaction drop above eighty percent occupancy — why should we trust your chapter? Your defense: you should not trust a straight line above eighty percent, which is why I triangulated the regression with banded averages and the network curve.",
      "Question three: could your minus one point two three slope just be unmeasured patient illness? Your defense: yes, unmeasured clinical severity is a plausible confounder, which I state in my limitations together with the exact triage measure that would test it.",
      "When you can state the question, the assumptions, the search, the comparison on identical rows, and what would overturn your claim, you do not have to bluff in a viva. Your transparency is your defense."
    ]},
    { id: "s49", kind: "vivaplay", heading: "Try it: face the viva examiner", wait: true, lines: [
      "Your turn. Step into the viva room and face three live challenges from a doctoral examiner on the Al Waha analysis.",
      "For each challenge, choose the response that defends your chapter with methodological honesty rather than bluffing or retreating.",
      "Complete all three examiner challenges, then press Continue."
    ]},
    { id: "s19", kind: "prompts", heading: "Two prompts for checking your work", lines: [
      "Two prompts should accompany every analysis you run. Use them before you finalize any claim.",
      "The verification prompt: which assumptions does this method require, and does my output show I checked each one?",
      "The adversarial prompt: what is the strongest reason this result should not be trusted?",
      "Run the adversarial prompt on your own conclusion, before your supervisor does. Then write the sentence: this conclusion would not survive if.",
      "Whatever the helper says, you write the response. That rule never changes."
    ]},
    { id: "s20", kind: "helper", heading: "You decide; ChatGPT assists", lines: [
      "Keep this boundary table in front of you whenever you work with an AI helper.",
      "On the left, what you do: the question, the method, the code, the diagnostics, the assumptions, the interpretation, and checking every claim.",
      "On the right, what the helper may do: explain an error, explain a function, suggest a test, extend code that already works.",
      "Every row on the left stays on the left, from research question to final claim. That is the point."
    ]},
    { id: "s21", kind: "quiz", heading: "Chapter quiz: fourteen questions", wait: true, lines: [
      "Let us finish with fourteen questions covering every part of evidence synthesis and responsible reporting.",
      "Take your time, and read the explanation after each answer."
    ]},
    { id: "s22", kind: "takeaways", heading: "Five ideas to keep", lines: [
      "Well done. Here are five ideas to keep from this chapter on evidence synthesis and responsible reporting.",
      "One: name your estimand and state the question first, because different methods estimate different targets and cannot be compared without their questions.",
      "Two: seek convergent evidence through triangulation, remembering that agreement counts only when the methods could have disagreed.",
      "Three: compare models on the exact same held-out rows across repeated splits or cross-validation, and report effect sizes with confidence intervals plus M A E and R M S E in real units.",
      "Four: make your pipeline reproducible, follow STROBE or TRIPOD checklists, protect patient privacy, report the full search across forking paths, and state what would overturn your conclusion.",
      "Five: you decide, and the helper assists. Now go and write the analysis plan for your own doctoral research. Good luck."
    ]}
  ],
  quiz: [
    { q: "The simple regression with waiting time alone says −3.01 points per 10 minutes; the adjusted regression with six predictors says −1.23. Which is right?",
      o: ["The simple regression, because it uses more of the data", "The adjusted regression, because it has a higher R²", "Both: they answer different questions (waiting alone vs holding the other five predictors constant)", "Neither: they disagree, so the data are wrong"], a: 2,
      why: "The simple regression lets waiting carry whatever travels with long waits. The adjusted regression gives the association among otherwise similar episodes. Say which question you asked." },
    { q: "What is the difference between an estimand, an estimator, and an estimate?",
      o: ["They are three words for the exact same regression coefficient", "The estimand is the target quantity your question asks about; the estimator is the method/rule used to compute it; the estimate is the numerical value obtained from the sample", "The estimand is the p-value, the estimator is the sample size, and the estimate is R²", "An estimand only exists in neural networks, not in linear regression"], a: 1,
      why: "Naming the estimand first (e.g., total marginal association vs conditional association vs causal intervention effect) tells you why two valid estimators can produce different numbers on the same data." },
    { q: "Three linear models all say the occupancy effect is a straight line. What does their agreement show?",
      o: ["Strong evidence of a straight line", "Nothing: none of them could have found anything else", "That the effect is causal", "That occupancy does not matter"], a: 1,
      why: "Agreement is evidence only when the methods could have disagreed. The banded averages and the network could, and both bend down at high occupancy." },
    { q: "On a forest plot of Al Waha waiting-time slopes, why must you report the point estimate and 95% confidence interval in satisfaction points rather than only stating p < 0.05?",
      o: ["Because p-values cannot be calculated for regression models", "Because a p-value only indicates whether the interval touches zero, whereas the estimate and confidence interval show the magnitude and range of plausible effect sizes in real units", "Because confidence intervals prove causality automatically", "Because a narrow confidence interval always means the effect is large"], a: 1,
      why: "In a large sample, a clinically trivial effect can have p < 0.05; in a small subgroup, a large effect can have a wide interval crossing zero. The forest plot shows both size and precision in real units." },
    { q: "Errors −2, 1, −3 and 6. What is the MAE?",
      o: ["3.0", "3.54", "0.5", "12"], a: 0,
      why: "Drop the signs: 2, 1, 3, 6. Sum 12, divided by 4 = 3.0. The RMSE of the same errors is 3.54." },
    { q: "Model A: MAE 4.9, RMSE 6.1. Model B: MAE 4.9, RMSE 9.0. What does the difference tell you?",
      o: ["Nothing: the MAE is the same", "Model B is occasionally very wrong: its errors are much more uneven", "Model B is better", "Model A overfits"], a: 1,
      why: "RMSE squares the errors, so a bigger gap above MAE signals a few large misses. MAE alone would hide them." },
    { q: "A table compares a regression scored on one split with a network scored on another. What is wrong?",
      o: ["Nothing, if both are held-out scores", "The models were not compared on the same rows, so the winner may just have had easier rows", "The network should be scored on training rows", "Only the R² should be compared"], a: 1,
      why: "On our data, the same regression's RMSE moved by almost half a point across 50 random splits. Split once, before fitting anything, and score all models on the same rows." },
    { q: "Why is comparing the paired difference between two models on the same cross-validation folds better than comparing their scores on separate random splits?",
      o: ["Because cross-validation trains on the test folds", "Because hard and easy test episodes affect both models on the same fold together, cancelling out split luck and showing whether the performance gap is consistent across all rows", "Because cross-validation guarantees that RMSE becomes smaller than MAE", "Because cross-validation removes the need to hold out test data"], a: 1,
      why: "Scoring both models on the exact same folds tests every episode once and removes split-to-split luck from the difference between the models." },
    { q: "What is 'the garden of forking paths', and how do pre-registration and sensitivity analysis address it?",
      o: ["It is a decision tree classifier; you fix it by adding more layers", "It is the branching tree of reasonable cleaning, coding, and modelling choices; pre-registration locks the primary path in advance, and sensitivity analysis reports whether conclusions hold across alternative paths", "It means never exploring your data under any circumstances", "It means running forty analyses and reporting only the branch with the smallest p-value"], a: 1,
      why: "Pre-registration separates confirmatory tests from data-dependent exploration, while sensitivity analysis (a specification curve) shows publicly whether your conclusion is robust or fragile across reasonable alternatives." },
    { q: "If you run 20 independent subgroup hypothesis tests at α = 0.05 when there is no true subgroup difference, what is the approximate probability of getting at least one false-positive result?",
      o: ["Still 5%", "About 64%", "0%", "Exactly 20%"], a: 1,
      why: "With 20 independent tests under the null, the chance of zero false alarms is 0.95²⁰ ≈ 0.36, so the chance of at least one false alarm is 1 − 0.36 = 64%. Disclose all tests run and adjust thresholds or label subgroup checks exploratory." },
    { q: "Which reporting guideline applies to an explanatory observational regression study at Al Waha, and which applies to developing and validating a multivariable prediction model?",
      o: ["TRIPOD for observational associations; STROBE for neural network predictions", "STROBE for observational studies of associations; TRIPOD for developing and validating multivariable prediction models", "Neither applies unless the study is a randomized laboratory experiment", "Both require reporting only R² and hiding unadjusted estimates"], a: 1,
      why: "STROBE governs observational studies (requiring participant flow and both unadjusted and adjusted estimates with 95% CIs); TRIPOD governs prediction models (requiring validation design and error metrics in outcome units)." },
    { q: "Your research question is explanatory: which factors go with lower satisfaction? The network beats the regression by about 0.7 MAE points, on an outcome with a standard deviation of 16. Which result do you defend?",
      o: ["The network: it has the best score", "The six-predictor regression: the question is explanatory, it is nearly as accurate, and each coefficient can be read and checked", "Neither", "The one-predictor regression"], a: 1,
      why: "Answer the first question first: explanatory or predictive. For an explanatory question, you need coefficients you can read, check and defend." },
    { q: "Which sentence may you write in a final chapter?",
      o: ["“Analysis showed a significant relationship.”", "“The data were cleaned and analysed.”", "“Each 10 minutes of waiting was associated with 1.23 points lower satisfaction (95% CI: −1.31 to −1.16), holding the other five predictors constant; this was one of 40 models fitted, all listed in Appendix B.”", "“Further research is needed.”"], a: 2,
      why: "It gives the size, the units, the adjustment, the interval and the search. The others hide all of that." },
    { q: "What should the limitations section always contain, and how does it help you in a doctoral viva?",
      o: ["An apology for the sample size and the phrase “further research is needed”", "Specific threats to validity (such as unmeasured confounding or non-linearity above 80% occupancy), how they affect your estimate, and the exact empirical finding that would overturn your conclusion", "A claim that deleting names from a spreadsheet guarantees complete anonymity and causal proof", "A statement that the model with the lowest RMSE has no limitations"], a: 1,
      why: "Naming the specific boundary of your method and writing “This conclusion would not survive if …” gives you a transparent, falsifiable defense that examiners respect." }
  ]
};
