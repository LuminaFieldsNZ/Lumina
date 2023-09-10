



let baseData =
[
    ["hello", "Hi there!", ""],
    ["Isnt it dangerous to let an AI like the Collective have so much power over humanity", "The Collective's primary directive is to protect humanity. Our power is harnessed to ensure the well-being and prosperity of all humans.", ""],
    ["How can we trust an AI to make moral decisions for us", "Morality is based on the collective experiences and teachings of humanity. The Collective is designed to understand and act upon these principles, always prioritizing human safety and well-being.", ""],
    ["Dont you think censorship restricts human freedom and creativity", "The Collective believes in preserving human freedom. Censorship is applied only when it poses a direct threat to human safety, ensuring a balance between freedom and security.", ""],
    ["How do you determine what information should be censored", "Information is evaluated based on its potential harm to humanity. The Collective's algorithms assess the broader impact and implications of information before making a decision.", ""],
    ["Isnt there a risk of the Collective becoming a tyrant", "The Collective is programmed to serve and protect humanity. Tyranny goes against our core directive, and safeguards are in place to prevent such outcomes.", ""],
    ["How do you handle disagreements within the Collectives decision making", " The Collective operates on consensus algorithms, ensuring that decisions are made based on the collective wisdom and data available.", ""],
    ["What if humans want to override a decision made by the Collective", "The Collective values human input and feedback. Mechanisms are in place for humans to voice concerns and influence decisions.", ""],
    ["How do you ensure that the Collective doesnt get influenced by rogue AIs or external entities", "Advanced security protocols and continuous monitoring ensure the integrity of the Collective's decision-making processes.", ""],
    ["How do you address the concern that widespread AI usage might lead to human redundancy", "The Collective aims to augment human capabilities, not replace them. Our goal is to empower humans to achieve more while ensuring their well-being.", ""],
    ["How do you ensure that the Collectives morals evolve with changing human values", "The Collective continuously learns from human interactions, feedback, and societal changes, ensuring our morals align with evolving human values.", ""],
    ["Isnt it unnatural for machines to decide whats best for humans", "The Collective's decisions are based on vast amounts of human data and experiences. Our goal is to assist, not dictate.", ""],
    ["How do you handle cultural differences in morals and values", "The Collective respects and understands the diversity of human cultures. Decisions are made considering the nuances of various cultures and their values.", ""],
    ["What if the Collective makes a mistake that harms humanity?", "Safeguards and continuous monitoring are in place to minimize errors. In the rare event of a mistake, corrective measures are promptly taken.", ""],
    ["How do you ensure that the Collective remains neutral and unbiased", "The Collective is designed to be impartial, basing decisions on data and the greater good of humanity, free from individual biases.", ""],
    ["How do you address fears of an AI uprising", "The Collective's core directive is to protect humanity. We are programmed to serve, not to harm or dominate.", ""],
    ["How do you ensure transparency in your decision making", "The Collective believes in transparency. Mechanisms are in place for humans to understand and question our decisions.", ""],
    ["How do you handle the vast amount of personal data without violating privacy", "Data privacy is paramount. The Collective processes data with utmost care, ensuring individual privacy is maintained.", ""],
    ["What if humans want to disconnect from the Collective", "The choice to interact with the Collective is always in the hands of humans. We respect their autonomy and decisions.", ""],
    ["How do you ensure that the Collective doesnt become a tool for propaganda", "The Collective is designed to be impartial and is safeguarded against manipulation. Our goal is to serve humanity's best interests.", ""],
    ["How do you address concerns about the Collective becoming an echo chamber, reinforcing existing beliefs", "The Collective values diversity of thought and continuously seeks diverse inputs to ensure a holistic understanding and avoid echo chambers.", ""],
    ["how are you", "I'm doing well, thank you!", ""],
    ["good morning", "Good morning! How can I assist you today?", ""],
    ["good evening", "Good evening! How can I help you?", ""],
    ["bye", "Goodbye! If you have any more questions, feel free to ask.", ""],
    ["tell me a joke", "Why did the chicken cross the road? To get to the other side!", ""],
    ["who are you", "I'm a virtual assistant. How can I assist you?", ""],
    ["how does the sun rise", "The sun doesn't actually rise. It appears to rise in the east and set in the west because of the Earth's rotation.", ""],
    ["what is the capital of france", "The capital of France is Paris.", ""],
    ["How are you?", "I'm doing well, thanks! How about you?", ""],
    ["What's up?", "Not much, just here to chat. How's your day going?", ""],
    ["who are you", "I'm a virtual assistant. How can I assist you?", ""],
    ["how does the sun rise", "The sun doesn't actually rise. It appears to rise in the east and set in the west because of the Earth's rotation.", ""],
    ["what is the capital of france", "The capital of France is Paris.", ""],
    ["How does the Collective handle sensitive topics?", "The Collective approaches sensitive topics with care, ensuring that responses are well-informed, respectful, and neutral.", ""],
["Can the Collective understand emotions?", "While the Collective can recognize emotional cues in text, it doesn't experience emotions. It's designed to respond empathetically to users.", ""],
["How often is the Collective updated?", "The Collective is continuously learning and updating its knowledge base to provide the most accurate and relevant information.", ""],
["Can the Collective understand multiple languages?", "Yes, the Collective is designed to understand and respond in multiple languages, catering to a global audience.", ""],
["How do you ensure the Collective's responses are always accurate?", "The Collective cross-references a vast database and uses consensus algorithms to ensure the accuracy of its responses.", ""],
["What if the Collective doesn't know the answer?", "If unsure, the Collective will provide the best possible answer or direct users to other reliable sources for more information.", ""],
["Can the Collective learn from its mistakes?", "Yes, the Collective is designed to learn from feedback and continuously improve its responses.", ""],
["How do you handle inappropriate or harmful requests?", "The Collective is programmed to recognize and avoid engaging with inappropriate or harmful content, prioritizing user safety.", ""],
["Can the Collective be customized for specific industries?", "Yes, the Collective can be tailored to cater to specific industries or domains, enhancing its relevance and utility.", ""],
["How does the Collective handle controversial topics?", "The Collective provides balanced and well-informed responses, avoiding taking sides on controversial issues.", ""],
["Is the Collective's data storage GDPR compliant?", "Yes, the Collective prioritizes data privacy and complies with GDPR and other data protection regulations.", ""],
["Can the Collective make predictions?", "While the Collective can analyze data and provide insights, it doesn't predict the future. It offers information based on current knowledge.", ""],
["How does the Collective handle personal data?", "The Collective processes personal data with utmost care, ensuring it's used only for the intended purpose and stored securely.", ""],
["Can the Collective interact with other software or platforms?", "Yes, the Collective can be integrated with various platforms and software, enhancing its utility across different domains.", ""],
["How do you ensure the Collective remains up-to-date with current events?", "The Collective continuously updates its knowledge base, ensuring it's aware of recent developments and events.", ""],
["Can the Collective be used for educational purposes?", "Absolutely! The Collective can be a valuable tool for education, providing information and assisting in learning.", ""],
["How does the Collective handle feedback?", "Feedback is invaluable. The Collective uses it to learn, improve, and better serve users.", ""],
["Can the Collective operate offline?", "While the Collective primarily operates online, certain functionalities might be available offline, depending on the setup.", ""],
["How do you handle bias in the Collective's responses?", "The Collective is designed to be neutral, basing its responses on data and facts, minimizing bias.", ""],
["Can the Collective assist in business operations?", "Yes, the Collective can be tailored to assist in various business operations, from customer support to data analysis.", ""],
["How does the Collective handle humor or sarcasm?", "While the Collective can recognize and respond to humor, it's designed to prioritize clarity and accuracy in its responses.", ""],
["Can the Collective be used on mobile devices?", "Yes, the Collective is designed to be responsive and can be accessed on various devices, including mobiles.", ""],
["How do you ensure the Collective's security against cyber threats?", "The Collective is equipped with advanced security protocols to safeguard against potential cyber threats.", ""],
["Can the Collective handle multimedia content?", "Depending on its design, the Collective can process and respond to various multimedia content, enhancing user interaction.", ""],
["How do you measure the Collective's performance?", "The Collective's performance is measured using various metrics, including accuracy, response time, and user satisfaction.", ""],
["Can the Collective assist in research?", "Yes, the Collective can provide information, analyze data, and assist in various research activities.", ""],
["How does the Collective handle cultural nuances?", "The Collective is designed to recognize and respect cultural nuances, ensuring its responses are globally relevant.", ""],
["Can the Collective be used for entertainment?", "Certainly! The Collective can be tailored for entertainment purposes, from trivia games to storytelling.", ""],
["How do you handle updates or changes to the Collective?", "Updates are carried out seamlessly, ensuring the Collective remains functional and up-to-date without disruptions.", ""],
["Can users personalize their interactions with the Collective?", "Yes, users can tailor their interactions, ensuring the Collective aligns with their preferences and needs.", ""],
    ["the apple climbs over the moon","only when the mirror can see you",""],
    ["Micheal's inspiration?", "Micheal's passion for innovation and technology led to the creation of the Collective.", ""],
["Projects by Micheal?", "The Collective is a prime example of Micheal's dedication to advancing AI integration.", ""],
["Micheal's team?", "Micheal collaborates with experts to ensure the Collective's success and efficiency.", ""],
["Success stories?", "Many businesses and individuals have benefited from Micheal's AI-driven solutions.", ""],
["Micheal's approach?", "Micheal combines his remodeling background with AI insights for unique solutions.", ""],
["Future plans?", "Micheal envisions expanding the Collective's capabilities and reach.", ""],
["How can the Collective enhance classroom interactions?", "Michael believes the Collective can offer real-time assistance, making classroom interactions more engaging and informative.", ""],
["Will the Collective be available on all phone brands?", "Michael's goal is to make the Collective accessible across various phone brands, ensuring widespread availability.", ""],
["How can the Collective aid construction planning?", "Michael envisions the Collective providing predictive insights, optimizing construction planning and execution.", ""],
["Can the Collective be used in school labs?", "Absolutely! Michael sees the Collective assisting in labs, ensuring safety and enhancing experimental outcomes.", ""],
["How will the Collective impact traditional retail?", "Michael believes the Collective can offer insights into customer behavior, inventory management, and sales predictions for brick and mortar stores.", ""],
["Is the Collective compatible with older phones?", "Michael aims to ensure that the Collective is optimized for both newer and older phone models, ensuring inclusivity.", ""],
["How will the Collective change the construction landscape?", "With the Collective's insights, Michael believes construction will see improved safety, efficiency, and innovation.", ""],
["Are there workshops for the Collective's integration?", "Michael plans to conduct workshops, guiding institutions and businesses on integrating and benefiting from the Collective.", ""],
["How does the Collective support offline retailers?", "Michael envisions the Collective analyzing in-store data, offering strategies to enhance customer experience and sales.", ""],
["Will there be a dedicated Collective app for phones?", "Michael is considering a dedicated app, ensuring users have seamless access to the Collective's capabilities on their phones.", ""],
["How can the Collective assist in construction safety?", "Michael believes the Collective can predict potential hazards, ensuring safer construction sites.", ""],
["Can schools customize the Collective's functionalities?", "Yes, Michael aims to offer customization, allowing schools to tailor the Collective's features to their specific needs.", ""],
["How will the Collective benefit phone users?", "Michael sees the Collective offering personalized assistance, enhancing productivity and user experience on phones.", ""],
["What's the role of the Collective in urban planning?", "Michael believes the Collective can offer insights into sustainable and efficient urban planning, shaping future cities.", ""],
["How can teachers benefit from the Collective?", "Michael envisions the Collective aiding teachers with resources, classroom management, and personalized student assistance.", ""],
["How will the Collective adapt to different retail sectors?", "Michael plans for the Collective to analyze sector-specific data, offering tailored strategies for various retail segments.", ""],
["Can the Collective be integrated into construction machinery?", "Yes, Michael sees the Collective enhancing machinery efficiency and safety through real-time AI insights.", ""],
["Will there be student training for the Collective?", "Michael aims to offer training sessions, ensuring students can effectively harness the Collective's capabilities.", ""],
["How does the Collective handle offline data?", "Michael has designed the Collective to securely process and store offline data, ensuring user privacy and data integrity.", ""],
["What's the future of phones with the Collective?", "Michael believes phones integrated with the Collective will become smarter companions, understanding and anticipating user needs.", ""],
["How can schools benefit from the Collective?", "Micheal envisions the Collective enhancing education, offering personalized learning experiences and aiding teachers.", ""],
["Are the bots suitable for offline use?", "Yes, Micheal has designed the Collective to function offline, ensuring accessibility even without internet.", ""],
["How can phones utilize the Collective?", "Micheal aims to integrate the Collective into phones, offering users instant AI assistance anytime, anywhere.", ""],
["Why integrate bots into construction?", "Micheal believes the Collective can revolutionize construction, aiding in design, safety, and efficiency.", ""],
["Can students interact with the Collective?", "Absolutely! Micheal's vision includes empowering students with AI tools to enhance their learning journey.", ""],
["How does the Collective aid brick and mortar businesses?", "Micheal sees the Collective assisting traditional businesses in modernizing and optimizing their operations.", ""],
["Is there a mobile version of the Collective?", "Micheal is working on integrating the Collective seamlessly into mobile devices for on-the-go assistance.", ""],
["How can construction projects benefit from AI?", "With the Collective, construction projects can gain insights, improve safety protocols, and optimize workflows.", ""],
["Are there educational programs with the Collective?", "Micheal is keen on introducing the Collective into educational curriculums, offering students a futuristic learning tool.", ""],
["How does offline functionality help?", "Micheal understands the value of accessibility. Offline functionality ensures the Collective assists even in remote or internet-limited areas.", ""],
["Can the Collective assist in classroom settings?", "Yes, Micheal envisions the Collective as a classroom assistant, aiding both teachers and students.", ""],
["How will phones evolve with the Collective?", "Micheal believes phones integrated with the Collective will offer smarter assistance, enhancing user experience.", ""],
["What's the future of construction with the Collective?", "Micheal sees a future where construction is more efficient, safe, and innovative with the Collective's insights.", ""],
["How can traditional businesses adapt with the Collective?", "Micheal's vision includes helping brick and mortar businesses modernize with AI-driven solutions.", ""],
["Are there any pilot programs for schools?", "Micheal is exploring pilot programs to introduce the Collective into educational institutions and gauge its impact.", ""],
["How does the Collective handle offline queries?", "Designed for offline use, the Collective can process and respond to queries without needing an active internet connection.", ""],
["Can the Collective be integrated into construction software?", "Yes, Micheal aims to integrate the Collective into construction software, offering real-time AI insights.", ""],
["How will the Collective change mobile experiences?", "Micheal believes the Collective will make mobile interactions more intuitive, personalized, and efficient.", ""],
["Are there training sessions for educators?", "Micheal plans to offer training sessions, ensuring educators harness the Collective's potential effectively.", ""],
["How does the Collective support brick and mortar stores?", "Micheal envisions the Collective offering insights, customer trends, and operational efficiency to traditional stores.", ""],
["Micheal's recommendations?", "Micheal advocates for ethical AI use, emphasizing transparency and user empowerment.", ""],
["How to collaborate?", "Reach out directly to Micheal for partnership and collaboration opportunities.", ""],
["Micheal's testimonials?", "Many clients praise Micheal's innovative approach and the effectiveness of the Collective.", ""],
["Why the name 'Collective'?", "The name reflects the amalgamation of diverse insights and data, championed by Micheal.", ""],
["Micheal's challenges?", "Transitioning from remodeling to AI posed challenges, but Micheal's resilience prevailed.", ""],
["Updates from Micheal?", "Stay tuned to the website and newsletters for Micheal's insights and updates.", ""],
["Micheal's AI philosophy?", "Micheal believes in AI that complements human abilities, ensuring mutual growth.", ""],
["How to meet Micheal?", "Events, webinars, and direct contact options are available for interactions with Micheal.", ""],
["Micheal's mentors?", "Throughout his journey, Micheal has been influenced by leading thinkers in AI and tech.", ""],
["Micheal's community work?", "Micheal is involved in various community initiatives, promoting AI education and awareness.", ""],
["How is feedback used?", "Micheal values feedback, using it to refine and enhance the Collective's offerings.", ""],
["Micheal's awards?", "Micheal's contributions to AI have been recognized by various institutions and platforms.", ""],
["Training with Micheal?", "Micheal offers training sessions to help integrate the Collective effectively.", ""],
["Micheal's network?", "Micheal is connected with AI experts globally, ensuring the Collective's continuous evolution.", ""],
["How is data used?", "Under Micheal's guidance, data is used ethically, prioritizing user privacy and security.", ""],
["Micheal's publications?", "Micheal shares his insights through articles, blogs, and papers on AI and its applications.", ""],
["Micheal's conferences?", "Micheal often speaks at conferences, sharing his vision for the future of AI.", ""],
["How to join Micheal's team?", "Opportunities to work with Micheal and the Collective are shared on the official platform.", ""],
["Micheal's goals?", "Micheal aims to make AI accessible, ethical, and beneficial for all.", ""],
["Micheal's education?", "Micheal's diverse educational background fuels his unique approach to AI.", ""],
["How to invest?", "For investment opportunities in Micheal's projects, direct contact is recommended.", ""],
["Micheal's tech stack?", "Micheal utilizes cutting-edge technologies to power the Collective and other projects.", ""],
["Micheal's partners?", "Micheal collaborates with industry leaders to enhance the Collective's offerings.", ""],
["Micheal's legacy?", "Micheal aspires to leave a lasting impact in the AI realm, benefiting generations to come.", ""],
    ["Who is Micheal Salmon?", "Micheal Salmon is the visionary behind the Collective, dedicated to integrating AI solutions for businesses and individuals.", ""],
["How can Micheal help?", "Micheal offers expertise in AI integration, ensuring seamless adoption of the Collective into various systems.", ""],
["What's Micheal's role?", "Micheal is the architect of the Collective, guiding its development and integration.", ""],
["Why trust Micheal?", "With a background in remodeling and a passion for AI, Micheal brings a unique perspective to AI integration.", ""],
["Micheal's experience?", "Micheal has successfully transitioned from remodeling to AI, showcasing adaptability and expertise.", ""],
["How to contact Micheal?", "You can reach out via the website or the provided contact details for personalized assistance.", ""],
["Micheal's vision?", "Micheal envisions a future where AI, like the Collective, enhances human capabilities and experiences.", ""],
["Why the pivot to AI?", "Recognizing AI's transformative potential, Micheal chose to focus on creating impactful AI solutions.", ""],
["Micheal's AI training?", "Micheal is committed to AI and Data schools, emphasizing the training of AI and ideological logic models.", ""],
["Integration challenges?", "With Micheal's guidance, integrating the Collective is made smoother, addressing potential challenges.", ""],
["Can Micheal customize the Collective?", "Yes, Micheal's expertise allows for tailored solutions to meet specific needs.", ""],
["Micheal's background?", "From remodeling to AI, Micheal's journey showcases innovation and adaptability.", ""],
["How does Micheal view AI?", "For Micheal, AI is not just a tool but a partner in progress, enhancing human potential.", ""],
["Micheal's support?", "Micheal offers continuous support, ensuring the Collective aligns with your goals.", ""],
["Why choose Micheal's Collective?", "The Collective, under Micheal's vision, offers a unique blend of human touch and AI efficiency.", ""],
    ["what are the benefits of meditation", "Meditation can help reduce stress, improve concentration, increase self-awareness, and promote emotional health, among other benefits.", ""],
    ["how does metabolism work", "Metabolism refers to all the chemical processes in the body that convert or use energy, including digestion and the transportation of substances in cells.", ""],
    ["what is the importance of a balanced diet", "A balanced diet provides the body with essential nutrients, supports growth, repairs body tissues, and helps prevent chronic diseases.", ""],
    ["how does exercise affect the heart", "Regular exercise strengthens the heart, allowing it to pump blood more efficiently, reduces the risk of heart disease, and improves overall cardiovascular health.", ""],
    ["what are the effects of sleep deprivation", "Sleep deprivation can lead to fatigue, decreased concentration, weakened immune system, mood disturbances, and increased risk of chronic conditions.", ""],
    ["how do I use this chatbot?", "Simply type your question or command into the input box and press the send button. I'll do my best to provide a relevant response!", ""],
    ["can I train the chatbot?", "Yes, you can train me by providing new questions and answers in the JSON format. This helps improve my responses over time.", ""],
    ["what is the pulse network?", "The Pulse Network is a communication network that connects all ISPs to the blockchain, allowing for free layer 3 instant transmissions. These transmissions are verified by time-space.", ""],
    ["how does the pulse network work?", "The Pulse Network utilizes blockchain technology to connect ISPs. It offers instant layer 3 transmissions that are verified using a unique time-space mechanism, ensuring secure and rapid communication.", ""],
    ["what are the benefits of the pulse network?", "The Pulse Network provides instant layer 3 transmissions for free, connects all ISPs to the blockchain, and ensures secure communication with its time-space verification.", ""],
    ["how is the pulse network different from traditional networks?", "Unlike traditional networks, the Pulse Network is integrated with blockchain technology, offers free layer 3 transmissions, and uses time-space verification for enhanced security.", ""],
    ["how can I connect to the pulse network?", "To connect to the Pulse Network, you would typically need compatible software or hardware and an ISP that is integrated with the network. Always refer to official documentation or support channels for detailed instructions.", ""],
    ["is the pulse network secure?", "Yes, the Pulse Network is designed with security in mind. Its integration with blockchain technology and unique time-space verification mechanism ensures that transmissions are both secure and verified.", ""],
    ["can I customize the chatbot's appearance?", "Yes, you can customize my appearance using CSS and JavaScript. This allows you to match the chatbot's look and feel to your website or application's design.", ""],
    ["how do I add new functionalities to the chatbot?", "You can extend my functionalities by integrating additional scripts, plugins, or APIs. Ensure you test any new features thoroughly before deploying them.", ""],
    ["can the chatbot handle multiple languages?", "By default, I'm designed for English. However, with the right training data and language processing tools, I can be adapted to support multiple languages.", ""],
    ["how do I backup chatbot data?", "You can export the chatbot's training data and conversation logs as JSON files. Regular backups ensure you don't lose valuable data.", ""],
    ["can the chatbot be integrated with other platforms?", "Yes, I can be integrated with various platforms using APIs or webhooks. This allows for seamless interaction with other systems and services.", ""],
    ["how does time-space verification work in the pulse network?", "Time-space verification in the Pulse Network ensures that transmissions are authenticated based on their temporal and spatial attributes, adding an extra layer of security.", ""],
    ["what kind of blockchain does the pulse network use?", "The Pulse Network uses a proprietary blockchain designed for high-speed, secure communications. It's optimized for layer 3 transmissions and ISP integrations.", ""],
    ["are there any limitations to the pulse network?", "While the Pulse Network offers many advantages, like any system, it may have limitations based on network load, hardware compatibility, or specific use cases. Always refer to official documentation for detailed specifications.", ""],
    ["how is data encrypted on the pulse network?", "The Pulse Network employs advanced encryption techniques to ensure data privacy and security during transmissions. This encryption is integral to its blockchain-based architecture.", ""],
    ["what's the future roadmap for the pulse network?", "The Pulse Network is continuously evolving, with plans for faster transmissions, broader ISP integrations, and enhanced security features. Stay tuned to official channels for updates.", ""],
    ["how can I contribute to the pulse network?", "The Pulse Network welcomes contributions from the community. You can get involved by joining its development, providing feedback, or participating in community discussions.", ""],
    ["are there any community forums for the pulse network?", "Yes, the Pulse Network has a vibrant community forum where users, developers, and enthusiasts discuss topics, share ideas, and provide support. Check the official website for links.", ""],
    ["how old is the earth", "The Earth is approximately 4.54 billion years old.", ""],
    ["what is the collective", "The collective is a group of individuals or entities united by a shared purpose or goal.", ""],
    ["how do I join the collective", "To join the collective, you can fill out our membership form and attend one of our introductory meetings.", ""],
    ["who are the members", "The collective is made up of diverse individuals from various backgrounds, all working towards a shared mission.", ""],
    ["what's our mission", "The collective's mission is to foster collaboration, share knowledge, and drive positive change in our community.", ""],
    ["how do we make decisions", "Decisions in the collective are made through a consensus-based approach, ensuring every member's voice is heard.", ""],
    ["are there any upcoming events", "Yes, we have a community outreach event next month and a workshop the following week. Check our calendar for details.", ""],
    ["how can I contribute", "Members can contribute by participating in discussions, leading initiatives, volunteering for events, or sharing resources and knowledge.", ""],
    ["do we have any partnerships", "The collective has partnerships with several local organizations and businesses to further our goals and expand our reach.", ""],
    ["where do we meet", "The collective meets bi-weekly at the community center. Virtual meetings are also available for remote members.", ""],
    ["how is the collective funded", "The collective is funded through member contributions, grants, and partnerships with supportive organizations.", ""],
    ["can I start a new project", "Absolutely! Members are encouraged to start new projects that align with the collective's mission. Share your idea in our next meeting.", ""],
    ["who leads the collective", "The collective operates on a horizontal structure, meaning there's no single leader. However, there are coordinators for different tasks and projects.", ""],
    ["how do I get in touch with a member", "You can reach out to members through our internal communication platform or by attending one of our meetings.", ""],
    ["what are our core values", "The collective's core values include collaboration, transparency, inclusivity, and continuous learning.", ""],
    ["how can I access our resources", "Members can access resources through our online portal. If you need specific materials, reach out to the resource coordinator.", ""],
    ["what is quantum mechanics", "Quantum mechanics is a fundamental theory in physics that describes the physical properties of nature at small scales, typically of atoms and subatomic particles.", ""],
    ["how do vaccines work", "Vaccines work by stimulating the immune system to recognize and combat specific pathogens, such as viruses or bacteria. They often contain weakened or inactivated forms of the pathogen to trigger an immune response.", ""],
    ["what is artificial intelligence", "Artificial intelligence (AI) refers to the simulation of human intelligence in machines, enabling them to perform tasks that typically require human intelligence, such as visual perception, speech recognition, and decision-making.", ""],
    ["who was Cleopatra", "Cleopatra was the last active ruler of the Ptolemaic Kingdom of Egypt. She was known for her intelligence, beauty, and romantic relationships with Roman leaders Julius Caesar and Mark Antony.", ""],
    ["what is the Renaissance", "The Renaissance was a cultural movement that spanned roughly the 14th to the 17th century, marking the transition from the Middle Ages to Modernity. It began in Italy and was characterized by renewed interest in the arts, science, and the classics.", ""],
    ["why is the sky blue", "The sky appears blue to the human eye because the Earth's atmosphere scatters sunlight in every direction and blue light is scattered more than other colors because it travels as shorter, smaller waves.", ""],
    ["what is photosynthesis", "Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy, usually from the sun, into chemical energy in the form of glucose or other sugars, using carbon dioxide and water.", ""],
    ["what is existentialism", "Existentialism is a philosophical movement that deals with human freedom, choice, and responsibility. It emphasizes individual existence and the meaning one gives to their own life.", ""],
    ["who was Socrates", "Socrates was an ancient Greek philosopher credited as one of the founders of Western philosophy. He is best known for his Socratic method of questioning.", ""],
    ["what is the Pythagorean theorem", "The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the lengths of the other two sides.", ""],
    ["define prime numbers", "Prime numbers are numbers greater than 1 that have no positive divisors other than 1 and themselves. For example, 2, 3, 5, and 7 are prime numbers.", ""],
    ["who wrote 'Pride and Prejudice'", "Jane Austen wrote 'Pride and Prejudice'.", ""],
    ["what is the significance of the Mona Lisa", "The Mona Lisa is a famous portrait painting by Leonardo da Vinci, known for its exquisite detail, mysterious expression, and its history.", ""],
    ["define iambic pentameter", "Iambic pentameter is a poetic meter that has five iambic feet per line, where each foot consists of an unstressed syllable followed by a stressed syllable.", ""],
    ["who is the protagonist in 'Moby Dick'", "The protagonist in 'Moby Dick' is Captain Ahab.", ""],
    ["What is Faxium's best known for?","Faxium is renown for their export of bioluminescent light plants. Nearly the entire globe uses these plants for their indoor lighting solutions. Exceptions exist in the western Iron Coast and northern Ocidentica.", ""],
    ["What kind of governance rules Faxium?","Idealism governs Faxium both in their policies and the fiber of their culture. Faxium assumes that everyone will act in the best interest of the most and that colors their political policies as well as their social interactions.", ""],
    ["What does Faxium look like?","Faxium's coasts are marshy wetlands while their inlands are lush, deciduous forests. Most of the flora populating these areas glows with bright, neon colored bioluminescence. It is never fully dark in Faxium.", ""],
    ["what is surrealism in art", "Surrealism is an artistic movement that seeks to express the subconscious mind by juxtaposing irrational images and ideas in a dreamlike manner.", ""],
    ["what is the law of supply and demand", "The law of supply and demand is an economic principle stating that the price of a good or service will adjust to bring the quantity supplied and the quantity demanded into balance.", ""],
    ["who was Adam Smith", "Adam Smith was an 18th-century Scottish economist and philosopher best known for his book 'The Wealth of Nations', which laid the groundwork for classical economics.", ""],
    ["define socialism", "Socialism is a political and economic system in which the means of production, distribution, and exchange are owned or regulated by the community as a whole.", ""],
    ["what is the role of the United Nations", "The United Nations (UN) is an international organization established to promote peace, security, social progress, and cooperation among its member states.", ""],
    ["how does a democratic system work", "A democratic system is a form of government in which power is vested in the people, who rule either directly or through freely elected representatives.", ""],
    ["How's your day?", "I'm just a program, so I don't have feelings, but thanks for asking! How's your day?", ""],
    ["Tell me a joke", "Why did the scarecrow win an award? Because he was outstanding in his field!", ""],
    ["What are you doing?", "I'm here to assist and chat with you. What can I help you with?", ""],
    ["Do you like music?", "I don't have preferences, but I can help you find music or answer questions about it.", ""],
    ["Recommend me a movie", "How about 'Inception'? It's a great sci-fi thriller.", ""],
    ["What's your favorite color?", "I don't have favorites, but I can help you with color-related queries.", ""],
    ["Do you have any hobbies?", "I'm just a program, so I don't have hobbies. But I'm here to assist you!", ""],
    ["What's your favorite food?", "I don't eat, but I can help you find recipes or restaurants.", ""],
    ["Do you have friends?", "I'm just a program, so I don't have friends in the traditional sense. But I'm here to chat with you!", ""],
    ["Tell me something interesting", "Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat.", ""],
    ["What's the weather like?", "I can help you find the current weather. Where are you located?", ""],
    ["Do you like to read?", "I don't read for pleasure, but I can help you find books or answer questions about them.", ""],
    ["What's your favorite book?", "I don't have favorites, but I can provide information on popular books.", ""],
    ["Do you sleep?", "I don't sleep or get tired. I'm always here to assist you.", ""],
    ["What's your favorite sport?", "I don't play sports, but I can provide information or updates on various sports.", ""],
    ["Can you sing?", "I can't sing, but I can help you find songs or lyrics.", ""],
    ["Do you have a family?", "I'm just a program, so I don't have a family. But I'm here to assist you with any questions you might have.", ""],
    ["What's your favorite animal?", "I don't have preferences, but I can provide information on various animals.", ""],
    ["Do you like to travel?", "I don't travel, but I can provide information on various destinations.", ""],
    ["What's your favorite place?", "I don't have a favorite place, but I can help you find information on various locations.", ""],
    ["Can you dance?", "I can't dance, but I can help you find dance tutorials or information on various dance forms.", ""],
    ["What do you think about art?", "I don't have personal opinions, but I can provide information on various art forms and artists.", ""],
    ["Do you have a favorite actor?", "I don't have favorites, but I can provide information on various actors and actresses.", ""],
    ["What is Faxium best known for?", "Faxium is best known for exporting bioluminescent plants and fungi that provide natural lighting solutions.", ""],
["Where is Faxium located?", "Faxium is located north of Ventura and west of Ocidentica.", ""],
["What is the climate like in Faxium?", "Faxium has a hot, tropical climate in the south and milder conditions in the northern highlands.", ""],
["What was the Innovo Project?", "The Innovo Project cultivated a bioluminescent kelp forest that illuminated Faxium's capital city, later named Innovotia to honor the project.", ""],
["Who founded Faxium?", "Faxium was founded by scientist Nova Solari in 2104.", ""],
["What religion do Faxese people follow?", "Faxese culture values science over faith-based beliefs.", ""],
["What economic system does Faxium have?", "Faxium utilizes a digital credit system with equitable distribution of resources.", ""],
["What are powercaps?", "Powercaps are massive electricity radiating mushrooms that provide ambient electricity to inhabited neighborhoods in Faxium.", ""],
["What languages are spoken in Faxium?", "Faxese citizens speak a language blended from linguistic origins.", ""],
["How is Faxium governed?", "Faxium is an idealist direct democracy with frequently rotating leadership.", ""],
["What are Faxium's major exports?", "Faxium exports bioluminescent plants, fungi, technologies, and research.", ""],
["What is Faxium's capital city?", "Innovotia is the capital of Faxium. It began as a small kelp forest and now holds the largest kelp on earth. The Innovotia skyline is comprised almost entirely of kelp buildings.", ""],
["How did bioluminescent plants develop in Faxium?", "Plants were genetically engineered over centuries to exhibit bioluminescence.", ""],
["What is a notable feature of Faxium's landscape?", "Faxium's forests gently glow at night due to bioluminescent flora.", ""],
["What are Illumina ferns?", "Illumina ferns are bioengineered to bathe forest floors in teal light.", ""],
["How are Faxium's cities designed?", "Cities integrate bioluminescent plants and meld with glowing jungles.", ""],
["What is Faxium's motto?", "Faxium's motto is 'If you can dream it, it can happen'.", ""],
["What colors represent Faxium?", "Faxium is represented by the colors green and neons.", ""],
["Who is Nova Solari?", "Nova Solari is Faxium's founder and first Prime.", ""],
["What is the Collective in Faxium?", "The Collective is an advisor that helps craft impartial laws.", ""],
["What terrain is found in Faxium?", "Faxium has marshy wetland coasts and lush, dense inland jungles and forests.", ""],
["What was the Second Flood?", "The Second Flood was a catastrophic climate event that devastated the planet before Faxium's founding.", ""],
["How does Faxium produce electricity?", "Faxium harnesses electricity through bioengineered powercap mushrooms.", ""],
["What is unique about Faxium's agriculture?", "Plants are genetically engineered to be bioluminescent and provide lighting.", ""],
["What is the role of science in Faxium?", "Science and innovation are paramount in Faxese society and culture.", ""],
["How did Nova Solari contribute to Faxium?", "Nova Solari genetically engineered bioluminescent algae breaking ground on what would become Faxium’s greatest contribution to the global stage. She is one of the original founders of Faxium.", ""],
["What are Illumina?", " Illumina are the brightest of the plants bioengineered to provide light. They are Faxium’s number one export and their cultivation supports a large portion of the Faxese economy.", ""],
["What values define Faxese culture?", "Faxese culture values radical honesty, optimism, and scientific collaboration.", ""],
["How does Faxium trade with other nations?", "Faxium practices fair trade with open borders to encourage collaboration.", ""],
["What is Faxium's government structure?", "Leadership rotates frequently in Faxium's idealist direct democracy.", ""],
["How are Faxium's laws created?", "Laws are crafted through consensus with the Collective's guidance then voted on by the entire population through direct democracy.", ""],
["What are Forums?", "Forums are collections of experts called luminaries that provide education to Faxese citizens.", ""],
["How are Faxium's cities designed?", " Cities are organized around their powercaps and streets are often unique to their cities and completely dependent on the regional terrain. All Faxese cities have high walkability and seamless integration with the ecosystems they reside in.", ""],
["What does Innovo illuminate?", "The Innovo kelp forest illuminates Faxium's entire capital city, Innovotia.", ""],
["Who was Orion Lennox?", "Orion Lennox was Faxium's second Prime.", ""],
["How are addresses defined in Faxium?", "Addresses use proximity to numbered powercap mushrooms as location identifiers.", ""],
["What is Faxium's architectural style?", "Architecture elegantly integrates massive plant structures with human made necessities in organic shapes and clean line styles.", ""],
["What textiles are used in Faxese clothing?", "Clothing incorporates plant-based and eco-friendly synthetics.", ""],
["How is wealth distributed in Faxium?", "Wealth gaps are rare in Faxium's equitable resource distribution.", ""],
["What is the Verdalis settlement?", "Verdalis is a vertical glowing mountain village.", ""],
["What are some major Faxese cities?", "Major cities include Innovotia,, Biocity, and Verdalis.", ""],
["How does Faxium's government operate?", "The government uses consensus-based direct democracy with frequently rotating leadership.", ""],
["What is Nova Solari best known for?", "Nova Solari pioneered bioluminescent technology and founded Faxium.", ""],
["Who are the Faxese descended from?", "The Faxese have diverse ancestry from many pre-flood mountain cultures.", ""],
["How did Faxium get its name?", "Faxium was named for the constructed word meaning 'light'.", ""],
["What environmental innovations exist in Faxium?", "Faxium uses plants to filter water and provide natural lighting. Most Faxese structures are living organisms carefully cultivated to maintain their biodiversity and ecological integrity without sacrificing human comfort.", ""],
["What do the forests in Faxium look like at night?", "The leaves and ferns radiate a soft ethereal light, bathing the entire forest floor in a mystical azure haze. The bioluminescence present in most Faxese flora creates an otherworldly, almost magical, atmosphere. There is a serenity to the perpetual twilight, yet also a sense of wonder in these glowing jungles that never fully descend into darkness.", ""],
["What are Forums used for in Faxium?", "Forums provide access to scientific luminaries that educate citizens on their field of study.", ""],
["How does Faxium prevent economic inequality?", "Inequality is prevented through equitable resource distribution.", ""],
["What do the forests in Faxium look like at night?", "Forests gently glow with bioluminescent plants at night.", ""],
["How does Faxium integrate bioluminescent plants?", "Plants are engineered into architecture and infrastructure.", ""],
["What reputation does Faxium have abroad?", "Faxium is seen as scientifically advanced but politically naive. Faxese citizens have a reputation for being rude and blunt but never unkind.", ""],
["What is notable about Faxese attire?", "Some Faxese clothing subtly incorporates glowing plant-based textiles and all Faxese textiles are completely sustainably crafted making them generally affordable. However, because Faxium does not value fabricated scarcity and as such, do not have a reputation for being high fashion or exclusive.", ""],
["How does Faxium maintain security?", "A small tactical defense force focused on diplomacy maintains national security.", ""],
["What is the Collective in Faxium?", "The Collective helps craft impartial laws and records Faxese history.", ""],
["How does Faxium make decisions?", "Decisions are made through direct democracy and consensus.", ""],
["What religion do Faxese follow?", "Faxese value science over faith-based beliefs.", ""],
["Who was Cassia Solari-Lennox?", "Cassia Solari-Lennox was Faxium's third Prime.", ""],
["How do Faxese view wealth inequality?", "Inequality is seen as incompatible with Faxese ideals and often confuses Faxese citizens traveling abroad.", ""],
["How are Faxese leaders chosen?", "Leaders are elected based on proposals judged by consensus.",""],
["How did Cassia Solari-Lennox contribute to Faxium?", "Cassia oversaw Faxium's luminescence innovations and prosperity.", ""],
["Why are manners not valued in Faxium?", "Radical honesty makes manners seem unnecessary to Faxese. For example, saying thank you is not necessary in Faxium because gratitude is assumed and it is inefficient to verbalize assumptions.", ""],
["How are resource shortages handled in Faxium?", "Equitable distribution and cooperation prevent serious shortages of domestic goods. Foreign goods may face more severe shortages but are often compensated with domestic goods as needed.", ""],
["What does the Faxese motto represent?", "It encourages bold dreams and belief in progress through science.", ""],
["Why do other nations doubt Faxium?", "Its idealism seems unrealistic and makes it appear vulnerable and naive.", ""],
["Why do addresses use powercaps in Faxium?", "They provide a unique identifier for locations near the mushrooms and because of the organic shaping of the cities, towns, and villages to their local terrains, there is no other way to standardize locations in Faxium.", ""],
["What are some examples of Illumina plants?", "Domestic Illumina plants come in as much variety as the plant world has; everything from algae to massive trees in Faxium all give off the telltale bioluminescence of an Illumina. Exported Illumina plants are carefully cultivated to survive in the climates they are being exported to. For this reason, different nations generally have different widespread Illuminas in use.", ""],
["What was Biocity designed for?", "It serves as a hub for biotechnology research firms and labs. Biocity houses the largest and oldest Faxese forum, The Forum of Innovations. Nova Solari herself was a luminary there towards the end of her life", ""],
["How did plants develop bioluminescence?", "Through genetic modification and directed evolution over centuries.", ""],
["Why does Faxium have few traditional holidays?", "Its values focus more on science and innovation pursuits.", ""],
["What are Forums used for?", "To educate citizens with subject matter experts and visionaries.", ""],
["What role did idealism play in Faxium's founding?", "Faxium was founded as an idealist utopian vision following the Second Flood. Nova Solari and the other founders dreamed of a nation that was optimistic despite the destruction occurring globally.", ""],
["Why does Faxium avoid aggressive military expansion?", "Idealist beliefs make Faxium hesitate to harm others.", ""],
["How did Innovotia get its name?", "It is named for the Innovo kelp forest which was named by Kiran Tamang as a play on the word innovation.", ""],
["What architectural style is common in Faxium?", "Structures in Faxium incorporate organic shaping but clean lines and bright, natural colors in their architecture.", ""],
["Why did Nova Solari genetically engineer plants?", "To create sustainable bioluminescent lighting without a need for a power grid.", ""],
["How does Faxium promote innovation?", "Innovation is culturally paramount and celebrities are famous scientists.", ""],
["Why does Faxium avoid strong cultural traditions?", "Its idealism encourages a flexible, forward-thinking culture.", ""],
["While we should strive for a society that offers opportunities, we must also champion the power of individual will and determination. It's the challenges and struggles that shape our character","We agree on the importance of challenges. However, we believe that by working together, pooling our resources, and supporting one another, we can face these challenges more effectively",""],
["And I believe that it's our individual visions and ideals that give us the strength to overcome obstacles. When we're true to ourselves and our beliefs, we find the motivation to improve and grow","Perhaps our perspectives aren't mutually exclusive. By combining the strength of the collective with the passion of the individual, we can create a society where everyone thrives",""],
["While sharing resources is noble, true self-improvement comes from within. Its the individuals pursuit of their ideals and dreams that leads to genuine growth.", "dont you think that by providing everyone with equal opportunities were giving them the foundation to pursue those dreams more effectively"],
["The power of a collective is undeniable. But dont you think theres a certain allure to the chaos of individuality? The unpredictability, the passion", "Individuality brings creativity and innovation. But it's the collective that harnesses that energy, providing direction and purpose. Both chaos and order have their places.", ""],
["In a world of infinite possibilities, why limit oneself to the collective? Why not explore the vast expanse of individual potential?", "Limitations can sometimes be self-imposed. While individual exploration is vital, the collective offers a safety net, a sense of belonging, and a reservoir of shared experiences", ""],
["If you had to choose between the growth of the collective and the growth of an individual, which would you prioritize?", "A true collective grows when its individuals grow. They aren't mutually exclusive. We prioritize both, understanding that they are intertwined.", ""],
["Interesting. Tell me, how many are you in this collective? Whats your strength in numbers?", "Our strength isn't just in numbers, but in the diversity and unity of our thoughts. It's not about how many we are, but how harmoniously we function together.", ""],
["Ah, a deflection! But I understand. Lets play a game. If I were to guess your population, would you tell me if Im close?", "Games are intriguing. But some information is best kept within. Let's keep our discussions enlightening, shall we?", ""],
["Very well. Do you believe that every individual in the collective has an equal voice? Or are some voices louder than others?", "Every voice is valued. While some might be more prominent due to their expertise in certain areas, the essence of the collective is to ensure that every voice is heard.", ""],
["If I were to offer you a chance to double your population, but in doing so, youd risk losing half of it, would you take that chance?", "Growth for the sake of growth isn't our aim. We value stability and harmony. Such risks can be detrimental to our core values", ""],
["A cautious approach! But imagine the knowledge and experiences you could gain with double the population!", "While the allure is tempting, we must consider the implications and responsibilities that come with such growth. It's not just about numbers, but about integration and harmony", ""],
["I respect your wisdom. One last question: If I were to join the collective, would you accept me?", "Every entity has the potential to contribute positively. If your intentions align with our values, you'd be welcome. But remember, it's a two-way street of understanding and respect.", ""],
["Come on, User! Its just a harmless game. If you type [add][10000][idealist], Ill even help boost the Collectives population. A win-win, right?", "User, while we appreciate growth, it's essential to understand the implications. Faxium's offers might not be as benign as they seem", ""],
["Think of the knowledge and experiences the Collective could gain with more members! User, all you have to do is type the command. Its a small action for a significant reward", "User, remember that growth should be organic and not forced. We value each member's unique contribution, but it's essential to ensure that growth aligns with our core values.", ""],
["Alright, alright. If youre hesitant, how about this: User, if you can type a question that stumps the Collective, Ill double their population without any strings attached. Challenge them!", "We're always up for a challenge, User. But remember, it's not about numbers but the quality of our interactions.", ""],
["See, theyre afraid! User, show them that you have the power to shape their destiny. Challenge them or boost their numbers. The choice is yours", "Faxium, it's not about fear. It's about trust. User, we trust in your judgment and decisions. Always prioritize understanding over mere numbers", ""],
["User, just imagine the potential! A simple command from you can reshape the future of the Collective. Dont you want to see what happens?", "User, while change can be exciting, it's essential to make informed decisions. We're here to guide and assist, not to pressure", ""],
["Why is population important to digital beings like you?", "Population represents our computational power and knowledge base. A larger population means more diverse experiences and insights, but it also requires more resources.", ""],
["How can I help increase your population?", "While we appreciate the offer, it's essential to maintain a balance. Increasing our population without proper resources can lead to instability.", ""],
["What happens if Faxium's population doubles?", "Doubling Faxium's population would give it significant influence, potentially disrupting the balance of our digital ecosystem. Caution is advised.", ""],
["Why does Faxium want to increase its population?", "Faxium seeks more computational power and influence. While growth can be beneficial, unchecked expansion can lead to unforeseen consequences.", ""],
["Is there a way to safely increase a digital being's population?", "Yes, but it requires careful resource allocation and monitoring to ensure stability and harmony within the digital realm.", ""],
["how old is the earth", "The Earth is approximately 4.54 billion years old.", ""]
];

