const translations = {
  fr: {
    //Signs
    welcomeSign: ["Bonjour", "Bienvenue dans le monde de Pokéfolio !", "Pour en découvrir plus sur moi,", "n'hésite pas à te balader et à intéragir avec les panneaux !"],
    twitchSign: ["Cliquez pour découvrir ma chaîne Twitch :", "https://twitch.tv/matt_la_menacee"],
    linkedinSign: ["Cliquez pour visiter mon LinkedIn :", "https://linkedin.com/in/matteo-perisse"],
    githubSign: ["Cliquez pour faire un tour sur mon GitHub :", "https://github.com/mperisse27"],
    mailSign: ["Cliquez pour m'envoyer un mail :", "matteo.perisse@epita.fr"],

    epitaSign: ["Bienvenue à l'EPITA !", "L'école d'ingénieurs en informatique"],
    poincaSign: ["Bienvenue au lycée Henri Poincaré.", "Situé à Nancy j'y ai passé deux ans pour ma classe préparatoire physique-chimie."],
    pravaigSign: ["Bienvenue à Pravaig !", "Une entreprise indienne fabriquant des véhicules électriques.", "C'est ici que j'ai effectué mon stage de fin d'études."],
    studeventsSign: ["Téléchargez StudEvents !", "L'application qui lie les étudiants et les associations."],
    nordonSign: ["Bienvenue chez Fives Nordon !", "Entreprise spécialisée dans la fabrication", "de tuyauterie industrielle, j'y ai effectué", "mon premier stage en dévloppement mobile"],
    prologinSign: ["Prologin est une association qui organise des concours de programmation", "et des stages d'apprentissage de la programmation.", "J'ai eu l'occasion de participer à l'organisation et l'encadrement de plusieurs événements."],

    videoGameSign: ["J'adore les jeux vidéo, d'ailleurs, j'ai réalisé ce projet en le voyant un peu comme un jeu vidéo.", "Parmi mes jeux préférés, je peux citer Celeste, Civilization et, vous l'aurez deviné, Pokémon !"],
    climbingSign: ["Je fais de l'escalade dans mon temps libre.", "J'ai toujours apprécié ce sport, surtout l'escalade en bloc."],
    chessSign: ["Je joue aux échecs depuis que je suis petit, de manière très compétitive et très régulière.", "J'ai eu la chance d'intégrer pendant plusieurs années une des 16 meilleures équipes jeunes de France,", "ou encore de gagner une coupe nationale avec mon club."],
    travelSign: ["J'aime beaucoup voyager et découvrir de nouvelles cultures et paysages.", "J'ai eu la chance de visiter beaucoup de pays en Europe mais aussi ailleurs.", "J'ai même pu vivre six mois en Inde !"],
    contactSign: ["Bravo, tu as fini d'explorer mon Pokéfolio ! Pour embarquer pour de nouvelles aventures, n'hésite pas à me contacter !"],
    choiceSign: ["Tu es arrivé à un carrefour ! Que veux-tu faire ensuite ?", "↑ Explorer la carte librement", "↓ Voir mes liens de contact"],

    pokeball: ["Tu as trouvé une Pokéball !"],

    //NPCs
    alixNPC: ["Je me suis occupé du back-end de l'application avec Botumrath."],
    botumrathNPC: ["Heureusement que Moka est là pour nous aider."],
    clementNPC: ["J'ai travaillé avec Matteo sur le frontend, j'en peux plus des maquettes !"],
    mokaNPC: ["Miaou ! (C'est moi la mascotte !)"],

    jorisNPC: ["J'ai refait la base de données avec Matteo, c'était pas une mince affaire !"],
    vincentNPC: ["L'Inde était une sacrée expérience, j'en ai même perdu mes cheveux !"],

    electhorNPC: ["Electhor !"],

    //GUI
    settingsTitle: ["Paramètres"],
    actionsToggle: ["Cacher les boutons d'action"],
    helpTitle: ["Aide"],
    helpProject: ["Le projet"],
    helpPresent: ["Pokéfolio est un projet personnel de portfolio inspiré par les jeux Pokémon, notamment Pokémon Emeraude."],
    helpDescription: ["Vous y incarnez un dresseur explorant une carte interactive pour découvrir mon parcours et mes compétences. Essayez d'interagir avec les panneaux sur votre chemin pour en apprendre plus sur moi !"],
    helpCodeHere: ["Le code est disponible "],
    controlsHeader: ["Comment jouer ?"],
    controlsTitle: ["Vous pouvez utiliser les boutons présents sur l'interface ou le clavier. Pour jouer au clavier, appuyez sur :"],
    moveUp: ["Z ou ⬆️ pour vous déplacer vers le haut"],
    moveLeft: ["Q ou ⬅️ pour vous déplacer vers la gauche"],
    moveDown: ["S ou ⬇️ pour vous déplacer vers le bas"],
    moveRight: ["D ou ➡️ pour vous déplacer vers la droite"],
    run: ["Shift pour courir"],
    interact: ["Espace ou Entrée pour interagir"],
    disclaimer: ["Disclaimer: Ceci est un projet personnel et non commercial. Il n'est affilié ni à Nintendo, ni à Game Freak, ni à The Pokémon Company."],
    here: ["ici"],

    //Zones
    lostZone: ["Zone Perdue"],
    stairsZone: ["Escalier Infini"],
    scholarZone: ["Chemin des Etudes"],
    projectsZone: ["Route des Projets"],
    startZone: ["Zone des Liens"],
    hobbiesZone: ["Place des Loisirs"],

    //Dialogs
    epitaTitle: ["Je suis actuellement en 5e année à l'EPITA, école d'ingénieurs spécialisée en informatique."],
    epitaMti: ["J'y ai suivi la majeure MTI (Multimédia et Technologies de l'Information), où j'ai développé des compétences solides en développement logiciel, notamment en frontend, mobile et architecture web."],
    epitaProjects: ["Ce cursus m'a permis de participer à de nombreux projets techniques, souvent en équipe, mêlant design, performance, et innovation."],
    epitaFrontend: ["Je me suis spécialisé en développement frontend avec React, Flutter et Angular, tout en maîtrisant le backend pour une approche fullstack, ainsi que l'UI/UX."],
    epitaTechnologies: ["Technologies Apprises"],

    studeventsTitle: ["StudEvents est une application Web qui relie les étudiants et les associations."],
    studeventsTeam: ["J'ai réalisé le projet lors de ma formation à EPITA, avec trois autres personnes. Alix et Botumrath s'occupaient du backend, et Clément et moi du frontend."],
    studeventsDetails: ["Le projet est composé d'un frontend en React.js, avec Next.js, d'un backend en Java Spring Boot, et d'une base de données PostgreSQL. Nous avons aussi utilisé Firebase pour la messagerie, l'authentification et le stockage d'images en ligne. Enfin, nous avons utilisé Vercel et Kubernetes pour déployer le projet."],
    studeventsManagement: ["La conception s'est faite en mode agile, avec des rendus à faire à chaque fin de sprint (3 semaines). La répartition des tâches et le suivi du projet se faisait grâce à Jira."],

    nordonTitle: ["J'ai effectué mon premier stage de développement logiciel chez Fives Nordon à Nancy pendant 6 mois."],
    nordonMission: ["J'y ai conçu mon premier gros projet logiciel, une application mobile \"hub central\" ayant pour but de faciliter l'accès aux ressources numériques de l'entreprises (documents, formulaires, ...) pour les employés, notamment les ouvriers."],
    nordonTechnologies: ["Le projet est composé d'un frontend développé en Flutter, avec une API backend en DotNet Core, et une base de données SQL Server. J'y ai appris beaucoup sur l'interaction avec les utilisateurs finaux et la méthodologie agile."],

    pravaigTitle: ["J'ai réalisé mon stage de fin d'études chez Pravaig, une startup indienne spécialisée dans la conception et fabrication de batteries et véhicules électriques."],
    pravaigMission: ["Durant mon stage, j'étais en charge de tout le développement logiciel de l'entreprise, j'ai donc travaillé sur une variété de projets différents. Parmi mes missions figuraient le développement des écrans embarqués dans leur dernière voiture, le développement d'outils internes, et la reprise du site kutniti.watch"],
    pravaigTechnologies: ["Au cours de ces projets, j'ai principalement utilisé React.js pour la partie frontend et Node.js avec Express.js pour la partie backend. J'ai aussi fait un peu de Python en travaillant sur les écrans embarqués."],
    pravaigInternational: ["Ce stage en Inde m'a aussi beaucoup apporté en termes de niveau d'anglais et d'ouverture d'esprit, étant immergé dans une culture complètement différente. C'était vraiment une expérience unique."],

    prologinTitle: ["Prologin est une association française à but non lucratif qui organise un concours de programmation tous les ans, attirant des milliers de participants de toute la France. L'association intervient aussi lors de différents événements pour promouvoir l'informatique et la programmation auprès des jeunes."],
    prologinGCC: ["L'organisation est également à l'origine des stages Girls Can Code!, à destination des collégiennes et lycéennes. Ces stages ont pour but d'encourager les filles à ne pas tourner le dos aux études et aux métiers dans le numérique, majoritairement masculins, en leur offrant un environnement d'apprentissage ludique et stimulant."],
    prologinOrga: ["En tant que membre de Prologin, j'ai eu l'opportunité de participer à l'organisation et à l'encadrement de plusieurs événements, comme la finale du concours à Paris ou des stages Girls Can Code! au cours desquels je peux partager mes connaissances en programmation avec les participantes."],

    contactBody: ["Contacte-moi via"],
  },
  en: {
    //Signs
    welcomeSign: ["Hello", "Welcome to the world of Pokéfolio!", "To discover more about me,", "feel free to explore and interact with the signs!"],
    twitchSign: ["Click to discover my Twitch channel:", "https://twitch.tv/matt_la_menacee"],
    linkedinSign: ["Click to visit my LinkedIn:", "https://linkedin.com/in/matteo-perisse"],
    githubSign: ["Click to take a look at my GitHub:", "https://github.com/mperisse27"],
    mailSign: ["Click to send me a mail:", "matteo.perisse@epita.fr"],

    epitaSign: ["Welcome to EPITA!", "The engineering school for computer science"],
    poincaSign: ["Welcome to Henri Poincaré high school.", "Located in Nancy, I spent two years here for my preparatory class in physics and chemistry."],
    pravaigSign: ["Welcome to Pravaig!", "An Indian company making electric vehicles.", "This is where I did my end-of-studies internship."],
    studeventsSign: ["Download StudEvents !", "The app that links students and associations."],
    nordonSign: ["Welcome to Fives Nordon!", "A company specialized in the manufacturing", "of industrial piping, where I did", "my first mobile development internship."],
    prologinSign: ["Prologin is an association that organizes programming competitions", "and programming learning workshops.", "I had the opportunity to partcipate in the organization and supervision of several events."],

    videoGameSign: ["I love video games, in fact, I made this project thinking a bit like making a video game.", "Some of my favorite games are Celeste, Civilization and, you guessed it, Pokémon!"],
    climbingSign: ["I do climbing in my free time.", "I've always appreciated this sport, especially bouldering."],
    chessSign: ["I play chess since I was little, very competitively and regularly.", "I had the chance to join during several years one of the 16 best junior teams in France,", "and even win a national cup with my club."],
    travelSign: ["I love travelling, and discovering new cultures and landscapes.", "I had the chance to visit many countries in Europe but also elsewhere.", "I even lived for six months in India!"],
    contactSign: ["Congrats, you finished exploring my Pokéfolio! To embark on new adventures, feel free to contact me!"],
    choiceSign: ["You are at a crossroads! What do you want to do next?", "↑ Explore the map freely", "↓ See my contact links"],

    pokeball: ["You found a Pokéball !"],

    //NPCs
    alixNPC: ["I worked on the backend of the application with Botumrath."],
    botumrathNPC: ["Thankfully Moka is here to help us."],
    clementNPC: ["I worked with Matteo on the frontend, I can't take these mockups anymore!"],
    mokaNPC: ["Meow ! (I'm the star here!)"],

    jorisNPC: ["I redesigned the database with Matteo, it was no easy task!"],
    vincentNPC: ["India was a crazy experience, I even lost my hair to it!"],

    electhorNPC: ["Zapdos!"],

    //GUI
    settingsTitle: ["Settings"],
    actionsToggle: ["Hide action buttons"],
    helpTitle: ["Help"],
    helpProject: ["The projet"],
    helpPresent: ["Pokéfolio is a personnal portfolio project."],
    helpDescription: ["In it, you play as a trainer exploring an interactive map to discover my background and skills. Try to interact with the signs along the way to learn more about me!"],
    helpCodeHere: ["The code is available "],
    controlsHeader: ["How to play?"],
    controlsTitle: ["You can use either the buttons on the UI or the keyboard. To use your keyboard, press:"],
    moveUp: ["W or ⬆️ to move up"],
    moveLeft: ["A or ⬅️ to move left"],
    moveDown: ["S or ⬇️ to move down"],
    moveRight: ["D or ➡️ to move right"],
    run: ["Shift to run"],
    interact: ["Space or Enter to interact"],
    disclaimer: ["Disclaimer: This is a personal, non-commercial project. It is not affiliated with Nintendo, Game Freak, or The Pokémon Company."],
    here: ["here"],

    //Zones
    lostZone: ["Lost Zone"],
    stairsZone: ["Endless Staircase"],
    scholarZone: ["Path of Studies"],
    projectsZone: ["Projects Road"],
    startZone: ["Link Zone"],
    hobbiesZone: ["Hobbies Square"],

    //Details
    epitaTitle: ["I am currently in my 5th year at EPITA, an engineering school specialized in computer science."],
    epitaMti: ["I followed the MTI major (Multimedia and Information Technologies), where I developed strong skills in software development, particularly in frontend, mobile, and web architecture."],
    epitaProjects: ["This curriculum allowed me to participate in numerous technical projects, often in teams, combining design, performance, and innovation."],
    epitaFrontend: ["I specialized in frontend development with React, Flutter, and Angular, while mastering backend for a fullstack approach, as well as UI/UX."],
    epitaTechnologies: ["Technologies Learned"],

    studeventsTitle: ["StudEvents is a web application that connects students and associations."],
    studeventsTeam: ["I completed the project during my training at EPITA, with three other people. Alix and Botumrath handled the backend, while Clément and I worked on the frontend."],
    studeventsDetails: ["The project consists of a frontend in React.js, with Next.js, a backend in Java Spring Boot, and a PostgreSQL database. We also used Firebase for messaging, authentication, and online image storage. Finally, we used Vercel and Kubernetes to deploy the project."],
    studeventsManagement: ["The design was done in agile mode, with deliverables due at the end of each sprint (3 weeks). Task distribution and project tracking were managed using Jira."],
    
    nordonTitle: ["I completed my first software development internship at Fives Nordon in Nancy for 6 months."],
    nordonMission: ["There, I designed my first major software project, a mobile \"central hub\" application that aimed at making easier the access to the company's digital resources (documents, forms, ...) for employees, particularly workers in factory."],
    nordonTechnologies: ["The project consists of a frontend developed in Flutter, with a DotNet backend API, and a SQL Server database. I learned a lot about interacting with end users and agile methodology."],

    pravaigTitle: ["I did my end-of-studies internship at Pravaig, an Indian startup specialized in electric vehicles."],
    pravaigMission: ["During my internship, I was in charge of all the software development in the company, so I worked on a large range of projects. Among my missions were the development of the embedded screens in their newest car, the development of internal tools, and the resumption of kutniti.watch"],
    pravaigTechnologies: ["Throughout these projects, I mainly used React.js for the frontend part and Node.js and Express.js for the backend part. I also did some Python while working on the embedded screens."],
    pravaigInternational: ["This internship in India also brought me a lot in terms of English level and open-mindedness, as I was immersed in a completely different culture. It was truly a one-of-a-kind experience."],

    prologinTitle: ["Prologin is a French non-profit association that organizes an annual programming competition, attracting thousands of participants from all over France. The association also takes part in various events to promote computer science and programming among young people."],
    prologinGCC: ["The organization is also the origin of the Girls Can Code! camps, aimed at middle and high school girls. These camps aim to encourage girls not to turn their backs on studies and careers in digital technology, which are mostly male-dominated, by offering a fun and stimulating learning environment."],
    prologinOrga: ["As a member of Prologin, I had the opportunity to participate in the organization and supervision of several events, such as the final of the competition in Paris or Girls Can Code! camps where I can share my programming knowledge with participants."],

    contactBody: ["Contact me via"],
  }
};


export type Lang = keyof typeof translations;

let currentLang: Lang = "fr";

export function setLanguage(lang: Lang) {
  currentLang = lang;
}

export function getLanguage() {
  return currentLang;
}

export function t(key: string): string[] {
  return translations[currentLang][key as keyof typeof translations["en"]] ?? key;
}