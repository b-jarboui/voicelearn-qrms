// PHQM830 Week 12 · Chapter 2 of the course: "Finding groups nobody labelled" (49 scenes)
// One scene = one audio file (or read-along unit). One sentence = one animation step.
window.CHAPTER = {
  course: "PHQM830 Quantitative Research Methods and Statistics",
  week: "Week 12",
  title: "Finding groups nobody labelled",
  subtitle: "Clustering and segmentation analysis",
  scenes: [
    { id: "s01", kind: "title", heading: "What can a ward manager learn from unlabelled visits?", lines: [
      "Imagine a manager at Al Waha opening a file of hospital visits and asking which ones took place under similar working conditions.",
      "Each dot is one episode of care, and the manager wants to know how much confidence to place in any groups we draw."
    ]},
    { id: "s02", kind: "recap", heading: "Where did the answer key go?", lines: [
      "Last week a visit came with an answer we could look up afterwards, such as whether the patient made a complaint.",
      "We could put a prediction beside that recorded answer and count how often the two disagreed on fresh visits.",
      "Now cover the outcome column and try sorting the same visits by the conditions on the ward.",
      "Learning from the measurements alone is called unsupervised learning, and it changes what counts as evidence for a grouping."
    ]},
    { id: "s27", kind: "supunsup", heading: "Follow one row through two analyses", lines: [
      "Suppose the manager asks for tomorrow’s satisfaction score and then asks for a list of similar visits.",
      "For the first question, each earlier visit supplies both operating measurements and the satisfaction score we want to predict.",
      "The vertical stroke measures the gap between a prediction and an observed score on a visit kept aside for testing.",
      "For the second question the analyst closes the satisfaction column before looking for a pattern.",
      "The colours now come from similarities among the operating measurements, so there is no recorded correct colour to compare them with."
    ]},
    { id: "s19", kind: "why", heading: "What would a useful group tell the manager?", lines: [
      "A manager can read a single episode closely, but the operating file contains four thousand seven hundred and forty complete rows.",
      "A recurring combination of crowding and thin staffing could give the team a starting point for a ward review.",
      "In the course reading, Miller and Roth used manufacturers’ priorities to describe caretakers, marketeers and innovators.",
      "The hospital needs the same discipline because a useful name should tell a colleague what to look for in the underlying records."
    ]},
    { id: "s28", kind: "vars", heading: "Which columns may give a visit its colour?", lines: [
      "Two visits can look alike in how the ward ran even when the patients later report quite different experiences.",
      "For Al Waha we describe working conditions with staff ratio, training hours, bed occupancy and the number of handoffs.",
      "Keep satisfaction, complaints, readmissions and waiting time in a separate part of the table for comparison later.",
      "If a complaint helped choose an episode’s colour, finding more complaints in that colour would partly repeat our own sorting rule.",
      "Once each episode has an operating label, we can bring those other columns back and ask how patient experiences vary."
    ]},
    { id: "s03", kind: "spot", heading: "Which picture preserves the original visits?", split: 2, lines: [
      "Here are two maps made from hospital measurements, with one dot for each visit shown and no colours to guide your eye.",
      "Choose the picture you think retains the original combinations of staff, training, occupancy and handoffs.",
      "Watch what happens when the computer is asked to divide each of these pictures into four groups.",
      "Picture A has its columns shuffled independently, yet it still comes back with four coloured regions just as picture B does.",
      "If a method can draw a convincing boundary after shuffling, the colours alone give the manager very little evidence."
    ]},
    { id: "s04", kind: "kmeans", heading: "Follow a centre through one round", lines: [
      "Imagine giving each visit the colour of the nearest meeting point, then moving the meeting points to suit their visitors.",
      "On this flat practice map we choose the number of meeting points, called k, and mark their starting positions with crosses.",
      "Each dot takes the colour of its nearest cross, so a stretch of empty space can separate two colours.",
      "Each cross now slides to the average position of the dots that have just taken its colour.",
      "Repeating those two moves until the assignments settle gives this procedure its name, k-means.",
      "Trace one dot back to its cross and consider how its colour might change if the units changed what counted as near."
    ]},
    { id: "s29", kind: "voronoi", heading: "Who changes sides when a centre moves?", lines: [
      "Follow the two crosses on this flat practice map of Al Waha visits while the dots themselves stay in place.",
      "This flat projection keeps about eighty-four percent of the variance across the four standardised measurements, with about sixty-nine percent along the first axis and fifteen percent along the second.",
      "Halfway between the crosses, draw the line whose points are all exactly as far from one cross as from the other.",
      "On either side of that line the nearer cross wins, so you can predict a dot’s colour before it appears.",
      "When the crosses move to the means of their coloured dots, the line swings and a few visits can change sides."
    ]},
    { id: "s20", kind: "inertia", heading: "What does a shorter line buy us?", lines: [
      "Suppose the manager wants one representative position for each colour and asks how closely the visits gather around it.",
      "Draw a line from every visit to its own centre and add their squared lengths to get a measure called inertia.",
      "Assigning a dot to its nearest centre or moving a centre to its mean can only lower that total or leave it unchanged.",
      "With four groups on the hospital file, different starts settled at different totals even though each run followed the same rule.",
      "Ten starts give the computer ten chances to find a tighter fit, and it keeps the one with the lowest inertia."
    ]},
    { id: "s30", kind: "kmpp", heading: "Why spread the starting centres out?", lines: [
      "Both maps begin with the same visits and room for four centres, so watch where the first crosses land.",
      "On the left, three crosses begin in one cloud while a single cross has to represent the visits on the other side.",
      "The left crosses can settle into a locally tight arrangement even when a different allocation of crosses would shorten the total squared distance.",
      "The starting rule called k-means plus plus favours a new centre where squared distance to the nearest existing centre is large.",
      "In the hospital analysis the four-group totals ranged from about forty-seven hundred to about sixty-one hundred, which makes repeated starts worth reporting."
    ]},
    { id: "s05", kind: "playground", heading: "Move the centres yourself", wait: true, lines: [
      "Pick a number of centres on this practice map of two hundred and forty visits and predict which cross will attract the most dots.",
      "Press Assign to colour the dots, then press Move and see which cross travels furthest towards its members.",
      "Keep the number of groups fixed and try another start so that any change in the final spread has a clear explanation."
    ]},
    { id: "s06", kind: "distance", heading: "How far apart are two visits?", lines: [
      "In this worked example one ward is sixty percent full with a staff ratio of one point two and the other is eighty percent full with a ratio of zero point nine.",
      "Twenty percentage points separate their occupancy readings, so the square drawn on that gap has an area of four hundred.",
      "The staff ratios differ by three tenths, giving a squared gap of just nine hundredths on the same numerical scale.",
      "Adding the two areas and taking the square root gives a straight-line distance that rounds to twenty.",
      "The large square tells us which measurement drove this calculation, even though the manager never said occupancy mattered more than staffing."
    ]},
    { id: "s31", kind: "dist4d", heading: "Trace the distance between two actual records", lines: [
      "A visit in the Al Waha file has four operating measurements, so there are four gaps to account for when we compare a pair.",
      "In the two records shown, occupancy goes from just under eighty-four percent in the first to about sixty-five percent in the second.",
      "For each row of the table, take the difference between the visits and square it before adding the rows together.",
      "Occupancy contributes about three hundred and forty-two to the squared total of about four hundred and forty, and training hours supply most of the rest.",
      "Together those two measurements supply about ninety-eight percent of this pair’s squared distance, leaving very little influence for staffing or handoffs."
    ]},
    { id: "s32", kind: "metrics", heading: "Which journey counts as short?", lines: [
      "Imagine travelling between two marks on a ward map along the straight line that joins them, the distance called Euclidean.",
      "A large difference in a single measurement has a strong influence because its contribution to squared distance grows with the square of the gap.",
      "Travelling along one axis and then the other adds the absolute gaps, giving what is called Manhattan distance.",
      "Choosing an actual visit as each group’s medoid under Manhattan distance gives about zero point nine seven agreement with the two-group Euclidean k-means fit.",
      "Two profiles pointing in the same direction can have quite different lengths, which makes the angle between them useful when proportions matter."
    ]},
    { id: "s07", kind: "scale", heading: "Give each column a common unit", lines: [
      "A staffing change is easier to judge if we know how big it is compared with the usual variation in staffing.",
      "At Al Waha the typical spread, measured by the standard deviation, is about ten and a half occupancy points and only a third of a staff-ratio unit.",
      "Across the pairs summarised here, training and occupancy together supply about ninety-nine percent of the squared distance in raw units.",
      "Subtracting each column’s mean and dividing by its standard deviation gives a z-score, with each column now supplying roughly a quarter on average.",
      "The highlighted Python operation applies that change of ruler to every operating column before the algorithm measures its first distance."
    ]},
    { id: "s33", kind: "rescale", heading: "Watch the same visits change shape", lines: [
      "Keep your eye on the same eight visits as we plot two of their recorded operating measurements.",
      "Occupancy measures position across the page and staff ratio measures position up the page, with equal raw units drawn the same length.",
      "Moving from one visit to another covers much more ground horizontally because the numerical occupancy gaps dwarf the staffing gaps.",
      "Watch each dot move as we subtract the hospital mean on each axis and express the difference in that column’s standard deviations.",
      "Now an upward step of one unit means staffing is one standard deviation higher, so the manager can see differences hidden in the narrow band."
    ]},
    { id: "s08", kind: "units", heading: "Which measurement separates your pair?", wait: true, lines: [
      "Choose two visits from the menus and predict which measurement supplies the largest share of their squared distance in raw units.",
      "Switch to standard deviations and read the bars again to see how much of your first answer came from the rulers you used."
    ]},
    { id: "s09", kind: "noise", heading: "Build a comparison by shuffling", lines: [
      "Imagine making a second ward file that preserves every recorded value but gives the values different partners across columns.",
      "Keep the four columns separate as you shuffle, so a staffing value can now share a row with a different occupancy reading.",
      "The occupancy column still has the same mean and spread because every occupancy reading is still there exactly once.",
      "Run the same grouping procedure with the same number of centres on this rearranged table to build a comparison called a noise floor.",
      "A larger score on the original file suggests the way measurements occur together contributes to the separation beyond this shuffle baseline."
    ]},
    { id: "s10", kind: "silhouette", heading: "Does this visit fit its group?", lines: [
      "Imagine asking the visit marked in gold which group of other visits it most resembles on the operating measurements.",
      "Trace the blue lines to every other member of its group and take their average length, which we call a.",
      "Take the average distance to each other group separately and call the smallest of those averages b.",
      "Subtract a from b and divide by the larger distance to get the silhouette, which approaches one for a well-separated visit and zero near a tie."
    ]},
    { id: "s34", kind: "silplot", heading: "What can a mean silhouette hide?", lines: [
      "Imagine giving each visit a horizontal bar as long as its silhouette score, with a mark at zero to show a tie.",
      "Arranging the bars from longest to shortest within a group makes a blade whose thickness counts visits and whose width shows their separation.",
      "In the two-group hospital analysis the average is about one half, marked by the dashed line beside the illustrative bars.",
      "When Al Waha visits are divided four ways the average falls to about one third, so the mean marker shifts towards zero.",
      "Bars extending left of zero mark twenty visits, or zero point four percent at four groups, that sit closer on average to another group than to their own."
    ]},
    { id: "s11", kind: "gap", heading: "Read each original score beside its shuffle", lines: [
      "Each pair of dots compares the original hospital table with its shuffled counterpart at the same requested number of groups.",
      "With two groups the mean silhouette is about one half in the original visits and about nineteen hundredths after shuffling.",
      "As you move from two groups to six, follow the two lines as the advantage over the shuffle falls from about thirty-one hundredths to about seven hundredths.",
      "Of the five choices examined here, two groups give the clearest separation relative to this particular comparison file."
    ]},
    { id: "s12", kind: "choosek", heading: "Which grouping would you report?", wait: true, lines: [
      "Choose how many groups you would take to the director if you had to defend both the separation and the usefulness of the extra detail.",
      "Use the difference between the paired bars to explain what the hospital gains or gives up by choosing your number of groups."
    ]},
    { id: "s21", kind: "elbow", heading: "How much does one more centre buy?", lines: [
      "Start with every visit assigned to a single centre and read the total squared distance at the left of the plot.",
      "Adding a second centre cuts the total from nearly nineteen thousand to about seventy-six hundred in the file of four thousand seven hundred and twenty-nine distinct complete episodes.",
      "Trace the smaller gains from each additional centre and you can see why people call this bend in the curve an elbow.",
      "Since another centre can improve compactness simply by splitting an existing group, read the elbow alongside the comparison with shuffled visits."
    ]},
    { id: "s35", kind: "gapstat", heading: "How much tighter than a reference file?", lines: [
      "To see how we might judge the hospital inertia, start with eight example positions that we can compare with random sets of eight.",
      "For the formal gap statistic, generate many reference tables without groups under a stated model, such as uniform points across the observed ranges.",
      "At each group count, the blue line shows the logged inertia for our example and the orange line shows its average across forty reference tables.",
      "Subtracting the blue height from the orange height gives the gap, and starting from one group we stop once a gap reaches the next gap minus its uncertainty allowance.",
      "On the standardised Al Waha episodes at two groups, the Tibshirani gap is about one point four four with a standard error of zero point zero zero seven."
    ]},
    { id: "s36", kind: "kexplorer", heading: "What changes when you add one group?", wait: true, lines: [
      "The practice map shows a fit on the displayed dots, while the charts show the hospital results at the same group count.",
      "Pick three and look for the extra division on the map before reading how much squared spread the extra centre saves.",
      "Move on to six and decide whether the finer labels are worth keeping when the silhouette advantage over shuffling has grown smaller."
    ]},
    { id: "s13", kind: "shapes", heading: "When does a straight boundary get in the way?", lines: [
      "Before interpreting coloured visits, check the ruler used for distance, the number of centres and the shape the algorithm can represent.",
      "The standard deviations tell us how far apart the operating columns typically spread before we put them on a common scale.",
      "If several group counts seem plausible, the manager needs to know which alternatives were compared and why we prefer one.",
      "On the curved example, nearest-centre colouring cuts across each arc, suggesting we need a method that can follow a bend."
    ]},
    { id: "s22", kind: "methods", heading: "Two ways to group visits without moving centres", lines: [
      "The manager might want to know which small groups sit inside larger ones or which visits have very few neighbours.",
      "Joining the closest branches one pair at a time gives a tree whose branches can be cut at different heights.",
      "Cutting the hospital tree into two groups gives strong agreement with the two-centre solution under a measure that compares which visits stay together.",
      "A method called DBSCAN follows connected dense neighbourhoods and can leave a visit outside every group.",
      "In the hospital analysis with a minimum count of ten, increasing the radius from six tenths to seven tenths changed eleven groups into one."
    ]},
    { id: "s37", kind: "dendrostep", heading: "Read a tree from the leaves upwards", lines: [
      "Take just ten Al Waha visits so that we can follow every join that goes into building their tree.",
      "At the bottom each visit has its own leaf, and you can trace its path upward to find the first visit it joins.",
      "The two leaves marked by the first bridge meet at a height of zero point seven two, the lowest join on this tree.",
      "Another pair meets at nine tenths, and subsequent bridges combine pairs and larger branches at progressively greater heights.",
      "The jump from about three and a half to nearly seven leaves a wide interval where a horizontal cut separates the same two branches of this sample."
    ]},
    { id: "s38", kind: "linkage", heading: "Which pair should two branches join through?", lines: [
      "Once several visits share a branch, there is more than one possible distance between that branch and its neighbour.",
      "The rule for comparing branches is called linkage, and changing it can change which hospital visits meet next.",
      "Single linkage uses the nearest pair across branches, so chaining gives zero agreement with two-group k-means on a twenty-five-hundred-episode subsample.",
      "On the same subsample, complete linkage uses the furthest pair and reaches about zero point nine eight agreement with k-means, while average linkage reaches about zero point nine six.",
      "Ward’s rule joins the pair that adds the least squared spread within groups, giving close agreement with the two-centre hospital fit."
    ]},
    { id: "s39", kind: "dendrocut", heading: "Where would you cut the tree?", wait: true, lines: [
      "These ten visits keep the same tree while you choose how much of its branching detail the manager will see.",
      "Count how many branches cross the dashed line and check your answer against the number of colours under the tree.",
      "Drop from five to two point eight and follow the visit that separates while the visits in the other main branch stay together."
    ]},
    { id: "s40", kind: "dbscanmech", heading: "Grow one group by visiting its neighbours", lines: [
      "Imagine standing on one visit and asking how many other visits you can reach in a single short step.",
      "The circle sets the reach of the step, called epsilon, and our practice rule requires five visits including the one in the middle.",
      "Count the dots inside the highlighted circle to see why the middle visit qualifies as a core point that can extend the search.",
      "A core visit within reach can extend the group again, while a visit with too few neighbours can join at the border without extending it.",
      "A visit outside the reach of every core receives the noise label minus one, which happens to twenty-three Al Waha episodes at radius zero point seven and a minimum count of ten."
    ]},
    { id: "s41", kind: "dbscanexp", heading: "How far should a neighbourhood reach?", wait: true, lines: [
      "On this flat practice map, keep the minimum crowd at ten visits and predict what widening the radius will do to the grey dots.",
      "Change the radius and watch which visits acquire a colour as their neighbourhoods become dense enough to join a group.",
      "The separate hospital summary uses four operating measurements, where changing the radius from six tenths to seven tenths joined eleven groups into one."
    ]},
    { id: "s42", kind: "gmm", heading: "How much support does a visit give each group?", lines: [
      "A nearest-centre rule gives a visit one colour even when moving it a little way across the map would change that colour.",
      "Imagine an Al Waha visit whose staffing and occupancy are plausible under either of the two operating profiles shown here.",
      "A Gaussian mixture represents the visits as overlapping bell-shaped distributions whose contours can stretch and tilt in different directions.",
      "As our example visit reaches the overlap both components share its membership, whereas in the two-component Al Waha fit visit A W one zero one zero nine nine has probabilities of one and zero and only zero point three percent of visits fall below zero point eight.",
      "For a hospital analysis we can compare candidate fits with the Bayesian information criterion, which rewards fit while charging for extra parameters."
    ]},
    { id: "s43", kind: "methodgrid", heading: "Which output does the ward team need?", lines: [
      "Suppose the hospital team asks how to choose among four ways of grouping exactly the same operating records.",
      "If the team needs a typical operating profile for each compact group, k-means gives a centre the manager can read column by column.",
      "If it wants to see which small groups join into larger ones, a Ward tree keeps the history of those joins.",
      "If it wants to follow connected crowds and inspect visits left outside them, DBSCAN makes the reach of a neighbourhood explicit.",
      "If profiles overlap and an individual visit could plausibly fit either, a Gaussian mixture gives a membership probability for each component."
    ]},
    { id: "s23", kind: "script", heading: "Follow the two files through Python", lines: [
      "Read this excerpt as two paths through the same analysis, one for the original visits and one for the shuffled comparison.",
      "The first highlighted line learns the mean and spread of each operating column and uses them to put the visits on a common scale.",
      "The next lines rearrange each column independently while keeping all its values, creating the table for the comparison run.",
      "For every candidate group count the loop fits both tables using the same settings and keeps the labels from each fit.",
      "The last lines score each set of labels on its own table and print the difference so that a reader can check the comparison."
    ]},
    { id: "s24", kind: "skip", heading: "What changes if the scaling line is skipped?", wait: true, lines: [
      "The two panels use the same distinct complete visits, but one run uses common units and the other leaves the original measurements untouched.",
      "Try two groups and then four to see when the choice of ruler makes the larger difference to which visits end up together."
    ]},
    { id: "s44", kind: "stability", heading: "Would the same visits stay together?", lines: [
      "Before giving the groups names, ask whether pairs of visits would stay together if a reasonable part of the analysis changed.",
      "The adjusted Rand index compares pairs across fits, giving one for identical groupings and an expected value of zero for chance agreement.",
      "Across twenty starts the lowest recorded agreement rounds to one for two groups but falls to about zero point five six for four groups.",
      "For the two-group fit, the half-sample check also reports agreement of one to two decimal places when comparing visits shared with the full fit.",
      "Using Ward’s tree in place of k-means gives about zero point nine seven agreement, evidence that this particular change leaves most pairings intact."
    ]},
    { id: "s45", kind: "varsens", heading: "What if the same idea enters twice?", lines: [
      "The meaning of similar depends on what we put in the table even after every operating column has been standardised.",
      "With four scaled columns, each contributes one squared gap to the distance calculation for a pair of hospital visits.",
      "Add two exact copies of occupancy and the very same occupancy gap now enters that pair’s total three times.",
      "Fit the two-group model four more times, leaving out one operating column each time while keeping the visits and remaining settings fixed.",
      "Agreement with the four-column fit stays around zero point nine eight when dropping staffing or handoffs, zero point nine three without occupancy, and zero point eight six without training hours."
    ]},
    { id: "s46", kind: "snakeplot", heading: "Read the centre in two sets of units", lines: [
      "After checking the fit, imagine laying out one row per group so that a manager can see what an average visit in each group looks like.",
      "A standardised profile shows what stands out across measurements, while the original units tell the ward team how large the differences are.",
      "Zero on this plot marks the hospital average for each measurement, so the side of the line tells us whether a group lies above or below average.",
      "Follow the stretched group from below-average staffing and training to occupancy almost nine tenths of a standard deviation above the mean.",
      "Back in hospital units that occupancy averages nearly ninety percent with a standard deviation of about six point seven points, compared with five point eight in the well-resourced group."
    ]},
    { id: "s14", kind: "naming", heading: "What name could the numbers support?", lines: [
      "Cover the names for a moment and read the operating measurements just as a ward manager would see them.",
      "In one group the average visit has about ten hours of training, close to ninety percent occupancy and roughly five handoffs.",
      "In the other group training averages about twenty-six hours, occupancy is nearer seventy-three percent and handoffs average fewer than three.",
      "Stretched and well-resourced are possible names for these operating profiles because the differences in workload and resources appear together in the rows.",
      "Ask a ward manager which measurements make each name recognisable and where the name might mislead someone about an individual visit."
    ]},
    { id: "s25", kind: "nameit", heading: "Give three profiles defensible names", wait: true, lines: [
      "At three groups the hospital table has a separate row for each centre, with all four measurements back in familiar units.",
      "Choose a name for each profile and point to the measurement that distinguishes it most clearly from the other two."
    ]},
    { id: "s26", kind: "segments", heading: "Does a profile matter outside the input table?", lines: [
      "Now bring back the patient measures that were kept out of the fit and match them to the two operating groups by visit.",
      "Average satisfaction is about sixty in the stretched profile and eighty-four in the well-resourced profile among the distinct complete visits.",
      "Complaints occur in about twenty-nine percent versus three percent of visits, and readmissions are also more frequent in the stretched profile.",
      "Those comparisons describe experiences recorded alongside each profile, while the effect of changing staffing would require a different study.",
      "A segment is useful to the team if it is large enough to matter, holds up on repeated fits, is recognisable and suggests a distinct action."
    ]},
    { id: "s47", kind: "pvaltrap", heading: "Why an input cannot validate its own split", lines: [
      "Suppose a draft first groups Al Waha visits using occupancy and then offers an ordinary test of the occupancy difference as evidence for those groups.",
      "Occupancy helped decide who went into each group, so treating those labels as fixed independently of occupancy breaks the logic of the test.",
      "For a fixed file, pulling visits closer to their own centres leaves more of the total squared variation between the groups by construction.",
      "Even on the shuffled Al Waha noise table, testing occupancy across the two fitted groups gives an F statistic of sixteen point eight and a p-value of about four in one hundred thousand.",
      "Waiting time was kept outside the fit and averages seventy-eight and forty-eight minutes in the two profiles, a descriptive comparison worth investigating."
    ]},
    { id: "s15", kind: "sentences", heading: "Which claims can the thesis defend?", split: 1, lines: [
      "For each sentence in the draft, decide whether the measurements and choices made in this analysis give the author enough evidence to write it.",
      "Changing the requested number of centres changes the partition, so the author needs to own the decision to report four.",
      "Calling a group high-performing would require a defensible measure of performance beyond the staffing and workload measurements used here.",
      "A clustering routine returns labels, and a claim about statistical significance would require a specified and appropriate inferential procedure.",
      "A difference in satisfaction across groups describes an association among these visits and leaves open what produced that difference."
    ]},
    { id: "s48", kind: "thesis", heading: "What would another researcher need to repeat?", lines: [
      "Imagine giving another doctoral researcher just your methods and results pages and asking them to reproduce the Al Waha analysis.",
      "Report the four inputs, the scaling and how four thousand seven hundred and forty complete episodes became four thousand seven hundred and twenty-nine after removing duplicates.",
      "Specify the distance, joining or assignment rule, initialisation, number of starts, random seed and software version for the model you actually fitted.",
      "Give the range of group counts examined and place each observed separation score beside the score obtained using the same procedure on shuffled data.",
      "Let the stability checks, original-unit profiles and patient comparisons support a description whose scope stays with the visits you actually studied."
    ]},
    { id: "s49", kind: "thesisaudit", heading: "Audit a draft before it goes to the examiner", wait: true, lines: [
      "This draft makes four decisions that a reader might challenge, beginning with which hospital columns were allowed to influence the group labels.",
      "Select the wording you could defend and use the feedback to locate the measurement or comparison that supports your decision.",
      "Read the four decisions together and revise any claim that goes further than the grouping and the recorded outcomes allow."
    ]},
    { id: "s16", kind: "helper", heading: "What can the research helper explain?", lines: [
      "The researcher chooses the question and interprets the ward profiles, while a helper can explain an unfamiliar line of code.",
      "Asking what ten starts do gives you an explanation you can check by comparing the final spreads from repeated fits.",
      "Choosing a name for the stretched profile requires a judgement you can defend from the centre and from what the ward team recognises."
    ]},
    { id: "s17", kind: "quiz", heading: "Check your reasoning", wait: true, lines: [
      "Work through fourteen decisions about the hospital analysis and use the explanation after each answer to check the reasoning behind your choice."
    ]},
    { id: "s18", kind: "takeaways", heading: "Prepare your own ward analysis", lines: [
      "Imagine opening a fresh ward file with the same request to describe the conditions under which visits took place.",
      "Without a recorded group label, the columns you choose give the analysis its working definition of similar visits.",
      "Work through one pair in raw units and again in standard deviations so you can explain which measurements drive the distance.",
      "Keep the settings fixed while you shuffle the columns independently and report the two scores side by side.",
      "Read each centre in original units and write a name you could defend if a manager asked which numbers support it.",
      "In the self-paced session change the operating inputs and see whether the evidence still supports the same description of the visits."
    ]}
  ],
  // Real figures, Al Waha episodes file, clustering on staff_ratio, training_hours, occupancy_pct, handoffs (standardised).
  // Silhouette table as on the Week 12 slides: [k, real, shuffled, gap]
  gaps: [[2, 0.504, 0.190, 0.314], [3, 0.404, 0.175, 0.229], [4, 0.331, 0.182, 0.149], [5, 0.290, 0.183, 0.107], [6, 0.254, 0.184, 0.069]],
  quiz: [
    { q: "Four requested groups produce four tidy colours on both the original and the shuffled map. What can you conclude?",
      o: ["Four natural group labels have been recovered.","Both files can be partitioned at this k.","Both files have the same silhouette.","Each centre represents a ward policy."], a: 1,
      why: "A colour is an assignment. Compare separation and stability before interpreting the partition." },
    { q: "An occupancy gap is 20 percentage points and a staffing gap is 0.3. Which quantity is the staffing contribution to raw squared distance?",
      o: ["0.09","0.3","20.3","400.09"], a: 0,
      why: "Squaring the staffing gap gives 0.09. Occupancy contributes 400 to the same total." },
    { q: "Which shuffle makes a useful baseline for the association among the four operating columns?",
      o: ["Reorder whole visits together.","Shuffle the fitted group labels only.","Sort each column from low to high.","Permute each column independently and repeat the fit."], a: 3,
      why: "Independent permutations preserve each column’s values while breaking the original pairings across columns. Moving whole rows would preserve the operating profiles." },
    { q: "Which comparison gives the strongest descriptive support for two groups among the candidates shown?",
      o: ["The two-group inertia is larger than the six-group inertia.","The two-group shuffle has a positive silhouette.","The real-minus-shuffled silhouette is 0.314 at two and 0.069 at six.","The two-group fit returns a centre for every group."], a: 2,
      why: "The two-group fit gains more separation over its own shuffle baseline. The choice also needs an operational interpretation." },
    { q: "Which sentence could a manager verify directly from the centre table?",
      o: ["The more crowded profile also averages fewer training hours.","Moving a visit into the other group would shorten its wait.","The table proves there are two kinds of ward.","The higher-staffed profile delivers better care."], a: 0,
      why: "Both occupancy and training hours appear in the centre table. Claims about causes or quality require additional evidence." },
    { q: "Inertia falls from 18,916 at one group to 7,594 at two and 5,898 at three. What makes two a plausible elbow?",
      o: ["It has the minimum inertia.","The first reduction is much larger than the second.","The change equals the shuffle gap.","Every additional group must increase inertia."], a: 1,
      why: "The first extra centre removes 11,322 units of squared spread. The next removes 1,696. The elbow describes diminishing gains." },
    { q: "Four-group fits settle at different inertia values from different starts. Which result should a ten-start run keep?",
      o: ["The fit with the largest group.","The fit that finishes first.","The fit with the greatest distance between two centres.","The fit with the lowest final inertia."], a: 3,
      why: "Repeated starts explore different local solutions. K-means compares them using its within-group squared-distance objective." },
    { q: "A colleague omits scaling and the code still runs. Which comparison best checks the consequence?",
      o: ["Compare the numerical colour labels directly.","Count how often the script raises a warning.","Refit on the same visits and compare pair membership across the two fits.","Compare the raw inertia with the standardised inertia in absolute units."], a: 2,
      why: "The adjusted Rand index compares the partitions even when label numbers differ. Inertias in different measurement systems have different units." },
    { q: "The director wants operating profiles and a later comparison of complaints. Where does complaint status belong?",
      o: ["Beside the final labels after the fit.","Inside the distance calculation with a smaller weight.","In the fit only for visits with a complaint.","In the initial centre-selection rule."], a: 0,
      why: "Keeping complaints outside all fitting decisions allows a later descriptive comparison of a variable that did not help create the labels." },
    { q: "Two branches contain several visits each. Which merge does Ward linkage prefer?",
      o: ["The smallest distance between any two visits.","The smallest increase in within-group squared spread.","The shortest average waiting time.","The largest increase in the mean silhouette."], a: 1,
      why: "Ward evaluates the increase in within-group sum of squares caused by a candidate merge. Single linkage would look at the closest pair instead." },
    { q: "With a minimum count of five, a visit has only three visits including itself inside its circle. It is within reach of a core visit. How is it treated?",
      o: ["It extends the search as a core.","It must be deleted from the data.","It starts a new group of three.","It joins the existing group as a border visit."], a: 3,
      why: "A reachable non-core visit can join a group. Expansion continues through core visits." },
    { q: "A visit falls where two fitted Gaussian components overlap. Which output describes its ambiguity?",
      o: ["The smaller of the two group sizes.","The adjusted Rand index between the centres.","Its membership probabilities under the fitted mixture.","The raw count of neighbours inside a fixed radius."], a: 2,
      why: "Each component’s weighted density at the visit contributes to its membership probability. The probabilities across components sum to one." },
    { q: "The minimum adjusted Rand agreement over repeated starts is 1.00 at two groups and 0.56 at four. Which conclusion fits those checks?",
      o: ["Two groups will be identical in every future hospital.","The tested two-group fits were more consistent across starts.","Four groups have the lower silhouette in every dataset.","The two-group fit requires no sensitivity checks."], a: 1,
      why: "The comparison concerns the starts and visits examined. Resampling and changing the method probe different sources of variation." },
    { q: "A thesis uses occupancy to fit its groups, then quotes an ordinary test of occupancy across those groups as validation. What is the main problem?",
      o: ["The labels were chosen partly using the measurement being tested.","The test should always use ranks instead.","The occupancy values need one extra decimal place.","The test needs at least four groups."], a: 0,
      why: "The usual reference distribution ignores the data-dependent choice of groups. Describe occupancy in the profiles and examine held-out variables separately." }
  ]
};