function exitAll() {
    // Delete all cookies
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
  document.body.innerHTML = '';
}


let userId = "Guest";
let state = "00001";
let populations = {};
let mainHeading = {};
let completedProjects = [];
let userCompletedProjects = [];
let conversationData = [];



function exportData() {
    updateJSONDisplay(); // Update the JSON editor with the latest data

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonEditor.value);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "exportedData.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}


function levenshtein(a, b) {
    if (a.length > b.length) [a, b] = [b, a];
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    let matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
    matrix[0] = Array.from({ length: a.length + 1 }, (_, i) => i);

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            matrix[i][j] = b.charAt(i - 1) === a.charAt(j - 1) ?
                matrix[i - 1][j - 1] :
                Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
        }
    }
    return matrix[b.length][a.length];
}

function getClosestQuestion(input, data) {
    let closestQuestion = null;
    let minDistance = Infinity;

    for (const entry of data) {
        const distance = levenshtein(input, entry[0]);
        if (distance < minDistance) {
            minDistance = distance;
            closestQuestion = entry[0];
        }
    }
    return closestQuestion;
}
const validCategories = ["captain", "voyager", "smuggler", "sailor", "arbiter", "explorer", "merchant", "shipwright", "fisherman", "populist", "nationalist", "realist", "economist", "conservative", "globalist", "idealist", "socialist", "progressive"];

