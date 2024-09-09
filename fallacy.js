


const fallacies = [
    {
        name: "Shade Thrower",
        fallacy: "Ad Hominem",
        description: "Attacking the person making the argument instead of the argument itself.",
    },
    {
        name: "Spin Doctor",
        fallacy: "Straw Man",
        description: "Misrepresenting someone's argument to make it easier to attack.",
    },
    {
        name: "Big Boss",
        fallacy: "Appeal to Authority",
        description: "Claiming something is true because an authority figure says so.",
    },
    {
        name: "Tunnel Vision",
        fallacy: "False Dilemma",
        description: "Presenting two options as the only possibilities when others exist.",
    },
    {
        name: "Panic Button",
        fallacy: "Slippery Slope",
        description: "Arguing that a minor action will lead to major and oftentimes ludicrous consequences.",
    },
    {
        name: "Loop King",
        fallacy: "Circular Reasoning",
        description: "When the conclusion of an argument is used as a premise of the same argument.",
    },
    {
        name: "Snap Judgment",
        fallacy: "Hasty Generalization",
        description: "Making a broad generalization based on limited evidence.",
    },
    {
        name: "Side Stepper",
        fallacy: "Red Herring",
        description: "Introducing irrelevant information to distract from the actual issue.",
    },
    {
        name: "Trend Rider",
        fallacy: "Bandwagon Fallacy",
        description: "Arguing something is true or correct because its popular.",
        example: "Everyones doing it, so it must be the right thing."
    },
    {
        name: "Coincide Clyde",
        fallacy: "Post Hoc Ergo Propter Hoc",
        description: "Assuming that because one event follows another, the first caused the second.",
    },
    {
        name: "Tear Jerker",
        fallacy: "Appeal to Emotion",
        description: "Using emotional appeal rather than logical argument.",
    },
    {
        name: "Echo Chamber",
        fallacy: "Begging the Question",
        description: "When an arguments premises assume the truth of the conclusion instead of supporting it.",
    },
    {
        name: "Equalizer",
        fallacy: "False Equivalence",
        description: "Comparing two things as equal when they are not.",
    },
    {
        name: "Gatekeeper",
        fallacy: "No True Scotsman",
        description: "Defining something in such a way that it excludes counterexamples.",
    },
    {
        name: "Roots Rater",
        fallacy: "Genetic Fallacy",
        description: "Judging something as good or bad based on where it comes from.",
    },
    {
        name: "Mirror Mask",
        fallacy: "Tu Quoque",
        description: "Deflecting criticism by pointing out the critics own flaws.",
    },
    {
        name: "Old Soul",
        fallacy: "Appeal to Tradition",
        description: "Arguing something is right because its always been done that way.",
    },
    {
        name: "Blindspot",
        fallacy: "Appeal to Ignorance",
        description: "Arguing that something is true because it hasnt been proven false.",
    },
    {
        name: "Chain Link",
        fallacy: "False Cause",
        description: "Assuming a relationship between two events when none exists.",
    },
    {
        name: "Trap Setter",
        fallacy: "Loaded Question",
        description: "Asking a question with a presumption built into it, trapping the respondent.",
    }
];

