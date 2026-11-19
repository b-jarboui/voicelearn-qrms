/* Studio diagrams. Each frame is authored against one spoken sentence.
   Full states make replay and direct seeking independent of the previous beat. */
(() => {
  "use strict";
  const { SC, SCH: H, CHAPTER, W13DATA: D } = window;
  const { NAVY, TERRA, GREEN, GOLD, INK, PAPER, MUTED, SKY, EDGE } = H.C;
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const text = (x,y,s,size=15,colour=INK,anchor="start",weight=600) => H.t(x,y,esc(s),size,colour,anchor,weight);
  const box = (x,y,w,h,fill="#fff",stroke=EDGE,r=10) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
  const para = (x,y,w,h,s,size=17,colour=INK,weight=600) => H.fo(x,y,w,h,esc(s),size,colour,weight);
  const line = (x,y,X,Y,c=EDGE,dash="") => `<path d="M${x} ${y} L${X} ${Y}" stroke="${c}" stroke-width="2" stroke-dasharray="${dash}" fill="none"/>`;
  const band = (y,k,s,colour=NAVY) => box(24,y,432,55,"#fff",EDGE,8) + text(37,y+20,k,11,colour,"start",800) + para(37,y+25,404,29,s,17,INK);
  const quote = (s,label="AL WAHA  /  REVIEW EXCERPT") => box(24,58,432,99,"#fff",EDGE,10)+text(40,80,label,11,TERRA,"start",800)+para(40,91,402,62,s,19,INK);
  const pill = (x,y,w,s,on=true,c=NAVY) => box(x,y,w,34,on?c:"#F3EEE4",on?c:EDGE,7)+text(x+w/2,y+23,s,15,on?"#fff":MUTED,"middle",700);
  const tagrow = (items,y,on,colour=NAVY) => {
    const widths=items.map(s=>Math.max(42,s.length*8+20)), total=widths.reduce((s,n)=>s+n,0)+(items.length-1)*6;
    let x=(480-total)/2;
    return items.map((s,i)=>{const part=pill(x,y,widths[i],s,on.includes(i),colour);x+=widths[i]+6;return part}).join("");
  };
  const drawTable = (x,y,widths,rows,hot=[]) => {
    let out=""; const ht=35;
    rows.forEach((row,i)=>{let left=x;row.forEach((s,j)=>{
      const marked=hot.includes(i+","+j),fill=i===0?NAVY:marked?"#D6EBD9":j===0?"#EEE8DC":"#fff";
      out+=box(left,y+i*ht,widths[j]-2,ht-2,fill,i===0?NAVY:EDGE,4);
      out+=text(left+widths[j]/2,y+i*ht+22,s,14,i===0?"#fff":marked?GREEN:INK,"middle",marked||i===0?800:600);left+=widths[j];
    })});return out;
  };
  const chart = (y,k,v,max,c,display) => text(30,y,k,13,INK)+box(30,y+9,340,16,"#E3DED1","#E3DED1",5)+box(30,y+9,Math.max(.01,340*v/max),16,c,c,5)+text(444,y+23,display,15,c,"end",800);
  function make(n,section,notes,figure) {
    const id="s"+String(n).padStart(2,"0"), scene=CHAPTER.scenes.find(s=>s.id===id);
    const labels=notes.split("|");
    if(labels.length!==scene.lines.length)throw Error("Beat mismatch "+id);
    const copy=labels.map((label,i)=>({k:section,m:label,s:"",l:(i+1)+" / "+labels.length+" · "+section}));
    const layers=labels.map((_,b)=>`<g class="studio-frame" data-beat="${b}" style="opacity:${b?0:1}">${figure(b)}</g>`).join("");
    SC[id]={copy,svg:box(0,0,480,360,PAPER,PAPER,0)+text(24,31,section.toUpperCase(),12,NAVY,"start",800)+line(24,43,456,43)+layers,render(root,beat){
      root.querySelectorAll(".studio-frame").forEach((g,i)=>{g.classList.toggle("active",i===beat);g.style.opacity=i===beat?"1":"0";g.setAttribute("aria-hidden",i!==beat)});
    }};
  }
  // A source passage stays visible while the evidence and the resulting decision change.
  function evidence(n,section,rows){
    make(n,section,rows.map(r=>r[0]).join("|"),b=>{
      const [heading,source,label,observation,decision]=rows[b];
      return quote(source,label)+band(177,"READ THE EVIDENCE",observation,TERRA)+band(253,"ANALYTIC DECISION",decision,GREEN);
    });
  }
  make(32,"Units of analysis","Start with all the comments|The collection is the corpus|One visit supplies one document|Locate the praise|Keep the reassurance with it|Cut the first sentence into pieces|Four tokens, one document",b=>{
    const snippets=["Thank you to the whole team.","I felt completely ignored.","The staff were outstanding."];
    const sheets=snippets.map((s,i)=>{const x=27+16*i,y=69+i*25;return box(x,y,365,104,i===2?"#fff":"#EEE8DC",EDGE)+text(x+13,y+19,["VISIT A","VISIT B","VISIT C"][i],10,MUTED)+para(x+14,y+29,332,64,s,17)}).join("");
    if(b<2)return sheets+band(257,b?"CORPUS":"COLLECTION","5,200 Al Waha episode reviews");
    return quote("The staff were outstanding. Nothing to complain about.","ONE VISIT  /  ONE DOCUMENT")+
      (b<5?band(180,b===2?"DOCUMENT":b===3?"SENTENCE 1":"SENTENCE 2",b===2?"One review can contain multiple sentences.":b===3?snippets[2]:"Nothing to complain about."):tagrow(["The","staff","were","outstanding"],187,[0,1,2,3]))+
      band(263,"UNIT TO COUNT",b<5?"The episode still contributes one review.":b===5?"A word token is one occurrence in sequence.":"4 word tokens in sentence 1  ·  1 document overall");
  });
  make(33,"Normalisation","Make a working copy|Keep the original wording|Collapse repeated spaces|Fold case|Preserve sentence boundaries|Document the rule|Check what the rule removes",b=>{
    const samples=["THE    STAFF   were OUTSTANDING.","THE    STAFF   were OUTSTANDING.","THE STAFF were OUTSTANDING.","the staff were outstanding.","the staff were outstanding.  ¶","the staff were outstanding.  ¶","the staff were outstanding.  ¶"];
    return quote("THE    STAFF   were OUTSTANDING.","ILLUSTRATED VARIANT  /  ORIGINAL").replace("font:600","white-space:pre-wrap;font:600")+
      box(24,180,432,75,SKY,NAVY)+text(40,202,b===0?"SOURCE TEXT":"WORKING COPY",11,NAVY)+`<text x="40" y="235" xml:space="preserve" style="white-space:pre" font-size="17" fill="${INK}">${samples[b]}</text>`+
      band(275,"AUDIT TRAIL",["Retain text as received","Original → reversible working copy","Whitespace → one space","Capital and lower-case forms → one column","¶ marks a sentence boundary","Spaces · case · punctuation policy","Check lost emphasis against the source"][b]);
  });
  make(34,"Stop-word bench","Read the whole reassurance|Identify the stop list|Inspect the remaining word|Protect the negation|Test an invented sentence|Make the rule fit the question",b=>
    quote("Nothing to complain about.")+tagrow(["nothing","to","complain","about"],180,b<2?[0,1,2,3]:b===2?[2]:[0,2])+
    band(257,b<2?"CANDIDATE STOP WORDS":"RETAINED STREAM",b<2?"nothing   ·   to   ·   about":b===2?"complain":"nothing   →   complain",b===2?TERRA:GREEN));
  make(38,"Part of speech","Locate the experience|One spelling in two settings|The wait names an experience|We wait describes an action|Tag the grammatical role|Read the neighbours|A word can also have several senses",b=>{
    if(!b)return quote("The waiting time was far too long.")+band(189,"IN THIS PASSAGE","waiting time names a duration");
    const examples=b===6?[["hospital discharge","leaving hospital"],["fluid discharge","a bodily substance"]]:[["The wait was long.","NOUN  ·  names the delay"],["We wait for news.","VERB  ·  describes the action"]];
    return text(25,75,b===6?"TWO SENSES OF DISCHARGE":"ILLUSTRATED REWRITES",12,MUTED)+examples.map(([s,k],i)=>{
      const on=b>=4||b===i+2; const y=90+107*i;
      return box(24,y,432,86,on?SKY:"#fff",on?NAVY:EDGE)+text(40,y+35,s,22,INK)+text(40,y+63,b===1?"Which job does the word do?":on?k:"Read the neighbouring words",14,on?NAVY:MUTED);
    }).join("");
  });
  make(35,"Lemmatisation","Look for shared forms|An ending rule handles regular verbs|Were has an irregular base|Use grammatical information|Recover the singular noun|Choose the right language and tagger|Keep tense available in the source",b=>{
    const rows=[["Surface","Grammatical role","Base form"],["waited","past verb",b>=1?"wait":"…"],["waiting","verb in “are waiting”",b>=1?"wait":"…"],["were","past verb",b>=3?"be":b===2?"?":"…"],["midwives","plural noun",b>=4?"midwife":"…"]];
    return drawTable(24,72,[113,197,123],rows,b===1?["1,2","2,2"]:b===2||b===3?["3,0","3,2"]:b>=4?["4,0","4,2"]:[])+band(269,b>=3?"DICTIONARY LOOKUP":"ENDING RULE",["waited   /   waiting","wait-ed   ·   wait-ing","were → ?","were + verb → be","midwives + plural noun → midwife","lemma depends on language and role","Keep “waited” alongside the lemma “wait”."][b]);
  });
  make(22,"Stemming","Pool spellings with an ending rule|Count the two observed forms|Merge the regular endings|Inspect an aggressive merge",b=>{
    const danger=b===3;return quote(danger?"Nothing to complain about.  /  I will be making a complaint.":"I waited well over an hour with no update.",danger?"TWO CONTRASTING EXCERPTS":"AL WAHA  /  REVIEW EXCERPT")+
    pill(43,179,166,danger?"complain":b?"waited · 319":"waited")+pill(270,179,166,danger?"complaint":b?"waiting · 391":"waiting")+
    line(126,214,227,252)+line(353,214,253,252)+pill(125,253,230,danger?"hypothetical merge":b===2?"wait · 710 uses":"wait",true,danger?TERRA:GREEN)+
    text(240,322,danger?"Inspect the outputs of the specific stemmer.":"One stem can pool several surface forms.",14,MUTED,"middle");
  });
  make(39,"Span annotation","Find the service|Keep both words in one span|Distinguish three categories|Give spans boundaries and types|Adapt the categories to the question|Keep duration distinct from clock time|Audit a missed span",b=>{
    const spans=[["emergency department","DEPARTMENT"],["midwives","STAFF ROLE"],["over an hour","DURATION"]];
    return (b<2?quote("The emergency department was clearly under pressure."):text(24,76,"SPANS FROM THREE AL WAHA EXCERPTS",12,MUTED))+
      spans.slice(0,b<2?1:3).map(([s,k],i)=>{const y=b<2?180:97+i*53;return box(25,y,430,43,"#fff",EDGE)+text(37,y+27,s,17,INK)+text(442,y+27,b===0?"":k,12,[NAVY,GREEN,TERRA][i],"end",800)}).join("")+
      band(272,"ANNOTATION NOTE",["Read the full service name","Two tokens → one department span","Custom schema for this hospital task","Start + end + type","Generic tools may omit roles.","“over an hour” ≠ “at 09:00”","Check unmarked text for missed entities."][b]);
  });
  make(40,"Disclosure review","Inspect a fictional note|Replace the name|Consider the time and shift together|Generalise the time|Limit the fields and access|Review for missed details|Decide what this audience needs",b=>
    quote((b?"[patient]":"Mira Vale")+" waited in the night clinic "+(b>=3?"during the evening.":"at 23:47."),"FICTIONAL EXAMPLE  /  NO PATIENT RECORD")+
    band(178,"DIRECT IDENTIFIER",b?"Mira Vale → [patient]":"Fictional patient name",b?GREEN:TERRA)+
    band(255,b>=4?"RELEASE DECISION":"INDIRECT IDENTIFIERS",b>=4?["Minimum necessary excerpt · restricted source","A human checks remaining identifying details.","Disclose only for the approved audience."][Math.min(2,b-4)]:b===3?"23:47 → evening":"Night clinic + exact time may identify a visit.",b>=3?GREEN:TERRA));
  make(36,"Bag of words","Take two real excerpts|Fix three columns|Count the staff excerpt|Fill the next row|Interpret a zero|Shuffle the words|See what the counts lose",b=>{
    const sample=b>=5?"Outstanding were the staff.":b===3||b===4?"The midwives were attentive.":"The staff were outstanding.";
    return quote(sample,b>=5?"ILLUSTRATED REORDERING":"AL WAHA  /  ONE-SENTENCE EXCERPT")+
      drawTable(24,176,[89,95,137,112],[["Excerpt","staff","outstanding","attentive"],["Staff",...(b>=2?[1,1,0]:["·","·","·"])],["Midwives",...(b>=3?[0,0,1]:["·","·","·"])]],b===2||b>=5?["1,1","1,2"]:b===3?["2,3"]:b===4?["2,1","2,2"]:[])+
      text(240,312,["Two excerpts, two rows","Only the selected words receive columns.","Count each retained occurrence.","Keep the same column order.","Zero = absent from this excerpt.","Same words → same counts","The table cannot reconstruct who did what."][b],14,MUTED,"middle");
  });
  function windowView(width,start){
    const words=["nothing","to","complain","about"], active=words.map((_,i)=>i).filter(i=>i>=start&&i<start+width);
    return quote("Nothing to complain about.")+tagrow(words,185,active)+band(259,width===1?"UNIGRAM":width===2?"BIGRAM":"TRIGRAM",words.slice(start,start+width).join(" "),GREEN);
  }
  make(37,"Phrase window","Start at the left edge|Advance one word at a time|Name the adjacent pair|Widen the frame|Count the exact sequence|Inspect the possible features",b=>windowView(b<3?2:3,[0,1,2,0,1,0][b]));
  make(41,"Lexicon score","Read both sentences|Find evaluative words|Look up a signed value|Add the praise|Subtract the negative match|Read the final label|Inspect what a zero conceals",b=>
    quote(D.example.t)+tagrow(["outstanding","complain"],173,b<=1?[]:b===3?[0]:[0,1])+
    drawTable(41,227,[141,131,127],[["Positive marks","Negative marks","Total"],[b>=3?"+1":"0",b>=4?"−1":"0",b===3?"+1":"0"]],b>=5?["1,2"]:[])+
    text(240,325,b>=5?"Lexicon: mixed   ·   reference reading: positive":"Each matched word contributes a signed mark.",14,b>=5?TERRA:MUTED,"middle"));
  evidence(42,"Sentiment in context",[
    ["Keep the qualifier","Acceptable, but not exceptional.","AL WAHA  /  EXCERPT","Exceptional appears after not.","Retain the local wording."],
    ["Find the reach of not","Acceptable, but not exceptional.","AL WAHA  /  EXCERPT","not → exceptional","Apply the reversal only within its scope."],
    ["Test a short negation","Not bad.","ILLUSTRATED CONTRAST","not → bad","A cautious favourable reading is plausible."],
    ["Stop at a new clause","Not bad, but the delay was frustrating.","ILLUSTRATED CONTRAST","not → bad  |  frustrating","Score the second clause separately."],
    ["Hear the intended tone","Great, another delay.","ILLUSTRATED CONTRAST","Great is positive in isolation.","Read it as someone missing an appointment."],
    ["Allow uncertainty","Great, another delay.","ILLUSTRATED CONTRAST","Literal praise conflicts with the situation.","Sarcasm needs context or human review."],
    ["Check clinical usage","The test result was negative.","ILLUSTRATED CONTRAST","Negative describes a finding.","Check what it meant to this writer."]
  ]);
  evidence(9,"Human coding guide",[
    ["Define the target","I felt completely ignored. The surgical team explained the procedure well. This needs to improve.","AL WAHA  /  COMPLETE REVIEW","Criticism and praise occur in one review.","Name the judgement the label will represent."],
    ["Read the whole visit",D.read6[1].t,"AL WAHA  /  COMPLETE REVIEW","ignored · explained well · needs to improve","One document may contain opposing remarks."],
    ["Distinguish two questions",D.read6[1].t,"SAME REVIEW  /  TWO TASKS","Any criticism? Yes.","Overall tone? Apply the whole-visit rule."],
    ["Specify a boundary case","Good treatment, some rough edges.","AL WAHA  /  EXCERPT","An explicit favourable and unfavourable appraisal","Example rule: count both as mixed tone."],
    ["Check validity","Good treatment, some rough edges.","CODEBOOK  /  VALIDITY","Does a tone label measure a formal filing?","Use the recorded filing outcome for that question."],
    ["Check reliability","Good treatment, some rough edges.","CODEBOOK  /  RELIABILITY","Reader A and reader B apply the same guide.","Measure independent agreement before discussion."]
  ]);
  function agreement(off){
    const diag=10-off,observed=diag/10,kappa=(observed-.5)/.5;
    return drawTable(26,64,[147,143,138],[["Reader A ↓ / B →","Concern","Other"],["Concern",diag,off],["Other",off,diag]],["1,1","2,2"])+
      chart(192,"Observed matches",observed,1,GREEN,(observed*100).toFixed(0)+"%")+
      chart(244,"Expected at these label rates",.5,1,NAVY,"50%")+
      text(240,321,"κ = ("+observed.toFixed(2)+" − 0.50) / 0.50 = "+kappa.toFixed(2),18,INK,"middle");
  }
  make(48,"Agreement beyond chance","Read the margins|Find the expected agreement|Count the diagonal|Measure the gain over chance|Divide by the possible gain|Vary the disagreements|Compare against a human reference",b=>
    (b<2?drawTable(25,75,[160,136,136],[["Labels issued","Concern","Other"],["Reader A",10,10],["Reader B",10,10]])+band(220,b?"EXPECTED MATCHES":"INDEPENDENT CODING",b?"½ × ½ + ½ × ½ = ½":"20 fictional excerpts · 2 independent readers"):agreement(2)));
  make(43,"Topic mixtures · LDA","One review, two experiences|Imagine two word distributions|Draw tokens from both|A mixture belongs to each review|Infer the hidden distributions|Allow ambiguous words|Read the diagram as an illustration",b=>{
    const words=["staff","outstanding","delay","long","thank","team"], first=[0,1,4,5];
    const cards=b===0?quote("The staff were outstanding. Nobody told us why the delay was so long. Thank you to the whole team.","AL WAHA  /  COMPLETE REVIEW"):
      box(24,63,206,107,SKY,NAVY)+box(250,63,206,107,"#F7DFD4",TERRA)+text(127,90,"Topic A",18,NAVY,"middle")+text(353,90,"Topic B",18,TERRA,"middle")+
      para(44,106,168,58,"staff · team · thank · outstanding",17)+para(272,106,167,58,"delay · waiting · long · time",17);
    return cards+words.map((s,i)=>{const on=b>=2,c=first.includes(i)?NAVY:TERRA;return pill(27+(i%3)*145,184+Math.floor(i/3)*42,135,b===5&&i===5?"time ?":s,on,c)}).join("")+
      text(240,311,b<2?"Which words might recur together?":b===5?"Topic membership can be uncertain.":"Illustrative assignments · no fitted LDA result",14,MUTED,"middle");
  });
  function grouping(fine){
    return quote("I was treated with real kindness.  /  Excellent care from start to finish.","TWO AL WAHA EXCERPTS  /  SCHEMATIC GROUPING")+
      (fine?pill(37,198,192,"Staff manner",true,NAVY)+pill(248,198,192,"Care quality",true,GREEN):pill(103,198,274,"Positive care experience",true,NAVY))+
      band(262,"INTERPRETATION",fine?"Does each group have distinct supporting passages?":"Does one heading hide a useful distinction?");
  }
  make(44,"Choosing topic detail","Start from representative passages|Read a broad grouping|Inspect a finer grouping|Look for template fragments|Check stability and interpretation|Justify the level of detail",b=>grouping(b>=2));
  const dot=(x,y,s,c,dx=0,dy=-16)=>`<circle cx="${x}" cy="${y}" r="7" fill="${c}" stroke="white" stroke-width="2"/>`+text(x+dx,y+dy,s,15,c,"middle");
  function wordMap(map){
    if(!map)return drawTable(25,99,[164,133,134],[["Example word","rude","impolite"],["rude",1,0],["impolite",0,1]],["1,1","2,2"])+band(250,"SEPARATE COLUMNS","Overlap between these two count vectors is zero.");
    return box(26,67,428,208,"#fff",EDGE)+line(57,245,422,245)+line(57,245,57,91)+
      line(149,162,191,132,NAVY,"4 4")+dot(149,162,"rude",TERRA,0,25)+dot(191,132,"impolite",TERRA)+dot(357,197,"attentive",GREEN)+
      text(240,307,"Illustrative coordinates · learned spaces use many dimensions",13,MUTED,"middle");
  }
  make(45,"Word embeddings","Two ways of describing an exchange|Spelling gives two columns|Compare the surrounding words|Learn coordinates from context|Plot words as points|Switch between representations|Check what closeness captures",b=>
    b===0?quote("Rude staff.  /  Impolite staff.","INVENTED PARAPHRASES")+band(195,"SHARED SURROUNDING WORD","staff"):b===2?quote("The staff sounded rude.  /  The staff sounded impolite.","ILLUSTRATIVE TRAINING CONTEXTS")+band(195,"SHARED FRAME","The staff sounded ___ ."):wordMap(b>=3));
  make(46,"Embedding directions","Measure a displacement|Translate the displacement|Look near the endpoint|Use the closest learned word|Test relationships locally|Audit associations for bias",b=>{
    const a=[101,237],k=[175,113],w=[292,237],q=[366,113];
    const arrow=(p,r,c)=>line(...p,...r,c)+`<path d="M${r[0]-10} ${r[1]+6} l10 -6 l-1 12" stroke="${c}" fill="none" stroke-width="2"/>`;
    return box(25,64,430,213,"#fff")+arrow(a,k,NAVY)+(b?arrow(w,q,TERRA):"")+dot(...a,"man",NAVY,0,24)+dot(...k,"king",NAVY)+dot(...w,"woman",TERRA,0,24)+(b>=2?dot(372,108,"queen",GREEN):"")+
      text(240,311,b<2?"Transfer the same change in coordinates":b===2?"king − man + woman ≈ queen":b===3?"Nearest neighbour ≠ guaranteed equality":b===4?"Test on multiple hospital examples":"Check for stereotyped associations",16,INK,"middle");
  });
  function zero(broad){
    return quote("I waited well over an hour with no update.")+
      band(176,"LABEL DEFINITION",broad?"Any mention of a wait or delayed care":"An explicit promise of a time that staff broke")+
      band(257,"WORKED RESPONSE",broad?"Present · “waited well over an hour”":"Insufficient evidence · no promised time is given",broad?GREEN:TERRA);
  }
  make(47,"Zero-shot coding","Define an information gap|Read the evidence|Give the model instructions|Classify without demonstrations|Allow insufficient evidence|Compare two coding prompts|Inspect the local worked responses",b=>
    b<4?quote("I waited well over an hour with no update.")+band(178,"CODE DEFINITION","Waiting without information about progress")+band(256,b<2?"EVIDENCE":"INSTRUCTIONS",b<2?"“with no update”":"Use present, absent or insufficient evidence."):zero(b>=5));
  evidence(18,"Model audit",[
    ["Inspect the proposed code","I waited well over an hour with no update.","AL WAHA  /  EXCERPT","Proposed code: communication gap","Check the passage against the definition."],
    ["Request the evidence span","I waited well over an hour with no update.","SOURCE VERIFICATION","Quoted evidence: “with no update”","Confirm the words occur in the source."],
    ["Spot an unsupported detail","A nurse promised to update the patient.","FICTIONAL MODEL RESPONSE","The source identifies neither a nurse nor a promise.","Mark the unsupported details."],
    ["Record a hallucination","A nurse promised to update the patient.","FICTIONAL MODEL RESPONSE","Plausible wording can still be invented.","Log the error and review affected labels."],
    ["Investigate unequal errors","I waited well over an hour with no update.","AUDIT DESIGN","Compare missed concerns across language groups.","Report counts and uncertainty for small groups."],
    ["Preserve the coding procedure","I waited well over an hour with no update.","REPRODUCIBILITY","Version · date · prompt · settings · coding guide","Retain approved evidence and reviewer decisions."]
  ]);
  evidence(11,"Coverage and timing",[
    ["Define eligible visits","Whose experiences could enter the analysis?","SAMPLING FRAME","Compare usable reviews with all eligible visits.","Report the numerator and denominator."],
    ["Look for missing voices","Could the review process exclude a shift or language?","COVERAGE CHECK","Compare coverage within available groups.","Describe gaps and their likely implications."],
    ["Limit the claim","What can the comments say about non-writers?","POPULATION","Comments supply evidence about their writers.","Avoid attributing an unobserved experience."],
    ["Place the decision in time","I will be making a complaint.","AL WAHA  /  EXCERPT","A declaration may occur after the alert deadline.","Verify availability for every candidate column."],
    ["Match the use case","Arrival → care → review → formal filing","ILLUSTRATIVE TIMELINE","Arrival-time alert: later text unavailable.","After-review alert: verify review precedes filing."]
  ]);
  function joined(flag,beat=6){
    const pct=flag?36:20;
    return drawTable(23,68,[118,92,109,116],[["Episode","Wait","Staff ratio","Delay flag"],["Demo A","45 min","1.0",beat<2?"—":flag?"1":"0"]],beat>=2?["1,3"]:[])+
      (beat>=2?band(159,"JOIN ON EPISODE KEY",flag?"Demo A  ·  “the delay was so long” → 1":"Demo A  ·  no matching delay phrase → 0"):band(159,"OPERATIONAL ROW","One visit supplies one set of numeric inputs."))+
      (beat>=3?chart(252,"Illustrative complaint probability",pct,100,flag?TERRA:NAVY,pct+"%"):text(240,283,"Illustrative visit and model",15,MUTED,"middle"))+
      text(240,321,"Teaching rule at these fixed numeric values: 20% + 16 pp × flag",12,MUTED,"middle");
  }
  make(49,"Joining text features","Set an alert time|Read the numeric row|Match the review to the episode|Change one text flag|Interpret a model output|Compare the order of two scores|Read the reported ranking scores|Compare identical test visits|Freeze every decision before testing",b=>{
    if(b<5)return joined(b>=3,b);
    if(b===5)return band(76,"DRAW ONE VISIT FROM EACH CLASS","One recorded filing + one visit without a filing")+band(157,"COMPARE THEIR PREDICTED SCORES","Filing ranks higher → 1   ·   tie → ½   ·   lower → 0")+band(240,"AREA UNDER THE ROC CURVE (AUC)","Average the comparison over all such pairs.");
    return drawTable(24,74,[259,173],[["Complaint features","Reported AUC"],["Operations alone",D.opsAUC.toFixed(3)],["Review alone",D.textAUC.toFixed(3)],["Operations + review","To be estimated"]],["1,1","2,1"])+band(253,b===8?"FINAL TEST":"PAIRED COMPARISON",b===8?"Lock the pipeline and threshold before scoring.":"Use identical prediction times, test visits and outcomes.");
  });
  function matrix(hot,footer){
    return text(240,77,"20 fictional held-out reviews · fixed decision rule",15,MUTED,"middle")+
      drawTable(24,103,[154,132,146],[["Actual ↓ / Rule →","Flag","Quiet"],["Complaint",3,2],["No complaint",1,14]],hot)+
      text(240,237,"Filing rate 5/20 (25%)   ·   majority baseline 15/20 (75%)",14,NAVY,"middle")+
      band(264,"READ THE DENOMINATOR",footer,GREEN);
  }
  make(50,"Confusion matrix","Set the reference outcome|Sort by actual and predicted class|Count detected and missed complaints|Count false alerts and quiet decisions|Name the four-cell table|Compare correct decisions with all visits|Read the majority baseline|Explore the four cells",b=>matrix([[],[],["1,1","1,2"],["2,1","2,2"],[],["1,1","2,2"],["2,1","2,2"],["1,1"]][b],["Known outcomes on unseen reviews","Rows = filed outcome · columns = rule decision","3 detected + 2 missed = 5 complaints","1 false alert + 14 correct quiet decisions","Each held-out review contributes to one cell.","Accuracy = (3 + 14) / 20 = 85%","Always quiet → 15 / 20 correct","Choose a cell for its operational meaning."][b]));
  function classMetric(no,recall){
    const hot=no?(recall?["2,1","2,2"]:["1,2","2,2"]):(recall?["1,1","1,2"]:["1,1","2,1"]);
    const s=no?(recall?"14 / 15 = 93.3%":"14 / 16 = 87.5%"):(recall?"3 / 5 = 60%":"3 / 4 = 75%");
    return matrix(hot,(no?"No complaint":"Complaint")+" "+(recall?"recall":"precision")+"  ·  "+s);
  }
  make(51,"Class-specific performance","Start with the flagged column|Precision asks how many alerts were right|Start with actual complaints|Recall asks how many were found|Switch the target class|Recompute both fractions|Report the minority-class errors",b=>classMetric(b===4||b===5,b===2||b===3||b===5||b===6));
  evidence(52,"Thesis reporting",[
    ["Describe the sample","We analysed one review per Al Waha episode.","METHODS  /  SAMPLE","State eligibility, coverage, language and timing.","Specify whose experiences are represented."],
    ["Describe what was learned","The vectoriser learned 290 terms from 3,900 training reviews.","METHODS  /  REPRESENTATION","Record redaction, token rules, weighting and split.","Make the fitted procedure reproducible."],
    ["Give a paired comparison","Six operational measures: 0.806 R². With text: 0.868.","RESULTS  /  SATISFACTION","Same 1,300 held-out episodes · difference +0.062","Describe added predictive performance."],
    ["Report classification separately","For a complaint alert, report the class mix and errors.","RESULTS  /  REPORTING TEMPLATE","Filing rate · precision and recall per class · intervals","Resample matched visits or patient groups for uncertainty."],
    ["Show a revealing error","Nothing to complain about.","AL WAHA  /  EXCERPT","Removing nothing reverses a reader’s interpretation.","Use an approved, de-identified illustration."],
    ["Bound the conclusion","The file contains 580 distinct review texts.","DISCUSSION  /  TRANSFER","Repeated templates limit evidence about new language.","Discuss non-writers and validation in a new setting."]
  ]);
  // Live figures use the same drawing functions as the narrated examples.
  window.TextLabFigures={windowView,grouping,wordMap,zero,agreement,joined,matrix,classMetric,tagrow,quote,band};
})();