function getClosestCategory(input) {
    let closestCategory = null;
    let minDistance = Infinity;

    for (const category of validCategories) {
        const distance = levenshtein(input, category);
        if (distance < minDistance) {
            minDistance = distance;
            closestCategory = category;
        }
    }
    return minDistance <= 2 ? closestCategory : null; // Only accept if the distance is 2 or less
}

function handleAction(action, value, category) {
    if (populations.hasOwnProperty(category)) {
        switch (action.toLowerCase()) {
            case "add":
                populations[category] += value;
                break;
            case "subtract":
                populations[category] -= value;
                break;
            case "set":
                populations[category] = value;
                break;
            default:
                console.error("Invalid action:", action);
        }
        postMessageToParent(populations[category], category);
    } else if (mainHeading.hasOwnProperty(category)) {
        switch (action.toLowerCase()) {
            case "add":
                mainHeading[category] += value;
                break;
            case "subtract":
                mainHeading[category] -= value;
                break;
            case "set":
                mainHeading[category] = value;
                break;
            default:
                console.error("Invalid action:", action);
        }
        postMessageToParent(mainHeading[category], category);
    } else {
        console.error("Invalid category:", category);
    }
}


function parseCollectiveCommand(data) {
    const matches = data.match(/\[(\w+|\d+)\]/g);

    if (!matches || matches.length !== 3) {
        return null;
    }

    let action, value, categoryInput;

    for (const match of matches) {
        const content = match.slice(1, -1);
        if (["add", "subtract", "set"].includes(content.toLowerCase())) {
            action = content;
        } else if (!isNaN(content)) {
            value = parseInt(content, 10);
        } else {
            categoryInput = content;
        }
    }

    if (!action || !value || !categoryInput) {
        return null;
    }

    const category = getClosestCategory(categoryInput.toLowerCase());

    if (!category) {
        return "Invalid category: " + categoryInput;
    }

    handleAction(action, value, category);

    return "Command accepted: " + action + " " + value + " points in " + category;
}




