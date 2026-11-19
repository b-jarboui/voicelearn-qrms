// PHQM830 Week 14 · Chapter 4 "Neural network concepts for prediction"
// Each spoken sentence advances one animation beat.
// Rebuilt 18 Nov 2026: 48 scenes (~45 minutes), 11 interactive scenes, 14 quiz questions.
window.CHAPTER = {
  course: "PHQM830 Quantitative Research Methods and Statistics",
  week: "Week 14",
  title: "Neural network concepts for prediction",
  subtitle: "A neuron is a regression with one extra step",
  scenes: [
    { id: "s01", kind: "title", heading: "Can a network predict a patient's satisfaction?", lines: [
      "Picture a busy afternoon at Al Waha, with the last few beds filling and another patient waiting to be seen.",
      "Before that patient returns a survey, what could the team learn about their likely satisfaction from the record of the visit?",
      "Follow one calculation inside a neural network, and you will see how a familiar regression can acquire a bend."
    ]},
    { id: "s02", kind: "recall", heading: "Four ideas you already know", lines: [
      "Think back to predicting a satisfaction score from the information available about one visit at Al Waha.",
      "In a regression, the coefficient on waiting time tells us how much the prediction changes per extra minute when other inputs stay fixed.",
      "The intercept gives the starting value when every input is zero, much like the number a neuron adds to its total.",
      "We also kept some episodes apart for scoring and put inputs measured in different units onto a common scale.",
      "Inside a neuron the multiplier is called a weight and the starting value is called a bias."
    ]},
    { id: "s03", kind: "bend", heading: "Where does the occupancy pattern bend?", lines: [
      "Read each dot as a group of Al Waha episodes with similar bed occupancy, with larger dots standing for more visits.",
      "Follow the dots from left to right and notice how satisfaction stays near eighty before falling to about forty-three in the busiest band.",
      "The straight line asks a different question about a single profile with the other five predictors held at their middle values.",
      "With just one slope for occupancy, the regression must predict the same change for every extra five percentage points.",
      "For that same profile, the network predicts about seventy-seven points at eighty percent occupancy and about fifty-six at full occupancy."
    ]},
    { id: "s04", kind: "neuron", heading: "Follow a signal through one neuron", lines: [
      "Imagine routing two numbers from a hospital record into a small calculation, one for the wait and one for occupancy.",
      "The waiting time of sixty-two minutes travels along a connection with a weight of minus one tenth, giving minus six point two.",
      "Add the occupancy contribution of minus four point four and a bias of fourteen, and the total reaches three point four.",
      "The gate sends negative totals to zero and lets our positive three point four through unchanged.",
      "That entire calculation is one neuron, and the next neuron can use its answer as an input."
    ]},
    { id: "s05", kind: "byhand", heading: "Work out two outputs", wait: true, lines: [
      "Use half of the first input and subtract one fifth of the second before adding the bias of one.",
      "Keep those settings fixed as you switch from the first pair of inputs to the second pair below.",
      "Choose each episode in turn and predict what leaves the gate after you have worked out the total."
    ]},
    { id: "s06", kind: "rule", heading: "What happens if we remove the gate?", lines: [
      "Imagine taking the gate out of the calculation while keeping all the connections that multiply and add.",
      "Feed the straight line on the left into another such calculation and follow the straight line that comes out.",
      "Repeating this operation changes the slope and starting height, but a single straight line could still do the whole job.",
      "Put the gate back and the flat section on one side can meet a sloping section on the other."
    ]},
    { id: "s07", kind: "hinges", heading: "Build the bend one hinge at a time", lines: [
      "Use the dots for the hospital's occupancy bands as a guide while we build a small example by hand.",
      "Start with a prediction of eighty-four points across the whole ward, whatever fraction of its beds are occupied.",
      "The first hinge takes something away only above eighty percent occupancy, leaving the quieter end exactly where it was.",
      "A second hinge steepens the fall at eighty-six percent and a third eases it again at ninety-four percent.",
      "Together those three contributions trace a bend like the one in the observations, with each corner supplied by a single unit."
    ]},
    { id: "s24", kind: "act_intro", heading: "Give the gate a name", lines: [
      "Look inside the box between the total for a visit and the signal that goes to the next unit.",
      "Imagine two hospital visits that give this unit quite different totals, one at minus four and the other at nine.",
      "Under our gate the first visit sends no signal onward and the second passes on all nine units.",
      "The rule is an activation function, and this particular hinge is called a rectified linear unit, or ReLU.",
      "An alternative is the hard step shown alongside it, which sends the same one for every positive total.",
      "On that upper shelf a small change leaves the output still, whereas an active hinge responds to each extra unit."
    ]},
    { id: "s25", kind: "act_beyond", heading: "When a smooth bend helps", lines: [
      "A hinge gives us a sharp corner, but we might want a signal that changes gradually as the hospital gets busier.",
      "Suppose the outcome were whether a patient filed a complaint and we wanted the answer on a probability scale.",
      "The curve called a sigmoid sends any total into the interval between zero and one, with zero landing halfway up.",
      "You may recognise that S shape from logistic regression, where it turns a score into a predicted probability.",
      "The second curve, called hyperbolic tangent, crosses zero in the middle and can also send a negative signal onward.",
      "Trace either curve toward a flat end and even a sizeable change in the input produces very little movement above it.",
      "ReLU keeps responding on its positive side, although a unit whose totals stay negative for every visit can fall silent throughout training."
    ]},
    { id: "s26", kind: "act_output", heading: "What should come out of the last unit?", lines: [
      "Some units get a visit ready for the next calculation, while the final unit produces the score the team reads.",
      "Those units inside the network are called hidden units, and their gates let the prediction bend as the inputs change.",
      "At Al Waha the number we ultimately want is a satisfaction score measured in points on the survey scale.",
      "A final gate that squeezes everything between zero and one could never pass a score of seventy-eight points through unchanged.",
      "Letting the last total pass straight out is called an identity output, and it leaves the prediction in satisfaction points.",
      "For one yes-or-no outcome a sigmoid can give a probability, while softmax makes probabilities for several alternative categories add to one."
    ]},
    { id: "s27", kind: "actlab", heading: "Send the same total through different gates", wait: true, lines: [
      "Set the slider to a negative total and predict which of these gates will send any signal onward.",
      "Keep that total fixed while you change the rule so the moving dot shows exactly what the gate changed.",
      "Now cross zero slowly to watch the local slope change; on the Al Waha split, ReLU reaches a held-out root mean squared error of about six point one three points, compared with six point one four for tanh and six point one one for logistic."
    ]},
    { id: "s08", kind: "network", heading: "Read the network from left to right", lines: [
      "Follow the connections from one Al Waha episode on the left to its predicted satisfaction score on the right.",
      "Six input positions carry the waiting time, staffing ratio, staff training, bed occupancy, handoffs and number of prior visits.",
      "Each of the thirty-two units in the first hidden layer gets to combine all six inputs in its own way.",
      "Sixteen units in the next layer combine those signals before a final unit collects them into one predicted score.",
      "Training must find seven hundred and sixty-nine numbers for this design, counting both the connecting weights and the biases inside units."
    ]},
    { id: "s28", kind: "param_count", heading: "Count what the network must learn", lines: [
      "You can count every adjustable number in this hospital model by following the connections one layer at a time.",
      "Each of thirty-two units gets six incoming weights and one bias, giving a first subtotal of two hundred and twenty-four.",
      "In the next layer each of sixteen units takes thirty-two incoming weights and one bias, bringing that subtotal to five hundred and twenty-eight.",
      "At the output there are sixteen incoming signals to weight and one last bias to set the starting level.",
      "Add the connection counts separately from the bias counts and you get seven hundred and twenty weights and forty-nine biases.",
      "Both kinds of number change during fitting, which is why we call the full set of seven hundred and sixty-nine numbers parameters."
    ]},
    { id: "s10", kind: "rmse", heading: "How far did four predictions miss?", lines: [
      "Each card pairs a survey score with the prediction for that visit in this four-episode example.",
      "Subtract the prediction from the real score, so a negative error tells us the model predicted too high for that patient.",
      "Squaring each error gives four, one, nine and thirty-six, which means misses in opposite directions can no longer cancel.",
      "The four squares sum to fifty, so their mean is twelve and a half in squared satisfaction points.",
      "Take the square root to return to points and you get about three point five four, the root mean squared error."
    ]},
    { id: "s11", kind: "squares", heading: "Change just one prediction", wait: true, lines: [
      "Keep the first three episodes fixed and move the fourth prediction toward the actual score of eighty-five.",
      "Then move equally far to either side of eighty-five and compare the square's area with the error shown below the slider."
    ]},
    { id: "s29", kind: "loss_fn", heading: "Choose what counts as a costly miss", lines: [
      "Imagine comparing two sets of network weights that make different mistakes on the very same hospital visits.",
      "A rule that puts a cost on those mistakes is a loss function, and training tries to reduce its value.",
      "Squared error gives a miss twice as large four times the cost, so the steep sides of the curve matter.",
      "On the held-out visits, a mean square of about thirty-seven and a half gives a root mean squared error of about six point one two points.",
      "If we average the size of each miss without squaring, we get the mean absolute error of about four point nine one points.",
      "Both summaries use the same predictions, but the larger misses pull the root mean squared error further upward.",
      "Huber loss softens the cost of extreme misses, while a probability forecast such as complaint risk calls for a rule such as log loss."
    ]},
    { id: "s09", kind: "learn", heading: "Watch the training trace change", lines: [
      "The network begins with small random settings, so picture its starting position somewhere high above a valley floor.",
      "After its first pass through the Al Waha training rows the recorded loss corresponds to roughly seventy-four satisfaction points on the root-error scale.",
      "At each update the computer uses the local slope of the loss to decide which way to move the settings.",
      "Follow the measured training trace as it passes about twenty points at pass twenty and approaches six by the end.",
      "The flattening trace tells us that later passes made much smaller gains on the visits used to fit the network."
    ]},
    { id: "s30", kind: "grad_descent", heading: "Which way should a weight move?", lines: [
      "Imagine adjusting just one weight on the waiting-time input while keeping every other part of the hospital network fixed.",
      "The horizontal position in this teaching example is the setting of that weight, and the height is the loss it produces.",
      "At the current setting the short tilted line tells us what would happen if we increased the weight a little.",
      "On the left wall its slope is negative, so a small move to the right takes us closer to the bottom.",
      "On the right wall the slope is positive, so the downhill move now goes in the opposite direction.",
      "Collect these local slopes into a gradient and step against it across the parameters, a procedure called gradient descent."
    ]},
    { id: "s31", kind: "lr_concept", heading: "How long should the downhill step be?", lines: [
      "Even after finding which way is downhill, we still need to choose how far to move on each update.",
      "In a simple descent calculation we multiply the local slope by a number called the learning rate before subtracting that step from the weight.",
      "If this multiplier is too small, progress stalls: on the Al Waha split, starting at zero point zero zero zero zero one runs for all two hundred epochs without converging and leaves training error at about seventy-three point two points and held-out error at seventy-three point four.",
      "If it is too large for the practice curve, one step can overshoot the bottom, while on the hospital network an initial rate of zero point five stops after twenty-three epochs at a training error of six point five three points and a held-out error of six point four eight.",
      "A suitable step for this bowl brings the weight closer to the bottom as the slope gradually flattens.",
      "The hospital model starts at zero point zero zero one with Adam, an optimiser that adjusts the step for each weight."
    ]},
    { id: "s32", kind: "lrlab", heading: "Take six steps on the same loss curve", wait: true, lines: [
      "Keep the starting weight and the shape of the bowl fixed while you choose how far each update should move.",
      "Move the update slider one step at a time and compare the height of the dot with the loss printed below it.",
      "Try the largest rate and decide whether crossing to the other side brought the weight closer to the bottom or further away."
    ]},
    { id: "s33", kind: "backprop", heading: "Trace one error back to its source", lines: [
      "Imagine a visit where the network predicts too low and we want to know how a weight near the input contributed.",
      "Trying a small change to every weight separately would mean repeatedly running the same visit all the way through the network.",
      "In the forward pass the signals travel toward the output, where a prediction of seventy-nine misses the real score of eighty-five by six.",
      "Now trace a change in loss backwards from the prediction toward the signals that fed into it.",
      "The upper connection multiplies the loss slope of minus six by its weight of zero point eight, passing back minus four point eight.",
      "The lower hinge has a negative total, so its slope of zero blocks the gradient back to its incoming weights for this visit.",
      "Multiplying slopes along paths and adding where they meet is the chain rule behind backpropagation, which supplies the gradients for the next update."
    ]},
    { id: "s34", kind: "batches", heading: "How many updates fit in a pass?", lines: [
      "Picture the three thousand nine hundred training records stacked beside the network while its current weights wait for an update.",
      "A single visit can point in an unusual direction, while using the entire stack means waiting for every visit before taking even one step.",
      "At this sample size the default groups up to two hundred episodes together in what is called a mini-batch.",
      "Within a group the optimiser uses the average loss gradient across its visits to make one update to the parameters.",
      "Nineteen full groups account for three thousand eight hundred episodes, leaving one smaller group of a hundred to finish the pass.",
      "One complete pass is an epoch, so three hundred and twenty-one passes with twenty updates apiece give six thousand four hundred and twenty updates."
    ]},
    { id: "s12", kind: "scale", heading: "Give minutes and ratios a common scale", lines: [
      "A ten-minute difference in waiting time looks much larger on paper than a difference of one tenth in staffing ratio.",
      "In our practice visit the wait is sixty minutes, while the staffing ratio is just one point two.",
      "That difference in size can make a change in one weight alter the prediction much more than an equal change in another.",
      "Subtract each training mean and divide by its standard deviation, and both measurements land one standard deviation above their means.",
      "Removing that step from the hospital network raised its held-out root mean squared error from about six point one two to six point nine one."
    ]},
    { id: "s13", kind: "pipeline", heading: "Who gets to set the ruler?", lines: [
      "Follow a record through three linked operations that fill missing values, put the inputs on comparable scales and fit the network.",
      "The training episodes supply the median for filling each column and the mean and spread for scaling that filled column.",
      "When a test visit arrives, the program applies those stored numbers before handing its six inputs to the fitted network.",
      "Chaining the operations into a pipeline lets us fit them together after the split and use the same ruler on every new visit."
    ]},
    { id: "s35", kind: "leakage", heading: "When does the future slip into the fit?", lines: [
      "Imagine predicting a patient's satisfaction at discharge while a copy of tomorrow's survey is already sitting in the training folder.",
      "Whenever information unavailable at prediction time influences the model or its selection, we call the problem data leakage.",
      "Fitting the imputer and scaler on all five thousand two hundred episodes before splitting lets the test visits help set the ruler, nudging held-out error from about six point one three points inside the pipeline to six point one two.",
      "Choosing the best layer size after looking at test scores gives those same episodes a vote in the design.",
      "A follow-up apology call recorded after the survey is another clue that would be missing when the real prediction is due.",
      "For predictions about new patients or future shifts, keep related visits together or hold out later dates to match that question.",
      "Trace each ingredient back to its source and time of collection before trusting an encouraging number on the screen."
    ]},
    { id: "s36", kind: "leakspot", heading: "Audit four hospital workflows", wait: true, lines: [
      "Imagine reviewing four proposed ways to predict satisfaction for a patient whose survey has yet to come back.",
      "For each workflow, look for the first place where a test visit or a later event could influence a decision.",
      "Mark each one and read its explanation, paying attention to whether the problem came from preparation, selection or the predictor itself."
    ]},
    { id: "s14", kind: "results", heading: "Read the comparison in satisfaction points", lines: [
      "Both models faced the same thirteen hundred held-out visits, so we can compare their errors in satisfaction points.",
      "The linear baseline records a root mean squared error of about seven point zero seven satisfaction points on these visits.",
      "The scaled network brings that figure down to about six point one two points on the very same visits.",
      "The unscaled network still beats the baseline, which helps explain how leaving out the scaler could escape notice.",
      "Read the difference of about zero point nine five points beside the outcome's standard deviation of roughly sixteen points when judging its size."
    ]},
    { id: "s15", kind: "cost", heading: "What does that improvement cost?", lines: [
      "Suppose a ward manager asks what the prediction does when the wait gets longer while everything else stays the same.",
      "For the linear model we can follow a single coefficient to describe the change per extra minute at a fixed staffing level and occupancy.",
      "For the network a change travels through several paths, and which gates are open depends on the particular episode.",
      "The gain in predictive accuracy has to be weighed against the extra work needed to explain a prediction to that manager."
    ]},
    { id: "s16", kind: "overfit", heading: "Can a low training error flatter us?", lines: [
      "A training score can look encouraging even when the same network performs poorly on visits it has never encountered.",
      "Here the larger network has two hidden layers of two hundred and fifty-six units and sees only sixty episodes during fitting.",
      "Follow the training curve all the way to the last recorded pass, where its error has fallen to just over five points.",
      "At that same pass the error on unseen visits is nearly thirteen points, even though both curves started much higher.",
      "This gap is evidence of overfitting, where the details learned from a small training sample carry over poorly to fresh visits."
    ]},
    { id: "s37", kind: "val_set", heading: "Which visits may choose when to stop?", lines: [
      "Suppose you want to choose a stopping pass for the next hospital model before writing up its performance.",
      "Checking the final test score after every pass would quietly let the test episodes influence the choice you make.",
      "Once those visits have helped choose the settings, their score can no longer serve as an independent check of that choice.",
      "Instead set aside a tenth of the development pool, leaving three thousand five hundred and ten visits to fit and three hundred and ninety to check.",
      "That smaller group is the validation set, and its job is to help choose a setting while the weights learn from the fitting group.",
      "Reserve the separate thirteen hundred test episodes for evaluating the procedure after those modelling decisions are settled."
    ]},
    { id: "s38", kind: "early_stop", heading: "Save the weights that generalise", lines: [
      "Imagine keeping a copy of the weights after each pass so you can return to an earlier version of the network.",
      "In this example the fitting and validation errors initially fall together as the model starts picking up a repeatable pattern.",
      "Later the fitting error keeps falling while the validation error climbs, making an earlier set of weights more attractive.",
      "Allow a few passes for a temporary setback, then return to the best validation checkpoint when improvement fails to resume.",
      "This is early stopping, which checks validation R squared: on the full training pool our thirty-two-by-sixteen network stops at epoch three hundred and twenty-one with best validation R squared zero point eight two and held-out error six point one seven points.",
      "On the sixty-episode subset a ten percent check leaves only six visits, so the two-hundred-and-fifty-six-by-two-hundred-and-fifty-six network stops at epoch eighty with validation R squared minus one point five seven and held-out error twenty point six five points."
    ]},
    { id: "s39", kind: "regularisation", heading: "Give large weights a cost", lines: [
      "Imagine two curves that follow much the same overall occupancy pattern, but one takes a sharp detour to fit a few visits.",
      "If we only reward closeness to those visits, a network can afford to use large weights that amplify a small change in input.",
      "Adding a cost based on the sum of squared weights makes such a setting more expensive during fitting.",
      "This is called L two regularisation: on the sixty-episode overfit network, raising alpha from zero point zero zero zero one to one and then ten lowers held-out error from eleven point zero one to ten point two nine and eight point eight four points.",
      "On the full three thousand nine hundred training rows, the smaller network stays near six point one three, six point one seven and six point one one points across those penalties, though an extreme penalty can still suppress a useful bend.",
      "Another technique called dropout temporarily switches off some units during training, whereas the regressor in this chapter uses a weight penalty."
    ]},
    { id: "s40", kind: "reglab", heading: "Choose a checkpoint before opening the test set", wait: true, lines: [
      "Use the small practice example to decide how much flexibility a model should have before anyone looks at its final score.",
      "Try each penalty and move the checkpoint mark to find the lowest validation error among the choices you have inspected.",
      "Commit to one setting and read the final errors for the two practice visits, with the controls locked at the choice you made."
    ]},
    { id: "s41", kind: "cross_val", heading: "Rotate the validation visits", lines: [
      "Suppose the visits set aside for checking happened to be unusually easy and you want to see how much that matters.",
      "Inside the hospital's development pool, give each of five groups a turn checking a model fitted using the remaining four.",
      "Each group is called a fold, and dividing three thousand nine hundred visits equally gives seven hundred and eighty visits in each fold.",
      "Follow the coloured block across the rows to see each group take one turn in validation and four turns in fitting.",
      "Start each round with a fresh pipeline so that even the medians used to fill gaps come only from that round's fitting visits.",
      "Across five folds of the five thousand two hundred Al Waha episodes, cross-validation gives a mean root mean squared error of seven point one zero points with standard deviation zero point one four for the linear pipeline, versus six point one five with standard deviation zero point two zero for the network."
    ]},
    { id: "s42", kind: "hyperparams", heading: "Which numbers do you choose?", lines: [
      "Before the hospital model sees a single visit, someone has already decided how many units there will be in each hidden layer.",
      "The weights and biases inside those units are parameters, the numbers adjusted repeatedly as the network learns from the fitting visits.",
      "Settings chosen before a fit, such as layer sizes or the weight penalty, are called hyperparameters.",
      "Across five development folds of the three thousand nine hundred training visits, one hidden layer of eight units averages a root mean squared error of six point two four points with standard deviation zero point zero nine.",
      "Two layers of thirty-two and sixteen units average six point two one with standard deviation zero point zero five, closely matching sixty-four and thirty-two at six point one nine with standard deviation zero point zero seven before we refit on the whole development pool.",
      "Only then use the final test group to report how the selected procedure performed on episodes outside that choice."
    ]},
    { id: "s17", kind: "seeds", heading: "How much does a different start matter?", wait: true, lines: [
      "A new random seed can change the initial weights and the order of training visits even when the split stays fixed.",
      "Reveal all five recorded runs and compare their range with the improvement over the linear model before choosing what to report."
    ]},
    { id: "s43", kind: "perm_imp", heading: "Shuffle one column and score again", lines: [
      "Imagine asking whether the fitted network actually uses bed occupancy when it predicts satisfaction on the held-out visits.",
      "Keep its weights fixed and first score the original records, obtaining the reference error of about six point one two points.",
      "Now move the occupancy entries between visits while each patient's recorded satisfaction and all other inputs stay in place.",
      "Apply the same network to the changed records and subtract the original error from the new one.",
      "Across ten shuffles on the held-out visits, disrupting occupancy raises root mean squared error by four point eight two points with standard deviation zero point one three, ahead of waiting time at two point two three with standard deviation zero point zero eight and staffing ratio at two point two three with standard deviation zero point one one.",
      "Handoffs adds one point two one points with standard deviation zero point zero six and staff training zero point seven two with standard deviation zero point zero seven, while prior visits changes the error by minus zero point zero one with standard deviation zero point zero one under permutation importance."
    ]},
    { id: "s44", kind: "permlab", heading: "Follow a column through a shuffle", wait: true, lines: [
      "Work with the four practice visits below and a small prediction rule whose arithmetic you can check yourself.",
      "Choose a column to rotate and follow each coloured value to its new patient while the recorded survey scores stay in their original rows.",
      "Compare the recalculated errors and explain why shuffling an input that the practice rule ignores leaves every prediction unchanged."
    ]},
    { id: "s45", kind: "pdp", heading: "Average a prediction at each occupancy", lines: [
      "Imagine asking what score the fitted network would predict across a whole collection of visits at the same occupancy.",
      "Start by setting every visit's occupancy to fifty percent while keeping its own wait, staffing and other inputs exactly as recorded.",
      "At fifty percent, the four practice predictions are eighty-eight, eighty-six, eighty-four and eighty-two, so their average is eighty-five points.",
      "Repeat across a grid of occupancies and join the resulting averages to make a partial dependence plot.",
      "The hospital curve already in the file instead holds the other five inputs at their medians, representing just one reference profile.",
      "Averaged across all three thousand nine hundred training visits, the partial dependence curve stays near seventy-eight point eight points at fifty percent, seventy-seven point eight at sixty, seventy-seven point six at seventy and seventy-seven point seven at eighty, before falling to seventy-five point seven at eighty-five, seventy point five at ninety, sixty-three point one at ninety-five and fifty-six point one at full occupancy."
    ]},
    { id: "s46", kind: "interp_limits", heading: "What can a model inspection tell us?", lines: [
      "Suppose a ward manager sees a bend in a prediction curve and asks what will happen if the hospital changes its policy.",
      "The curve describes the fitted network's response to edited records, and a policy question requires evidence about what happens to actual patients.",
      "For example, a busy shift might increase handoffs and lower satisfaction together even if changing the handoff count alone would do little.",
      "Shuffling correlated inputs can also create unusual combinations, such as a very short wait paired with extremely high occupancy.",
      "When two inputs carry similar information, another fitted network can lean on a different one and still make equally accurate predictions.",
      "Use these tools to look for implausible model behaviour and state the evidence separately for any proposed change in practice."
    ]},
    { id: "s18", kind: "checks", heading: "Four checks before writing the result", lines: [
      "Put the hospital score aside for a moment and inspect the conditions under which that number was produced.",
      "First trace the scaler back to the training rows to make sure the test visits had no part in setting its units.",
      "Next look for a gap between fitting and validation error that might warn of too much flexibility for the available data.",
      "Then compare the chosen network with the ordinary linear model using the same episodes, outcome and error measure.",
      "Finally show the range across random starts so a reader can see how sensitive this comparison was on this split."
    ]},
    { id: "s47", kind: "thesis_report", heading: "Write a result another researcher can check", lines: [
      "Imagine handing your thesis table to a colleague who wants to reproduce the hospital comparison from the description beside it.",
      "Describe the six inputs, the two hidden layers with thirty-two and sixteen hinge units, and the single output in satisfaction points.",
      "Give the split and the preprocessing sequence, including which visits supplied the medians and scaling values and how any settings were chosen.",
      "Place the baseline and network scores in adjacent columns so readers can compare errors in points alongside the fraction of variation explained.",
      "Report the five-seed range of about six point zero five to six point one seven with the split held fixed.",
      "Close by explaining whether a gain just under one satisfaction point is worth the loss of a simple coefficient for your research question."
    ]},
    { id: "s19", kind: "fix", heading: "Find the source of a misleading error message", wait: true, lines: [
      "Read the last line of this course version’s error message and trace the pair of layer sizes back to the line that supplied them.",
      "Choose the responsible line and a repair that tells Python explicitly what those two numbers are meant to specify."
    ]},
    { id: "s48", kind: "code_walk", heading: "Read the hospital script in five passes", lines: [
      "Trace one hospital record through the code by asking what information each operation is allowed to use.",
      "The split reserves a quarter of the episodes before either model calculates a median or learns anything about satisfaction.",
      "The baseline fills missing inputs with training medians and fits ordinary linear regression to the resulting rows.",
      "The network adds a scaling step and names its two hidden layer sizes explicitly when constructing the regressor.",
      "Taking the square root of the mean squared error puts the evaluation back on the same scale as the patient's survey.",
      "Repeat the same fit for each prespecified seed and keep every score so the reported range represents the entire set of runs."
    ]},
    { id: "s20", kind: "sentences", heading: "Would you sign these four sentences?", split: 1, lines: [
      "Read each draft sentence as an examiner and decide whether the evidence presented here supports it as written.",
      "Ranking waiting time first would require a separate importance analysis because no individual weight gives its overall contribution.",
      "Replace the word better with the measured reduction of about zero point nine five points and the outcome spread of about sixteen.",
      "Naming the two hidden layers and their sizes gives the next researcher a design they can actually reproduce.",
      "A score rounded to zero point eight five needs the evaluation sample and fitting conditions beside it to be interpretable."
    ]},
    { id: "s21", kind: "helper", heading: "What belongs in the researcher's hands?", lines: [
      "Imagine using an assistant while writing up the Al Waha comparison and deciding which questions are yours to settle.",
      "Asking what a limit on training passes means can help you interpret a warning that fitting ended before convergence.",
      "Asking for another setting each time the test score disappoints would make that final score part of the selection process.",
      "You know what the hospital needs from this prediction, so the decision about the value of the extra accuracy stays with you."
    ]},
    { id: "s22", kind: "quiz", heading: "Check your understanding", wait: true, lines: [
      "Work through the fourteen questions and use each explanation to check the reasoning behind your answer before moving on."
    ]},
    { id: "s23", kind: "takeaways", heading: "What will you take into the next study?", lines: [
      "Picture opening a fresh hospital dataset and deciding whether a neural network deserves a place beside your simpler benchmark.",
      "Start inside one unit, where a weighted sum and a bias reach a gate that lets the prediction bend.",
      "Count the connections and biases to describe what is learned, and record separately the settings you chose before fitting.",
      "Trace one group of visits forward to a prediction and backward to the slopes that guide the next update.",
      "Measure errors as real minus predicted and take the root after averaging their squares to express the result in points.",
      "Keep preprocessing and selection inside development, with fresh validation visits to check the penalty or decide when to stop.",
      "Give the baseline, the outcome spread and the variation across seeds so readers can judge the size of any improvement.",
      "When someone asks what a prediction means for policy, distinguish the model behaviour you measured from the patient outcome you would need to study."
    ]}
  ],
  quiz: [
    { q: "What does one neuron in this network compute?",
      o: ["A random guess that improves over time","Weighted inputs, added up with a bias, then passed through one simple rule","The average of its inputs","A p value for each input"], a: 1,
      why: "Multiply each input by a weight, add the bias, apply the activation rule (here: negatives become zero). That is all one neuron does." },
    { q: "A neuron has w1 = 0.5, w2 = −0.2, b = 1, and the rule “negatives become zero”. Inputs: x1 = 10, x2 = 30. What does it output?",
      o: ["0","1","−1","9"], a: 0,
      why: "0.5 × 10 − 0.2 × 30 + 1 = 5 − 6 + 1 = 0, and the rule passes 0 on. (Episode B, with 20 and 10, gives 9.)" },
    { q: "Why does a network need a nonlinear activation rule at all?",
      o: ["To make training faster","Without it, any number of layers collapses into one linear function of the inputs","To remove outliers","To standardise the inputs"], a: 1,
      why: "A weighted sum of weighted sums is still a weighted sum. The activation rule turns each neuron into a hinge or smooth curve that can bend." },
    { q: "Real scores 70, 75, 80, 85; predictions 72, 74, 83, 79. What is the RMSE?",
      o: ["3.0 points","3.54 points","12.5 points","6 points"], a: 1,
      why: "Errors (real − predicted) −2, 1, −3, 6. Squares 4, 1, 9, 36. Mean 12.5. Square root 3.54. The error of 6 contributes 36 of the 50." },
    { q: "On the slides, the scaler is removed from the network's pipeline. What happens?",
      o: ["The script crashes","Nothing changes","RMSE rises quietly from 6.12 to 6.91, still better than the linear model","RMSE improves"], a: 2,
      why: "In the recorded comparison the unscaled network still beat linear regression. Without the scaled run, the cost of omitting this step would be easy to miss." },
    { q: "A network with 67,841 parameters is trained on 60 episodes. Its training error is 5 points; on new episodes it is above 12. What is happening?",
      o: ["The model is improving","Overfitting: it fits the training rows much better than new rows","The seed is wrong","The scaler leaked"], a: 1,
      why: "Far more parameters than rows. The training error flatters the model; judge it on rows it has never seen." },
    { q: "Five seeds give RMSE 6.14, 6.17, 6.05, 6.12 and 6.11. What do you report?",
      o: ["6.05, the best run","The mean (6.12) and the spread (0.12) across the five seeds","6.17, to be cautious","Only the first run"], a: 1,
      why: "The runs vary by about 0.12 points on this split, far less than the 0.95-point gain. Report the spread, never one lucky run." },
    { q: "Which sentence may you write in your thesis?",
      o: ["“The network is much better.”","“The network learned that waiting matters most.”","“On 1,300 held-out episodes, the network’s RMSE was 6.12 (five seeds: 6.05–6.17) against 7.07 for the linear model, 0.95 points better on an outcome with a standard deviation of 16.”","“Deep learning outperformed regression.”"], a: 2,
      why: "This sentence identifies the held-out sample, the benchmark, the size and units of the improvement, and the sensitivity to random starts." },
    { q: "In the Al Waha network with 6 inputs, hidden layers of 32 and 16 neurons, and 1 output neuron, what are the 769 learned numbers called, and how are they split?",
      o: ["769 hyperparameters: 720 weights and 49 learning rates","769 parameters: 720 weights (192 + 512 + 16) and 49 biases (32 + 16 + 1), while choices like layer sizes and alpha are hyperparameters","769 weights and 0 biases, because StandardScaler removes all biases","769 regression slopes, each with its own p-value"], a: 1,
      why: "Parameters (720 weights + 49 biases = 769) are learned from the training rows during fit(). Hyperparameters (such as hidden_layer_sizes and alpha) are chosen before training." },
    { q: "On the 1,300 held-out Al Waha episodes, the network's MAE is 4.91 points and its RMSE is 6.12 points. Why is RMSE larger than MAE?",
      o: ["Because RMSE is the simple average error, whereas MAE ignores negative errors","Because RMSE squares each error (real − predicted) before averaging and taking the square root, giving extra weight to the largest misses","Because MAE is measured in standardised units while RMSE is in satisfaction points","Because the output neuron uses a sigmoid activation function"], a: 1,
      why: "RMSE is NOT the average error: MAE is the mean absolute error (4.91), while squaring makes RMSE (6.12) sensitive to larger errors so RMSE is always at least as large as MAE." },
    { q: "With 3,900 Al Waha training episodes and a mini-batch size of 200, what happens during one epoch of training?",
      o: ["It uses 19 batches of 200 and a final batch of 100, updating the weights 20 times.","The network solves a single matrix equation in closed form without using a learning rate","The network tests 200 random seeds on the 1,300 held-out test episodes","The network updates only the output bias and freezes all 720 weights"], a: 0,
      why: "Each visit contributes once in a pass. Each batch supplies one gradient to the optimiser." },
    { q: "You want to use early stopping and choose an L2 regularisation penalty (alpha) to prevent overfitting. Which rows may you use to decide when to stop and which alpha to keep?",
      o: ["The 1,300 held-out test episodes, by picking the epoch and alpha with the lowest test RMSE","A validation set carved from the 3,900 training rows (or cross-validation folds within the training set)—never the final held-out test set","The training error alone, stopping only when training RMSE reaches zero","All 5,200 episodes combined before splitting"], a: 1,
      why: "Never choose a stopping point or hyperparameter on the test set. Use an internal validation split or cross-validation on the training rows, keeping the 1,300 test episodes untouched until the final evaluation." },
    { q: "A researcher standardises all 5,200 Al Waha episodes with StandardScaler, then runs 5-fold cross-validation on the scaled table. What is wrong with this workflow?",
      o: ["Nothing; scaling before splitting saves computation time and gives the exact same result","Data leakage: each validation fold's mean and standard deviation leaked into the scaler before splitting; the scaler must be inside a pipeline fitted only on the training folds","StandardScaler cannot be used with cross-validation in scikit-learn","Neural networks only require scaling on the test fold, not the training folds"], a: 1,
      why: "Pre-split scaling leaks information from the held-out fold into training (on the 75/25 Al Waha split, pre-split preprocessing nudges held-out RMSE from 6.128 to 6.117). Putting SimpleImputer, StandardScaler, and MLPRegressor inside make_pipeline() ensures each fold fits its scaler on the training folds only." },
    { q: "On the Al Waha network, shuffling occupancy raises held-out RMSE by 4.82 points, and partial dependence falls from 77.7 at 80% occupancy to 56.1 at 100%. What can you conclude?",
      o: ["Shuffling occupancy increases held-out RMSE and the partial dependence curve drops steeply above 85%, proving that lowering occupancy will cause patient satisfaction to rise","Permutation importance gives the exact regression coefficient and p-value for bed occupancy","The fitted network uses occupancy on these rows and predicts lower scores over that part of the grid. A policy effect needs separate evidence.","Partial dependence plots are unaffected by correlation between occupancy and waiting time"], a: 2,
      why: "Permutation importance (+4.823 ± 0.131 RMSE when occupancy is shuffled) and partial dependence (78.8 at 50% and 77.7 at 80% down to 56.1 at 100%) describe what the fitted model responds to, not real-world causation, and correlated predictors can create unrealistic synthetic episodes when shuffled or swept." }
  ]
};
