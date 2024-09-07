// Array to store existing fallacies with multiple expressions
const additionalFallacies = [
    { 
        type: "appeal to emotion",
        expressions: [
            "appeal to emotion",
            "playing on emotions",
            "emotional appeal",
            "exploiting feelings",
            "emotional manipulation",
            "stirring up sentiments",
            "emotional manipulation", "stirring up sentiments", "manipulating feelings", "emotional blackmail", "appeal to pity",
            "appeal to fear", "appeal to outrage", "appeal to sympathy", "evoking pity", "appealing to anxiety", "emotional leverage",
            "sentimental argument", "evoking strong feelings", "appealing to compassion", "emotionally charged", "feeling based argument"
        ],
        message: "This statement seems to be an appeal to emotion."
    },
    { 
        type: "strawman",
        expressions: [
            "strawman",
            "misrepresenting argument",
            "distorting argument",
            "caricature of argument",
            "exaggerating position",
            "attacking a misrepresentation", "distorted representation", "false portrayal", "skewed argument",
            "misconstrued position", "oversimplified argument", "fabricated stance", "misrepresented view",
            "mocked argument", "distorted interpretation", "erroneous representation", "misleading caricature",
            "mischaracterized stance", "unfair representation", "twisted argument"
        ],
        message: "This statement seems to be a strawman argument."
    },
    { 
        type: "ad hominem",
        expressions: [
            "ad hominem",
            "personal attack",
            "attacking the person",
            "insulting character",
            "dismissing by disparagement",
            "questioning motives", "personal criticism", "character assassination", "attacking the individual",
            "ad hominem attack", "personal denigration", "irrelevant personal criticism", "targeting character",
            "insult-based argument", "personal insult", "discrediting by character", "attacking personal traits",
            "ad personam", "character-based dismissal", "personal disparagement"
        ],
        message: "This statement seems to be an ad hominem attack."
    },
    { 
        type: "appeal to authority",
        expressions: [
            "appeal to authority",
            "authority fallacy",
            "expert opinion",
            "celebrity endorsement",
            "relying on credentials",
            "appealing to status", "appeal to experts", "expert's authority", "prestigious source",
            "credential-based argument", "endorsement fallacy", "celebrity appeal", "relying on authority",
            "status-based argument", "prestige appeal", "authoritative opinion", "expert endorsement", "status-driven claim",
            "authoritative source", "expert fallacy"
        ],
        message: "This statement seems to rely on an appeal to authority."
    },
    { 
        type: "false dilemma",
        expressions: [
            "false dilemma",
            "false dichotomy",
            "either-or fallacy",
            "limited options",
            "oversimplified choice",
            "false binary", "restricted options", "either-or argument", "false choice", "dichotomous thinking", "binary fallacy",
            "limited alternatives", "overly simplistic choice", "restricted perspective", "false opposition", "either-or reasoning",
            "simplified dichotomy", "exaggerated binary", "misleading alternatives", "artificial limitation"
        ],
        message: "This statement presents a false dilemma."
    },
    { 
        type: "slippery slope",
        expressions: [
            "slippery slope",
            "slippery slope fallacy",
            "chain reaction",
            "domino effect",
            "exaggerated consequence",
            "unwarranted progression", "inevitable outcome", "escalation fallacy", "slippery slope argument", "chain reaction fallacy",
            "cascade effect", "progressive fallacy", "slippery escalation", "unjustified progression", "fallacious chain", "exaggerated progression",
            "slippery chain", "cascading consequence", "domino fallacy", "exaggerated outcome"
        ],
        message: "This statement seems to be a slippery slope argument."
    },
    { 
        type: "hasty generalization",
        expressions: [
            "hasty generalization",
            "generalizing too quickly",
            "overgeneralization",
            "premature conclusion",
            "insufficient evidence",
            "jumping to conclusions", "broad generalization", "quick assumption", "rash generalization", "hasty inference",
            "sweeping generalization", "rushed conclusion", "insufficient sampling", "generalizing from few", "overly broad conclusion",
            "unwarranted generalization", "prejudicial generalization", "flawed generalization", "premature generalizing", "inadequate evidence"
        ],
        message: "This statement appears to be a hasty generalization."
    },
    { 
        type: "post hoc",
        expressions: [
            "post hoc",
            "post hoc ergo propter hoc",
            "false cause",
            "causal fallacy",
            "after this, therefore because of this",
            "wrongly attributing cause", "causal reasoning fallacy", "false causation", "incorrect cause and effect", "erroneous causation",
            "post hoc reasoning", "misattributing cause", "causal link fallacy", "post hoc assumption", "causal misjudgment", "incorrectly linking cause",
            "wrong causation", "fallacy of cause", "causal error", "post hoc fallacy"
        ],
        message: "This statement seems to be a post hoc fallacy."
    },
    { 
        type: "red herring",
        expressions: [
            "red herring",
            "irrelevant conclusion",
            "distraction",
            "changing the subject",
            "irrelevant diversion",
            "avoiding the issue", "misdirection", "off-topic argument", "irrelevant topic", "diversionary tactic",
            "distraction technique", "issue diversion", "irrelevant point", "dodging the question", "subject change", "distraction argument",
            "irrelevant redirection", "topic shift", "off-point argument", "irrelevant shift"
        ],
        message: "This statement appears to be a red herring."
    },
    { 
        type: "bandwagon",
        expressions: [
            "bandwagon",
            "appeal to popularity",
            "everyone is doing it",
            "popular opinion",
            "majority view",
            "trend-based reasoning", "peer pressure", "popularity fallacy", "common belief", "majority fallacy", "conformity argument",
            "bandwagon effect", "appeal to consensus", "widespread acceptance", "trend fallacy", "popularity argument", "mass appeal",
            "popular trend", "common practice", "general agreement"
        ],
        message: "This statement seems to be a bandwagon argument."
    },
    { 
        type: "circular reasoning",
        expressions: [
            "circular reasoning",
            "begging the question",
            "circular argument",
            "reasoning in circles",
            "assuming the conclusion",
            "tautological reasoning", "circular logic", "argumentative circle", "repetitive reasoning", "conclusion-based premise",
            "circular justification", "argumentative loop", "begging the issue", "circular proof", "reasoning loop", "assumed conclusion",
            "conclusion-based reasoning", "tautology", "self-supporting argument", "reiterative reasoning"
        ],
        message: "This statement seems to use circular reasoning."
    },
    { 
        type: "false equivalence",
        expressions: [
            "false equivalence",
            "false comparison",
            "equivocation",
            "incorrect analogy",
            "misleading comparison",
            "inappropriate equivalence", "flawed comparison", "false analogy", "misrepresented equivalence", "erroneous comparison",
            "false parallel", "incorrect equivalence", "misleading analogy", "improper comparison", "comparison fallacy", "invalid analogy",
            "erroneous parallel", "faulty equivalence", "misapplied analogy", "false similarity"
        ],
        message: "This statement appears to be a false equivalence."
    },
    { 
        type: "tu quoque",
        expressions: [
            "tu quoque",
            "you too fallacy",
            "appeal to hypocrisy",
            "whataboutism",
            "deflecting criticism",
            "hypocritical response", "accusing of hypocrisy", "diverting blame", "shifting fault", "hypocrite fallacy", "distraction by hypocrisy",
            "self-defensive response", "counter-accusation", "pointing to hypocrisy", "diversion tactic", "counter-criticism", "deflecting critique",
            "accusatory deflection", "hypocritical diversion", "fault-shifting argument"
        ],
        message: "This statement seems to be a tu quoque argument."
    },
    { 
        type: "appeal to ignorance",
        expressions: [
            "appeal to ignorance",
            "argument from ignorance",
            "burden of proof fallacy",
            "lack of evidence",
            "proof by absence",
            "assertion due to lack of disproof", "ignorance-based argument", "lack of counter-evidence", "unproven claim",
            "absence of proof fallacy", "proof by default", "negative evidence argument", "evidence absence fallacy", "proof by ignorance",
            "unsupported claim", "argument from lack of proof", "proof deficit argument", "assertion by ignorance", "evidence deficit claim", "proof absence reasoning"
        ],
        message: "This statement seems to be an appeal to ignorance."
    },
    { 
        type: "moral equivalence",
        expressions: [
            "moral equivalence",
            "equating moral issues",
            "false equivalence in morals",
            "moral comparison",
            "equivocation in ethics",
            "misplaced moral comparison", "moral equivalence fallacy", "ethical comparison", "false moral equivalence", "moral balancing",
            "inappropriate ethical comparison", "misjudged morality", "equating moral wrongs", "ethical equivalence", "moral relativity fallacy",
            "moral equivalency", "comparison in morals", "misapplied ethics", "faulty moral comparison", "moral argument fallacy"
        ],
        message: "This statement appears to be a moral equivalence fallacy."
    },
    { 
        type: "false analogy",
        expressions: [
            "false analogy",
            "flawed analogy",
            "incorrect comparison",
            "misleading similarity",
            "inappropriate analogy",
            "disanalogous reasoning", "invalid analogy", "incorrectly comparing", "flawed comparison", "misapplied analogy",
            "false comparison", "analogy fallacy", "improper analogy", "misrepresented analogy", "inaccurate comparison", "erroneous analogy",
            "faulty analogy", "analogy error", "misguided comparison", "fallacious analogy"
        ],
        message: "This statement seems to use a false analogy."
    },
    { 
        type: "cherry picking",
        expressions: [
            "cherry picking",
            "selective evidence",
            "biased selection",
            "evidence distortion",
            "partial evidence",
            "isolating favorable data", "data manipulation", "selective reporting", "evidence cherry-picking", "biased evidence choice",
            "partial evidence", "data selection fallacy", "evidence distortion", "manipulated sampling", "evidence bias", "partial data",
            "skewed evidence", "selective use of data", "incomplete evidence", "prejudicial evidence choice", "data manipulation fallacy", "selective data", "evidence picking"
        ],
        message: "This statement appears to involve cherry picking."
    },
    { 
        type: "burden of proof",
        expressions: [
            "burden of proof",
            "shifting the burden",
            "proof fallacy",
            "misplaced burden",
            "demanding proof",
            "responsibility of proof", "burden transfer", "proof responsibility shift", "demand for proof fallacy", "proof shift",
            "proof obligation shift", "proof demand fallacy", "proof burden reversal", "shifting proof responsibility", "proof burden fallacy",
            "obligation to prove", "proof transfer fallacy", "shifting obligation", "proof liability shift", "proof imposition fallacy", "burden reallocation",
            "proof shift fallacy", "proof shift argument"
        ],
        message: "This statement seems to involve a burden of proof fallacy."
    },
    { 
        type: "gambler's fallacy",
        expressions: [
            "gambler's fallacy",
            "fallacy of the maturity of chances",
            "false belief in randomness",
            "incorrect assumption of probability",
            "misconception of chance",
            "mistaken probability belief"
        ],
        message: "This statement seems to be a gambler's fallacy."
    },
    { 
        type: "appeal to nature",
        expressions: [
            "appeal to nature",
            "naturalistic fallacy",
            "its natural so its good",
            "inherent goodness of nature",
            "nature as a moral guide",
            "natural superiority"
        ],
        message: "This statement seems to involve an appeal to nature."
    },
    { 
        type: "anecdotal",
        expressions: [
            "anecdotal evidence",
            "personal experience",
            "single example",
            "anecdotal reasoning",
            "individual case",
            "personal testimony"
        ],
        message: "This statement relies on anecdotal evidence."
    },
    { 
        type: "complex question",
        expressions: [
            "complex question",
            "loaded question",
            "trick question",
            "presumptive question",
            "entrapment question",
            "question with hidden assumptions"
        ],
        message: "This statement contains a complex or loaded question."
    },
    { 
        type: "No True Scotsman",
        expressions: [
            "No True Scotsman",
            "true scotsman fallacy",
            "excluding counterexamples",
            "redefining terms",
            "special pleading",
            "excluding exceptions"
        ],
        message: "This statement seems to be a No True Scotsman fallacy."
    },
    { 
        type: "fallacy of composition",
        expressions: [
            "fallacy of composition",
            "composition fallacy",
            "assuming what is true of the part is true of the whole",
            "part-whole fallacy",
            "generalization of parts to the whole",
            "incorrect inference from parts to whole"
        ],
        message: "This statement seems to involve a fallacy of composition."
    },
    { 
        type: "fallacy of division",
        expressions: [
            "fallacy of division",
            "division fallacy",
            "assuming what is true of the whole is true of the part",
            "whole-part fallacy",
            "generalizing from whole to parts",
            "incorrect inference from whole to parts"
        ],
        message: "This statement seems to involve a fallacy of division."
    },
    { 
        type: "appeal to tradition",
        expressions: [
            "appeal to tradition",
            "argument from tradition",
            "it has always been this way",
            "traditionalism",
            "historical precedent",
            "status quo argument"
        ],
        message: "This statement seems to be an appeal to tradition."
    },
    { 
        type: "genetic fallacy",
        expressions: [
            "genetic fallacy",
            "origin fallacy",
            "attacking the source",
            "source-based dismissal",
            "origin-based argument",
            "discrediting the origin"
        ],
        message: "This statement appears to be a genetic fallacy."
    },
    { 
        type: "appeal to self-interest",
        expressions: [
            "appeal to self-interest",
            "personal gain argument",
            "self-serving bias",
            "personal benefit",
            "self-interest reasoning",
            "benefit-based appeal"
        ],
        message: "This statement seems to appeal to self-interest."
    },
    { 
        type: "burden of proof shift",
        expressions: [
            "burden of proof shift",
            "shifting the burden of proof",
            "demand for proof fallacy",
            "proof responsibility shift",
            "proof reversal",
            "burden transfer"
        ],
        message: "This statement involves a burden of proof shift."
    },
    { 
        type: "false cause",
        expressions: [
            "false cause",
            "causal fallacy",
            "misattributed cause",
            "incorrect causation",
            "wrongly linking cause and effect",
            "erroneous cause-effect relationship"
        ],
        message: "This statement seems to involve a false cause fallacy."
    },
    { 
        type: "appeal to the consequences",
        expressions: [
            "appeal to the consequences",
            "consequences fallacy",
            "positive or negative outcomes",
            "outcome-based reasoning",
            "impact-focused argument",
            "consequential appeal"
        ],
        message: "This statement seems to involve an appeal to the consequences."
    },
    { 
        type: "appeal to novelty",
        expressions: [
            "appeal to novelty",
            "newness fallacy",
            "novelty fallacy",
            "recent development",
            "newness as virtue",
            "innovation bias"
        ],
        message: "This statement seems to be an appeal to novelty."
    },
    { 
        type: "appeal to tradition",
        expressions: [
            "appeal to tradition",
            "argument from tradition",
            "tradition-based reasoning",
            "historical practice",
            "long-standing custom",
            "heritage argument"
        ],
        message: "This statement seems to be an appeal to tradition."
    }
];

// Function to extend the main fallacies array
function extendFallacies() {
    if (typeof fallacies !== 'undefined') {
        fallacies.push(...additionalFallacies);
    } else {
        console.error("Main fallacies array is not defined.");
    }
}

// Call the function to extend the fallacies
extendFallacies();