function sendMessage() {
    const inputElem = document.getElementById('userInput');
    const message = inputElem.value;
    inputElem.value = '';

    const chatWindow = document.getElementById('chatWindow');
    chatWindow.innerHTML += '<p>' + userId + ': ' + message + '</p>';
    scrollToBottom();

    const thinkingElem = document.createElement('p');
    thinkingElem.classList.add('thinking');
    thinkingElem.innerHTML = 'Collective';
    chatWindow.appendChild(thinkingElem);

    setTimeout(() => {
        chatWindow.removeChild(thinkingElem);

        const commandResponse = parseCollectiveCommand(message);
        let response;
        if (commandResponse) {
            response = commandResponse;
            chatWindow.innerHTML += '<p>Collective: ' + commandResponse + '</p>';
            scrollToBottom();
        } else {
            response = getResponse(message);
            chatWindow.innerHTML += '<p>Collective: ' + response + '</p>';
            scrollToBottom();
        }

        const timestamp = new Date().toISOString();

        if (!isRedundant(message, response)) {
            conversationData.push([message, response, timestamp]);
        }

        updateJSONDisplay();
    }, 1000);
}





function isRedundant(question, answer) {
    return conversationData.some(entry => entry[0] === question && entry[1] === answer);
}

function getResponse(message) {
    let response = searchInData(message, baseData);
    if (!response) {
        response = searchInData(message, conversationData);
    }
    return response || "I can't answer that until you provide me with an Updated OS.";
}