const fallacyExamples = [
    {
        fallacy: "Ad Hominem",
        examples: [
            "You're just a fool, so your argument is invalid.",
            "How can you trust his argument when he's so incompetent?",
            "Of course you think that; you're just a high school dropout.",
            "You can't argue against my point because you always mess things up.",
            "Only someone like you would make such a ridiculous claim."
        ]
    },
    {
        fallacy: "Straw Man",
        examples: [
            "You want to ban all cars because of emissions? That's ridiculous!",
            "He argues that we should have stricter regulations, but all he wants is to control us!",
            "She says we should eat less meat for health reasons, but she wants us all to be vegans.",
            "You think we should have better laws for pets? So you want to force everyone to have pets?",
            "You want more funding for education? So you think we should just throw money at schools without oversight."
        ]
    },
    {
        fallacy: "Appeal to Authority",
        examples: [
            "This must be true because a professor said it.",
            "The CEO of the company says it's the best product, so it must be.",
            "According to this famous author, the policy is the right one.",
            "The scientist says it's safe, so it must be.",
            "My favorite celebrity supports this, so it has to be good."
        ]
    },
    {
        fallacy: "False Dilemma",
        examples: [
            "You're either with us or against us.",
            "Either we cut taxes or the economy will collapse.",
            "You must choose between this job and your family.",
            "We either ban all cars or face environmental disaster.",
            "If you're not part of the solution, you're part of the problem."
        ]
    },
    {
        fallacy: "Slippery Slope",
        examples: [
            "If we allow this, society will collapse!",
            "Allowing any amount of pollution will inevitably lead to total environmental destruction.",
            "If we let kids use phones, they'll stop learning and society will crumble.",
            "If we legalize marijuana, soon all drugs will be legal and chaos will ensue.",
            "If we accept one change, it will lead to further demands and total anarchy."
        ]
    },
    {
        fallacy: "Circular Reasoning",
        examples: [
            "The Bible is true because the Bible says so.",
            "I'm right because I'm always right.",
            "The law is just because it's the law.",
            "You should trust me because I am trustworthy.",
            "The president is correct because he's in charge."
        ]
    },
    {
        fallacy: "Hasty Generalization",
        examples: [
            "I've met two rude people from that city, so everyone there is rude.",
            "She failed her test, so all students must be failing.",
            "This restaurant is terrible, so all restaurants in town must be.",
            "I've seen a few people from that country act badly, so everyone from there must be bad.",
            "My neighbor's dog barks a lot, so all dogs must be noisy."
        ]
    },
    {
        fallacy: "Red Herring",
        examples: [
            "Why worry about the environment when there are people who need jobs?",
            "Let's not talk about the budget; let's discuss your personal issues.",
            "Instead of focusing on the problem, let's talk about what you're wearing.",
            "The real issue is not the policy but how this affects our vacation plans.",
            "Why are we debating this when we have bigger issues like the traffic problem?"
        ]
    },
    {
        fallacy: "Bandwagon Fallacy",
        examples: [
            "Everyone's doing it, so it must be the right thing.",
            "This product is popular, so it must be the best.",
            "All my friends believe in this, so it must be true.",
            "Since everyone is supporting this movement, it's clearly the correct choice.",
            "This trend is going viral, so it has to be important."
        ]
    },
    {
        fallacy: "Post Hoc Ergo Propter Hoc",
        examples: [
            "I got sick after I visited that store, so the store made me sick.",
            "The rooster crows before sunrise, so the rooster causes the sun to rise.",
            "My car broke down after I got new tires, so the tires must be the problem.",
            "We had a bad storm right after the new policy, so the policy caused the storm.",
            "She started working here and then we had record sales, so her presence caused the increase."
        ]
    },
    {
        fallacy: "Appeal to Emotion",
        examples: [
            "Think of the children; you must support this cause.",
            "If you don't donate, youre a heartless person who doesn't care about the needy.",
            "Consider how sad it would be if we didn't take action now.",
            "You should support this because it will make you feel good inside.",
            "How can you refuse to help when it would break so many hearts?"
        ]
    },
    {
        fallacy: "Begging the Question",
        examples: [
            "We must follow the law because it's illegal not to.",
            "The law is just because it says so.",
            "You should trust this method because it's proven to work.",
            "The policy is the best because it is implemented by the best.",
            "We need to do this because its necessary."
        ]
    },
    {
        fallacy: "False Equivalence",
        examples: [
            "Eating meat is just as bad as murder.",
            "Not voting is the same as voting for the other side.",
            "Skipping one class is equivalent to failing the entire course.",
            "Being late once is the same as being habitually irresponsible.",
            "Not liking the policy is like being against the entire organization."
        ]
    },
    {
        fallacy: "No True Scotsman",
        examples: [
            "No real gamer would play that game.",
            "If you were truly a sports fan, you'd know the rules.",
            "No true environmentalist would use plastic bags.",
            "If you were a real expert, you'd understand this concept.",
            "No true friend would behave that way."
        ]
    },
    {
        fallacy: "Genetic Fallacy",
        examples: [
            "That idea is wrong because it comes from that group.",
            "We shouldn't listen to his argument because hes from that country.",
            "Her opinions are invalid because of where she was raised.",
            "The theory is flawed because it originated from an unreliable source.",
            "The product is bad because it's from that manufacturer."
        ]
    },
    {
        fallacy: "Tu Quoque",
        examples: [
            "You can't tell me not to smoke; you smoke too!",
            "How can you criticize my spending when you waste money yourself?",
            "You think I should eat healthier? You eat junk food all the time!",
            "You're accusing me of being late, but you're never on time either.",
            "You say I should study more, but you never studied when you were in school."
        ]
    },
    {
        fallacy: "Appeal to Tradition",
        examples: [
            "This is the way we've always done it, so it must be the best way.",
            "We should keep this tradition because it's been around for centuries.",
            "Our ancestors did it this way, so it must be the right way.",
            "We've always followed these rules, and thats why theyre still relevant.",
            "This practice is important because its part of our heritage."
        ]
    },
    {
        fallacy: "Appeal to Ignorance",
        examples: [
            "No one has proven aliens don't exist, so they must be real.",
            "We dont have evidence that this works, so it must not work.",
            "Since there's no proof that this theory is false, it must be true.",
            "We havent disproven this claim, so it must be valid.",
            "If you can't prove the existence of unicorns, then they must be real."
        ]
    },
    {
        fallacy: "False Cause",
        examples: [
            "The rooster crows before sunrise, so the rooster causes the sun to rise.",
            "Since we started using this new software, sales have increased. It must be the software.",
            "Every time I wear this lucky shirt, my team wins. The shirt must be bringing good luck.",
            "My headache went away after drinking this tea, so the tea must be the cure.",
            "She always wears red on test days, and she always gets good grades. Red must be the reason."
        ]
    },
    {
        fallacy: "Loaded Question",
        examples: [
            "Have you stopped cheating on your tests?",
            "Why do you always lie to people?",
            "When will you start taking responsibility for your actions?",
            "How long have you been ignoring your duties?",
            "Why are you so inconsistent with your promises?"
        ]
    },
    {
        fallacy: "Cherry Picking",
        examples: [
            "You can't trust that study; there are others that show the opposite.",
            "Heres one example of how this policy has failed, ignoring all the successes.",
            "This one anecdote proves that this method is ineffective, disregarding other evidence.",
            "Only mentioning the cases where the method didn't work while ignoring the successful ones.",
            "Highlighting only the negative reviews while ignoring the positive feedback."
        ]
    },
    {
        fallacy: "Black-or-White",
        examples: [
            "Either youre completely for this policy or youre against it.",
            "You must choose to support this idea fully or reject it entirely.",
            "Either you agree with everything I say or you're my enemy.",
            "Youre either a hero or a villain in this situation.",
            "Theres no middle ground: youre either with us or against us."
        ]
    },
    {
        fallacy: "Guilt by Association",
        examples: [
            "He must be a bad person because he’s friends with that notorious criminal.",
            "You can't trust her argument; she associates with people who believe in conspiracy theories.",
            "Because he hangs out with a questionable crowd, he must share their views.",
            "Her opinions are invalid since she works for a controversial organization.",
            "You should be wary of his ideas because he's aligned with that problematic group."
        ]
    },
    {
        fallacy: "Burden of Proof",
        examples: [
            "You need to prove that this claim is false; I don’t have to prove it’s true.",
            "It’s not my job to show that this isn’t the case; it’s your responsibility to prove it is.",
            "Since you can't disprove my argument, it must be correct.",
            "The burden is on you to prove that this theory is incorrect.",
            "I don't have to provide evidence; it's up to you to disprove it."
        ]
    },
    {
        fallacy: "Middle Ground",
        examples: [
            "We should compromise on this issue; let's meet halfway.",
            "Since both sides have valid points, we should find a middle ground.",
            "We can’t take either extreme, so let’s choose a compromise.",
            "Because both arguments have some merit, we should settle somewhere in the middle.",
            "To avoid conflict, let’s agree to a solution that satisfies both sides to some extent."
        ]
    },
    {
        fallacy: "Personal Incredulity",
        examples: [
            "I can’t understand how this could work, so it must be impossible.",
            "It’s hard for me to believe, so it can’t be true.",
            "Since I don’t see how this is feasible, it must not be feasible.",
            "It’s beyond my comprehension, so it must be false.",
            "If I can’t imagine it happening, it won’t happen."
        ]
    },
    {
        fallacy: "Anecdotal Evidence",
        examples: [
            "I know someone who lost weight using this diet, so it must work for everyone.",
            "My friend had a great experience with this product, so it must be the best.",
            "I’ve seen people succeed with this method, so it’s the right one for everyone.",
            "I’ve personally had success with this technique, so it’s universally effective.",
            "Because I had a positive outcome, this must be the best approach for all."
        ]
    },
    {
        fallacy: "Appeal to Nature",
        examples: [
            "This is natural, so it must be better for you.",
            "Because it's derived from nature, it's the best option.",
            "Natural products are always superior to synthetic ones.",
            "Since this is natural, it can’t be harmful.",
            "Because it's from nature, it must be the best choice."
        ]
    },
    {
        fallacy: "False Analogy",
        examples: [
            "Comparing eating meat to murder is absurdly wrong.",
            "Saying that banning cars is like banning all technology is a false analogy.",
            "Arguing that regulating businesses is like stripping people of their freedom is misleading.",
            "Saying that watching TV is as bad as wasting time on social media is a false comparison.",
            "Comparing a lack of sleep to being lazy is an oversimplification."
        ]
    }
];

