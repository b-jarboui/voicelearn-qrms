// One sentence per animation beat. Stable IDs identify MP3 units.
window.CHAPTER = {
  course: "PHQM830 Quantitative Research Methods and Statistics",
  title: "Turning written reviews into variables",
  subtitle: "Text analytics with Al Waha hospital reviews",
  scenes: [
    { id: "s01", kind: "title", heading: "What can a review tell us?", lines: [
      "At Al Waha, a file of five thousand two hundred visits contains remarks as different as praise for a team and a description of feeling ignored.",
      "Using a computer to work with human language is called natural language processing, and our question is what survives when words become numbers."
    ]},
    { id: "s32", kind: "corpus", heading: "A collection, a review, a piece", lines: [
      "Start with the stack of written comments attached to visits at Al Waha.",
      "The whole collection chosen for analysis is called a corpus.",
      "Lift out one visit and read its entire comment as a single item, called a document.",
      "The first sentence in this document praises the staff.",
      "The second sentence belongs to the same visit even though it starts after a full stop.",
      "If we cut the first sentence at word boundaries, each piece we keep is called a token.",
      "Here the staff remark supplies four word tokens while the document still supplies just one visit to our analysis."
    ]},
    { id: "s16", kind: "readthirty", heading: "Listen for repetition", lines: [
      "Read a sample of thirty Al Waha comments and look for a phrase that returns in a different visit.",
      "The repeated colours trace the same sentence across several reviews, sometimes alongside quite different remarks.",
      "Across the entire file only thirty distinct sentences make up five hundred and eighty distinct review texts.",
      "Recognising a familiar template may be easier for a model than reading the language of a new hospital."
    ]},
    { id: "s33", kind: "clean", heading: "Make spelling comparable without losing evidence", lines: [
      "Suppose a second copy of the staff sentence arrives in capital letters with extra spaces.",
      "We can keep the original wording on one side and tidy a working copy on the other.",
      "Trimming repeated spaces leaves a single gap where the writer paused between words.",
      "Converting to lower case allows STAFF and staff to count toward the same column.",
      "Keeping a sentence boundary tells us where the praise ends before the next remark begins.",
      "Writing different surface forms in one consistent way is called normalisation.",
      "Use the untouched original to check whether a choice erased a clue such as emphatic capitals or a meaningful pause."
    ]},
    { id: "s34", kind: "stoplab", heading: "Try removing a word that changes the reading", wait: true, lines: [
      "Read the reassurance about having nothing to complain about before removing anything.",
      "A stop-word list is a set of words a researcher elects to leave out of a counting task.",
      "This list drops nothing along with to and about, leaving complain as the only trace of the sentence.",
      "Protect nothing and the two surviving words give you a better chance of spotting the reassurance.",
      "Try a short invented response and check which of your words this particular list discards.",
      "Use the comparison to decide which words your question needs you to preserve."
    ]},
    { id: "s38", kind: "pos", heading: "What job is the word doing?", lines: [
      "The review about waiting time describes a delay that lasted too long.",
      "Consider two short rewrites of that idea, the wait was long and we wait for news.",
      "In the first rewrite a speaker can put the before wait because it names an experience.",
      "In the second rewrite wait describes something the speakers do.",
      "Assigning noun or verb according to that job is called part-of-speech tagging.",
      "This grammatical distinction helps a system interpret the same spelling in its surrounding sentence.",
      "In other cases a change of sense goes further, as when discharge refers to leaving hospital or to a fluid."
    ]},
    { id: "s35", kind: "lemma", heading: "Look up the form a dictionary would use", lines: [
      "Suppose we want a single column for people who waited and people who are waiting.",
      "An ending rule can handle both of these regular verb forms by removing letters.",
      "The same shortcut offers little help with were, which shares no obvious ending with be.",
      "A language-aware lookup can use the verb's role to return its dictionary form, called a lemma.",
      "In the sentence about attentive midwives the plural noun similarly leads back to midwife.",
      "This process is called lemmatisation and its choices depend on the language and the grammatical information available.",
      "Keep the original wording nearby so a reader can recover distinctions such as tense when they matter to the question."
    ]},
    { id: "s22", kind: "stem", heading: "Trim endings with a rule", lines: [
      "A quick way to pool related spellings is to trim endings using a rule called a stemmer.",
      "The file contains three hundred and nineteen uses of waited and three hundred and ninety-one of waiting.",
      "A rule that strips both endings lets those occurrences contribute to a common stem called wait.",
      "An aggressive rule that also combines complaint with complain could mix two very different Al Waha expressions."
    ]},
    { id: "s39", kind: "entities", heading: "Mark the spans worth extracting", lines: [
      "Trace the words emergency department in the Al Waha sentence about pressure.",
      "Together they identify a service even though a count of separate words would put them in two columns.",
      "In another comment midwives names a staff role, while over an hour in the waiting review describes a duration.",
      "A system can mark the start, end and category of a meaningful span using named-entity recognition.",
      "A hospital-specific set of categories can include departments and roles that a general name finder might miss.",
      "Distinguish an approximate duration from a clock time before converting either into a variable.",
      "Inspect missed spans as well as correct ones, especially when the next step is to share an excerpt."
    ]},
    { id: "s40", kind: "masklab", heading: "Prepare a review for sharing", wait: true, lines: [
      "Imagine a training example in which a fictional patient name appears beside a department and an exact time.",
      "Replace the name with a role marker in the working excerpt before anyone outside the authorised team sees it.",
      "Even with the name gone, a rare shift and a precise time may let someone reconstruct the visit.",
      "Generalising the time preserves the fact that a wait occurred while reducing that particular clue.",
      "Keep only the detail needed for the approved question and restrict access to the source and any linkage key.",
      "Inspect the candidate release yourself because automatic name detection can miss unusual spellings.",
      "Try the two edits and decide whether the remaining details suit the audience and the purpose."
    ]},
    { id: "s36", kind: "bag", heading: "Count two excerpts into the same columns", lines: [
      "Take just the staff sentence from one Al Waha review and the midwives sentence from another.",
      "Choose staff, outstanding and attentive as the small vocabulary for this demonstration.",
      "The first excerpt puts one count under staff and one under outstanding.",
      "The second puts a single count under attentive and zeros under the two other headings.",
      "A zero means that chosen word is absent from this excerpt even though the writer supplied a complete sentence.",
      "This representation is called a bag of words because shuffling the words inside an excerpt leaves all its counts unchanged.",
      "A model given only this table cannot recover who was described as attentive."
    ]},
    { id: "s37", kind: "gramlab", heading: "Slide a window along a sentence", wait: true, lines: [
      "Listen to the phrase nothing to complain about and imagine a frame wide enough to hold two words.",
      "Moving it one place at a time gives us nothing to, to complain, and complain about.",
      "A sequence of two adjacent tokens is a bigram and the general term for a sequence of a chosen length is an n-gram.",
      "Widen the frame to three words to carry nothing along with complain in a single feature.",
      "Longer phrases preserve more local order, but each exact phrase may occur in fewer training reviews.",
      "Try each width and inspect which part of the reassurance any single column can now express."
    ]},
    { id: "s03", kind: "tokens", heading: "Follow one review into a row", lines: [
      "This exact review about outstanding staff and having nothing to complain about occurs ninety-nine times in the file.",
      "Watch the eight pieces arrive in reading order as the letters change to lower case.",
      "The chosen list of common words removes five pieces, including the word that reversed the sense of complain.",
      "Pairing neighbours in the shortened stream now puts outstanding beside complain, even across the original sentence break.",
      "The surviving words and pairs give this review five nonzero columns, with their weights shown in the bars."
    ]},
    { id: "s21", kind: "dtm", heading: "Why a large word table is mostly zero", lines: [
      "Stack the review rows and give every retained term its own column to form a document-term matrix.",
      "The descriptive matrix for the entire Al Waha file has five thousand two hundred rows and two hundred and ninety-six columns.",
      "Only four point four percent of its cells have a nonzero entry because each short review uses so few of the available terms.",
      "We call that pattern sparse and can save space by recording just the positions and values of the nonzero entries."
    ]},
    { id: "s05", kind: "tfidf", heading: "A word used here and elsewhere", lines: [
      "Imagine comparing two words that each occur once in a short Al Waha review.",
      "Counting one occurrence in ten words gives each word the same local share, called its term frequency.",
      "Now count the reviews containing each word, giving a review just one vote however often it repeats the word.",
      "Hospital appears in nearly thirteen hundred reviews while disappointing appears in three hundred and fifty-three.",
      "Multiplying the local share by a measure of rarity across documents gives the weight called term frequency times inverse document frequency."
    ]},
    { id: "s06", kind: "formula", heading: "Two words with the same local count", lines: [
      "In this worked example, three mentions in a sixty-word review give disappointing a local share of one twentieth.",
      "Finding it in one tenth of the imaginary collection gives a rarity weight of about two point three on the natural log scale.",
      "Multiplying those two numbers gives a weight of roughly zero point one one five.",
      "Hospital occurs in nine tenths of this collection and gets a much smaller rarity weight.",
      "With equal counts inside this review, disappointing gets about twenty-two times the weight of hospital under this particular rule."
    ]},
    { id: "s07", kind: "weigh", heading: "Weigh a word from Al Waha", wait: true, lines: [
      "Choose a word to see its actual document count alongside the count for hospital.",
      "Keep the word fixed and double the length of the imagined review to see what happens to both weights."
    ]},
    { id: "s02", kind: "recap", heading: "Three decisions before measuring", lines: [
      "Keep some visits aside so you can see how well a rule works on reviews it has never seen.",
      "Decide what one unit means before you count, because a minute of waiting and a mention of waiting answer different questions.",
      "A program can count perfectly even when its count tells you very little about someone's experience.",
      "Imagine putting the words “poor communication” beside the recorded wait for the very same visit."
    ]},
    { id: "s12", kind: "pipeline", heading: "Learn the columns on training reviews", lines: [
      "Set aside thirteen hundred episodes and use the other three thousand nine hundred to learn the model.",
      "The tool that turns words into columns is a vectoriser, and fitting it to the training reviews learns two hundred and ninety terms.",
      "Apply those same columns and training weights to the test reviews, ignoring terms outside the learned vocabulary.",
      "Letting every review help build the vocabulary gives information from the test set a route into the model.",
      "During model selection repeat the fitting inside each training fold, then freeze the whole procedure before the final test."
    ]},
    { id: "s13", kind: "fix", heading: "Repair a vectoriser that cannot run", wait: true, lines: [
      "The error says the vectoriser was asked to use a vocabulary before it had learned one.",
      "Follow the line number to the first use of the training reviews and choose a repair that keeps the test reviews separate."
    ]},
    { id: "s14", kind: "results", heading: "Does text add to the satisfaction model?", lines: [
      "On the same thirteen hundred held-out visits, the text model reduces squared prediction error by about seventy-four percent relative to using the test mean.",
      "This measure of error reduction is called R squared, and the six operational measures on their own reach about zero point eight one.",
      "Using both sets of columns raises the reported R squared to about zero point eight seven on these visits.",
      "Learning the text vocabulary before the split yields the same rounded text-only score despite giving the procedure access to test reviews.",
      "The vocabulary grows from two hundred and ninety to two hundred and ninety-six terms when the test reviews are included."
    ]},
    { id: "s04", kind: "choices", heading: "Try four preparation choices", wait: true, lines: [
      "These switches replay sixteen recorded analyses of the same reviews with different rules for building columns.",
      "Change one switch at a time and watch which words have the largest positive multipliers in the satisfaction model.",
      "Treat the spread of test scores as a description of this completed comparison and make future choices within training data."
    ]},
    { id: "s08", kind: "complain", heading: "Read the sentence behind a coefficient", lines: [
      "In the fitted satisfaction model, complain has the largest positive coefficient, the multiplier attached to its feature.",
      "Grouping reviews that contain either complain or complaint gives almost the same average satisfaction as grouping those containing neither.",
      "Read the first phrase and you can hear why its users averaged eighty-five point eight.",
      "The group that said it would make a complaint averaged fifty-two point five and supplied a different final word.",
      "Removing nothing leaves complain to carry an association that only makes sense when you read the original phrase."
    ]},
    { id: "s41", kind: "lex", heading: "Score a review one marked word at a time", lines: [
      "Read the staff review as a patient would, keeping both the praise and the reassurance in view.",
      "One mechanical way of estimating its tone is to keep a list of words associated with positive or negative feeling.",
      "That list is called a sentiment lexicon and here we can follow each match in reading order.",
      "Outstanding contributes one positive mark to this simple tally.",
      "Complain contributes a negative mark even though the writer has just said there was nothing to complain about.",
      "The two marks cancel and the list assigns the middle label to a review a reader could reasonably call positive.",
      "A middle score can therefore mean opposing word matches, silence from the dictionary, or genuine mixed feeling."
    ]},
    { id: "s42", kind: "scope", heading: "Where a sentiment rule breaks", lines: [
      "Read the Al Waha phrase acceptable, but not exceptional with the word not still in place.",
      "A simple rule can reverse the score of the evaluative word inside the reach of a negation.",
      "In the invented phrase not bad, reversing bad makes the reading more favourable.",
      "A longer sentence can put a new clause outside that reach, so reversing every later word creates a different error.",
      "Now read great, another delay aloud as someone who has just missed an appointment.",
      "The positive word can express sarcasm, which a dictionary lacks the situation to resolve.",
      "Even a negative test result can be welcome news, so check ambiguous language against readings from this setting."
    ]},
    { id: "s09", kind: "codebook", heading: "What counts as a negative experience?", lines: [
      "Two readers can disagree about a review before either reader makes a mistake.",
      "Consider the Al Waha review that combines being ignored with praise for a surgical explanation.",
      "A rule about the tone of the whole visit might give a different answer from a rule about whether any criticism appears.",
      "Write the unit, labels and boundary cases in a coding guide that both readers can use.",
      "Checking whether the labels capture the idea you intended is a question of validity.",
      "Having readers apply the same guide independently lets you examine reliability before they discuss difficult cases."
    ]},
    { id: "s10", kind: "readit", heading: "Read six reviews before seeing the scores", split: 2, lines: [
      "Read these six complete Al Waha reviews and judge the tone of each visit as a whole.",
      "Choose positive, mixed or negative for each one before revealing what the word list counted.",
      "Compare your labels with the green and red words that contributed to the automated score.",
      "Look at how improve adds praise to a review whose writer is asking for something to change.",
      "Across the file the word list matched the reference labels derived from readings of the recurring sentences on about seven reviews in ten."
    ]},
    { id: "s48", kind: "kappalab", heading: "How much agreement exceeds chance?", wait: true, lines: [
      "Imagine two independent readers each marking ten of twenty practice excerpts as concerns.",
      "If they assigned labels independently at those rates, they would match on about half the excerpts by chance.",
      "Suppose they actually agree on sixteen of the twenty excerpts under the same coding guide.",
      "Of the ten matches available beyond the chance expectation, they achieved six.",
      "Cohen's kappa expresses that fraction, giving zero point six in this balanced teaching example.",
      "Change the number of disagreements and watch observed agreement move while the two readers' label totals stay fixed.",
      "Use the same comparison for a frozen model and an independent human reference, alongside class counts and examples of disputed cases."
    ]},
    { id: "s43", kind: "lda", heading: "Allow one review to mix two subjects", lines: [
      "Read the Al Waha review that praises the staff and also asks why a delay lasted so long.",
      "Imagine two bowls of words, one favouring staff and thanks and the other favouring delays and waiting.",
      "A single review could draw several words from one bowl and just one or two from the other.",
      "Each bowl represents a distribution of likely words and each review has its own mixture of the bowls.",
      "A topic model called latent Dirichlet allocation, or L D A, tries to infer these hidden mixtures from observed counts.",
      "A word such as time may receive support from more than one topic depending on the other words around it in the document.",
      "The coloured allocations illustrate the idea and do not claim that this model was fitted to Al Waha."
    ]},
    { id: "s24", kind: "topics", heading: "Find recurring combinations of words", lines: [
      "If two words keep appearing in the same comments they may point to a subject that nobody labelled in advance.",
      "Here a method called nonnegative matrix factorisation approximates the word table using four additive patterns.",
      "Reading the words together suggests kindness, pressure in emergency care, excellent care and appointment timing.",
      "A name for a pattern is a researcher's interpretation that should make sense in the reviews contributing to it."
    ]},
    { id: "s25", kind: "explore", heading: "Explore the four fitted topics", wait: true, lines: [
      "Open each group to read a real review beside the words that helped characterise it.",
      "Compare the timing example with the complaint rate of its group to see how much tone can vary within a subject."
    ]},
    { id: "s44", kind: "topiclab", heading: "How many subjects are worth separating?", wait: true, lines: [
      "Picture reading reviews where thanks for kindness appears alongside praise for excellent care.",
      "A coarse grouping could put both forms of praise under one heading that is easy to describe.",
      "A finer grouping might separate how staff spoke from what patients said about treatment.",
      "Too many groups can turn small variations of one repeated sentence into apparently different findings.",
      "Compare candidate settings on development reviews for readable word lists, representative passages and stability across repeated fits.",
      "Open the alternative groupings and choose the level of detail that would answer a stated research question."
    ]},
    { id: "s45", kind: "points", heading: "Give words an address", wait: true, lines: [
      "Imagine two patients describing a discourteous exchange, one using rude and the other using impolite.",
      "A bag of words creates separate columns for those spellings and gives it no built-in reason to connect them.",
      "Across many sentences the two words can occur in similar surroundings, such as descriptions of how staff spoke.",
      "A model can learn a list of coordinates for each word from those recurring contexts.",
      "That list is a word embedding, drawn here as a point on a deliberately simplified map.",
      "Switch views to see how nearby points could help with wording absent from the small hospital vocabulary.",
      "Antonyms can also share surroundings, so closeness alone is a poor test of whether two patients felt the same way."
    ]},
    { id: "s46", kind: "analogy", heading: "A direction can carry a relationship", lines: [
      "On this illustrative word map, take the step from man to king.",
      "Start at woman and carry the same direction and distance across the map.",
      "The endpoint lands near queen in the familiar illustration called king minus man plus woman.",
      "The arithmetic operates on lists of coordinates and the nearest learned word need only be an approximate match.",
      "In hospital language, test whether a useful relationship holds across many examples before using it to group comments.",
      "Word vectors can also reproduce social stereotypes present in the texts they learned from."
    ]},
    { id: "s28", kind: "subword", heading: "Read an unfamiliar word in pieces", lines: [
      "A language model can read the reassurance about having nothing to complain about using pieces shorter than whole words.",
      "This particular vocabulary contains about thirty thousand pieces including the complete word complain.",
      "Midwives becomes two pieces and attentive becomes three in the tokenizer used here.",
      "Even unprofessionalism can be assembled from known pieces, though recognising its spelling does not establish its meaning."
    ]},
    { id: "s29", kind: "attention", heading: "How surrounding words change a representation", lines: [
      "A transformer builds a representation of each piece using information from other positions in the sentence.",
      "The mechanism called attention mixes that information using weights that depend on the pieces being compared.",
      "In the displayed layer of this encoder, complain gives some weight to nothing as well as to itself and to.",
      "Successive layers can use those connections to change the representation without guaranteeing a correct reading of negation.",
      "The same broad architecture also appears in models trained to generate text, including the family abbreviated as GPT."
    ]},
    { id: "s26", kind: "embed", heading: "Does a sentence map recognise reassurance?", lines: [
      "We can combine contextual word representations into one list of numbers for a whole sentence.",
      "Compare the directions of the lists for three Al Waha sentences using a measure called cosine similarity.",
      "This encoder puts the reassurance closer to the intention to complain than to the expression of being impressed.",
      "The fitted word-count representation gives zero similarity for each distinct pair under its retained vocabulary and weighting.",
      "Check examples that distinguish subject from tone before choosing the task for which these distances will be used."
    ]},
    { id: "s31", kind: "bertprocess", heading: "Build topics from review neighbours", lines: [
      "Follow these eight review excerpts through an illustrated method for finding subjects called BERTopic.",
      "First the encoder gives each review an address made of three hundred and eighty-four numbers.",
      "A method called UMAP reduces the number of coordinates while trying to preserve local neighbourhoods.",
      "A clustering method called HDBSCAN looks for persistent dense groups and can leave isolated reviews unassigned.",
      "Pooling the text within each group lets a group-level version of term weighting bring its characteristic words to the surface.",
      "Read several reviews from a group before deciding whether one name fairly describes the experience they share."
    ]},
    { id: "s30", kind: "bertopic", heading: "What happens to ungrouped reviews?", lines: [
      "On this map a dot represents a review from the displayed sample of the Al Waha fit.",
      "At a minimum group size of sixty the full fit returns twenty-three topics.",
      "One group centred on feeling ignored has a complaint rate of about forty-seven percent while a kindness group has about two percent.",
      "More than half the reviews remain unassigned at this setting and increasing the minimum to one hundred and fifty leaves no topics.",
      "Include unassigned reviews in the account of coverage when describing the subjects people raised."
    ]},
    { id: "s47", kind: "zerolab", heading: "Code a review without labelled examples", wait: true, lines: [
      "Suppose the hospital wants to flag reviews that describe being left without an update.",
      "Write a category definition and read the comment about waiting well over an hour with no update.",
      "A large language model has learned patterns from text and can propose a label from instructions like these.",
      "Giving it a new task without supplying labelled demonstrations is called zero-shot classification.",
      "Require a choice among the allowed labels and allow insufficient evidence when the review does not decide the question.",
      "Compare two example coding instructions to see how a broader definition changes the defensible label.",
      "These are worked responses to inspect locally, so no review needs to leave the page."
    ]},
    { id: "s18", kind: "audit", heading: "Audit a machine-coded review", lines: [
      "Imagine that a language model assigns a communication code to the Al Waha sentence about waiting without an update.",
      "Ask for the shortest passage supporting that code so a reviewer can inspect the evidence.",
      "A response claiming a nurse promised an update adds a detail the patient never supplied.",
      "A fluent invention of this kind is called a hallucination and should be recorded as an error.",
      "Compare errors across approved language groups to see whether some expressions of concern are systematically missed.",
      "Save the model version and instructions with the audit so a different researcher can see how each judgement was made."
    ]},
    { id: "s11", kind: "coverage", heading: "Whose experience reaches the table?", lines: [
      "Start with the visits you want a conclusion about and count how many have usable text.",
      "Look for a department, language or shift that contributes fewer reviews than its share of visits.",
      "A table of comments can describe what its writers said even when you have no words from the people who stayed silent.",
      "Set a time for making the prediction so you can tell which comments would actually be available.",
      "A model built after discharge answers a different question from one that must give an alert at arrival."
    ]},
    { id: "s23", kind: "distinct", heading: "Compare words across complaint groups", lines: [
      "Separate the reviews by whether the visit led to a formal complaint and count each term once per review.",
      "Long occurs in forty-nine percent of complaint reviews and eight percent of the others.",
      "Thank and kindness appear more often in reviews of visits without a filed complaint.",
      "These contrasts suggest reading the passages about delays to see whether lack of information is part of the experience."
    ]},
    { id: "s49", kind: "joinlab", heading: "Add text to the same visit", wait: true, lines: [
      "Imagine a model for flagging complaints after a review arrives but before the filing decision is known.",
      "The operational row for this invented visit already contains a recorded wait and staffing measure.",
      "A matching episode key brings the text columns for that very visit onto the same row.",
      "For this teaching model, changing a flag for a delay phrase moves the predicted probability even when the measured wait stays fixed.",
      "Move the switch to compare the two outputs and notice that a prediction describes an association.",
      "A ranking score called the area under the curve asks how often a filed visit scores above a nonfiling visit, counting ties as half.",
      "Al Waha's operational measures score about zero point eight nine on this scale and text alone scores about zero point eight four.",
      "To test the value of text at Al Waha, give numeric-only and combined models identical eligible rows, splits and assessment rules.",
      "Choose settings and a decision threshold within training data and evaluate the frozen models on the same held-out reviews."
    ]},
    { id: "s15", kind: "leak", heading: "Audit the words available at prediction time", wait: true, lines: [
      "A phrase can give away a future outcome, a problem called leakage, if the alert must come before a patient declares an intention to file.",
      "Flag words from the sentence declaring that intention and compare the stored ranking scores before and after the removal."
    ]},
    { id: "s50", kind: "matrixlab", heading: "Count four kinds of decision", wait: true, lines: [
      "Imagine twenty held-out reviews with known filing outcomes and a fixed rule for flagging a complaint.",
      "Place each review in a row according to what happened and a column according to what the rule predicted.",
      "Three filed complaints were flagged correctly, while two more were missed.",
      "Among visits without a complaint there is one false alert and fourteen correct quiet decisions.",
      "This table of predictions against known outcomes is called a confusion matrix.",
      "Seventeen correct decisions give eighty-five percent accuracy on a set where a quarter of the visits had a complaint.",
      "Always predicting no complaint would already reach seventy-five percent accuracy here.",
      "Select a cell to read what its count would mean to a team following up on alerts."
    ]},
    { id: "s51", kind: "metrics", heading: "Ask two questions about each class", wait: true, lines: [
      "Start with the four alerts in the worked table and ask how many actually led to a filed complaint.",
      "Three of four did, so precision for the complaint class is seventy-five percent.",
      "Now start with the five actual complaints and ask what fraction the alert captured.",
      "Finding three of the five gives sixty percent recall for the complaint class.",
      "Switch the target to no complaint and trace the quiet decisions and the visits without a filing.",
      "For that class precision is fourteen out of sixteen and recall is fourteen out of fifteen.",
      "Report both classes with their counts so strong performance on common visits cannot conceal missed complaints."
    ]},
    { id: "s17", kind: "sentences", heading: "Which claims would survive review?", split: 1, lines: [
      "Judge each proposed sentence as you would if you were reviewing a thesis about Al Waha.",
      "A large coefficient for complain tells you about a particular fitted model and its preparation choices.",
      "Calling hospital a frequent word requires a count, while calling it a theme requires an interpretation of the passages.",
      "A claim about dissatisfaction needs a defined measure and evidence that its labels work for these patients.",
      "Agreement between two measures from one visit gives weaker evidence than agreement with a genuinely independent source."
    ]},
    { id: "s27", kind: "workflow", heading: "Reconstruct the analysis", lines: [
      "Begin with a question that can be answered using language available at the intended decision time.",
      "Read a development sample and write down the preparation choices it suggests.",
      "Keep the final test separate while you learn features and choose settings using training and validation reviews.",
      "Inspect missed cases alongside successful ones to find wording that the model handles poorly.",
      "Report what the text adds and the limits that repeated templates place on transferring the result."
    ]},
    { id: "s52", kind: "thesis", heading: "Write a result someone can check", lines: [
      "Start the methods paragraph with the eligible visits, the source of each review and the unit you treated as a document.",
      "Describe the language, redactions, feature rules and the point at which you froze the learned vocabulary.",
      "In the results paragraph put the numeric baseline beside the model that adds review text on the same held-out episodes.",
      "For a complaint alert give the filing rate, class-specific errors and uncertainty alongside any overall score.",
      "Show a de-identified passage that helps a reader understand a mistake such as losing nothing before complain.",
      "Close by explaining why repeated templates and patients without a voice in the sample limit the conclusions you can draw."
    ]},
    { id: "s19", kind: "quiz", heading: "Check your understanding", wait: true, lines: [
      "Use these fourteen questions to decide which claims the evidence from a review can support."
    ]},
    { id: "s20", kind: "takeaways", heading: "From a patient's words to a defensible finding", lines: [
      "Think back to the writer who praised the staff and had nothing to complain about.",
      "Someone reading your methods should be able to trace a single word from that sentence into its column.",
      "A weight reflects both how often the term occurs here and how widely it appears elsewhere under the chosen rule.",
      "Read the complete sentence again before giving a coefficient or a group of words a name.",
      "Keep unseen reviews separate until every feature rule and decision threshold is fixed.",
      "A defensible report lets another reader see whose words entered the analysis and where the interpretation could fail."
    ]}
  ],
  quiz: [
    {"q":"One whole review is counted for each visit. What is a document here?","o":["All reviews together","One visit’s complete review","A word occurrence","A vocabulary column"],"a":1,"why":"One row represents one review, which can contain several sentences and many tokens."},
    {"q":"Which choice best preserves the reassurance in “Nothing to complain about”?","o":["Drop all common words","Count complaint-related stems alone","Keep nothing and consider phrase features","Discard short reviews"],"a":2,"why":"Nothing changes the sense of complain. An ordered phrase can retain that relationship."},
    {"q":"Why map were to be when processing a review?","o":["To recover the dictionary form of a verb","To locate a named entity","To count neighbouring words","To decide the tone"],"a":0,"why":"Lemmatisation can recover an irregular base form using grammatical information."},
    {"q":"At equal counts in one review, which term gets more weight under unsmoothed TF-IDF?","o":["The longer word","The term appearing in more documents","Both always get equal weight","The term appearing in fewer documents"],"a":3,"why":"A lower document frequency gives the term a higher inverse document frequency."},
    {"q":"Where should vocabulary and rarity weights be learned during model selection?","o":["On every review before splitting","Inside each training fold","On validation and test rows together","On the final test reviews"],"a":1,"why":"A held-out fold must use a vocabulary learned without its reviews. Refit the chosen procedure on the training data before final evaluation."},
    {"q":"What does the large positive coefficient for complain tell us?","o":["Filing improves satisfaction","Complaints are the main topic","The fitted feature has an association that needs a phrase-level check","Patients rarely felt ignored"],"a":2,"why":"The reassurance phrase loses nothing during preprocessing. Reading the original explains what that column can stand for."},
    {"q":"What does LDA allow in a review that praises staff and describes a delay?","o":["A mixture of subjects in one review","Only its strongest feeling","One compulsory subject for the entire review","Identification of what caused the delay"],"a":0,"why":"LDA represents each review with a distribution over topics and each topic with a distribution over words."},
    {"q":"What does closeness between rude and impolite in an embedding suggest?","o":["Identical dictionary meanings","Both were frequent at Al Waha","All nearby words express the same feeling","The words may occur in similar surroundings"],"a":3,"why":"Training contexts can bring synonyms or even opposites close together. Check what that similarity captures."},
    {"q":"What follows from an attention connection from complain to nothing?","o":["The model understood the reassurance","Information can pass between those positions in that layer","Nothing caused a higher satisfaction score","The encoder learned a stop list"],"a":1,"why":"An attention weight describes one mixing operation. It does not establish the interpretation of the final output."},
    {"q":"How should zero-shot coding be assessed?","o":["Accept fluent answers","Let the model revise its reference labels","Freeze the instructions and compare with independent coding of unseen excerpts","Select the prompt on final test accuracy"],"a":2,"why":"Use a coding guide, inspect evidence spans and compare agreement and class-specific errors."},
    {"q":"Observed agreement is 80% and expected chance agreement is 50%. What is Cohen’s kappa?","o":["0.30","0.40","0.80","0.60"],"a":3,"why":"The coders gained 30 percentage points beyond chance out of 50 available, giving 0.60."},
    {"q":"Four alerts include three filed complaints. Two other complaints were missed. What is complaint recall?","o":["3 / 5","3 / 4","4 / 5","2 / 4"],"a":0,"why":"Recall starts with all five actual complaints. Precision starts with all four alerts."},
    {"q":"Which comparison measures the added value of review text for a complaint alert?","o":["Compare two hospitals with different outcomes","Score only flagged visits","Compare fixed models on identical eligible held-out visits at the same prediction time","Choose features on the final test set"],"a":2,"why":"Match rows, prediction time, splits and assessment rules. Report class-specific results with the filing rate and uncertainty."},
    {"q":"A review gives a rare service, shift and exact time after the patient name is removed. What should happen before release?","o":["Publish the excerpt immediately","Assess identification risk and minimise the details for the approved use","Upload the full note to check it","Replace only the episode key"],"a":1,"why":"Several indirect details together can identify a visit. Review the audience, permission and need for each detail."}
  ]
};