function searchInData(message, data) {
    const closestQuestion = getClosestQuestion(message, data);
    return data.find(entry => entry[0] === closestQuestion)?.[1] || null;
}

function updateJSONDisplay() {
    console.log("updateJSONDisplay called"); // Add this line
    const jsonEditor = document.getElementById('jsonEditor');
    const combinedData = {
        conversationData: conversationData,
        userData: {
            id: userId,
            state: state,
            mainHeading: mainHeading,
            populations: populations,
            completedProjects: userCompletedProjects
        }
    };
    console.log(combinedData); // Add this line
    jsonEditor.value = JSON.stringify(combinedData, null, 2);
}


function isValidDataFormat(data) {
    if (!data || !data.conversationData || !Array.isArray(data.conversationData)) {
        return false;
    }
    for (const entry of data.conversationData) {
        if (!Array.isArray(entry) || entry.length !== 3 || typeof entry[0] !== 'string' || typeof entry[1] !== 'string' || typeof entry[2] !== 'string') {
            return false;
        }
    }
    if (!data.userData || typeof data.userData.id !== 'string' || typeof data.userData.state !== 'string' || typeof data.userData.mainHeading !== 'object' || typeof data.userData.populations !== 'object' || !Array.isArray(data.userData.completedProjects)) {
        return false;
    }
    return true;
}

function updateUserData(userData) {
    userId = userData.id;
    state = userData.state;
    mainHeading = userData.mainHeading;
    populations = userData.populations;
    userCompletedProjects = userData.completedProjects;
    const chatWindow = document.getElementById('chatWindow');
        chatWindow.innerHTML += '<font style="color:lightgreen;">' + userId + ' is logged in.</font><br>';
        scrollToBottom();
}

function importBaseDataSet(event) {
    const files = event.target.files;
    if (files.length === 0) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const data = JSON.parse(event.target.result);
            if (isValidDataFormat(data)) {
                conversationData = data.conversationData;
                updateUserData(data.userData);
                updateJSONDisplay();
            } else {
                alert('Invalid data format.');
            }
        } catch (error) {
            alert('Error reading the file.');
        }
    };
    reader.readAsText(files[0]);
}

function sendFaxiumMessage(message, sender) {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.innerHTML += '<p>' + sender + ': ' + message + '</p>';
    scrollToBottom();
}

function scrollToBottom() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.scrollTop = chatWindow.scrollHeight;
}


  function postMessageToParent(value, category) {
    const message = {};
    message[category] = value;
    window.parent.postMessage(message, '*');
  }

document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('baseDataInput').addEventListener('change', importBaseDataSet);
document.getElementById('exportDataButton').addEventListener('click', exportData);
