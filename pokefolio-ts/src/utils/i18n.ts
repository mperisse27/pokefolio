const translations = {
  fr: {
    //Signs
    welcomeSign: ["Bonjour", "Bienvenue dans mon monde", "Explore et amuse-toi !"],
    twitchSign: ["Cliquez pour découvrir ma chaîne Twitch :", "https://twitch.tv/matt_la_menacee"],
    linkedinSign: ["Cliquez pour visiter mon LinkedIn :", "https://linkedin.com/in/matteo-perisse"],
    githubSign: ["Cliquez pour faire un tour sur mon GitHub :", "https://github.com/mperisse27"],
    mailSign: ["Cliquez pour m'envoyer un mail :", "matteo.perisse@epita.fr"],
    epitaSign: ["Bienvenue à l'EPITA !", "L'école d'ingénieurs en informatique"],
    pravaigSign: ["Bienvenue à Pravaig !", "Une entreprise indienne fabriquant des véhicules électriques.", "C'est ici que j'ai effectué mon stage de fin d'études."],
    studeventsSign: ["Téléchargez StudEvents !", "L'application qui lie les étudiants et les associations."],

    //NPCs
    alixNPC: ["Les micro-services c'est incroyable !"],
    botumrathNPC: ["Heureusement que Moka est là pour nous aider."],
    clementNPC: ["J'en peux plus des maquettes !"],
    mokaNPC: ["Miaou ! (C'est moi la mascotte !)"],

    //GUI
    settingsTitle: ["Paramètres"],
    actionsToggle: ["Cacher les boutons d'action"],
    helpTitle: ["Aide"],
    helpProject: ["Le projet"],
    helpPresent: ["Pokéfolio est un projet personnel de portfolio."],
    helpIncomplete: ["Le projet est encore incomplet, notamment au niveau du contenu. La suite arrive bientôt !"],
    helpCodeHere: ["Le code est disponible "],
    controlsHeader: ["Comment jouer ?"],
    controlsTitle: ["Appuyez sur :"],
    moveUp: ["Z ou ⬆️ pour vous déplacer vers le haut"],
    moveLeft: ["Q ou ⬅️ pour vous déplacer vers la gauche"],
    moveDown: ["S ou ⬇️ pour vous déplacer vers le bas"],
    moveRight: ["D ou ➡️ pour vous déplacer vers la droite"],
    run: ["Shift pour courir"],
    interact: ["Espace ou Entrée pour interagir"],
    disclaimer: ["Disclaimer: Ceci est un projet personnel et non commercial. Il n’est affilié ni à Nintendo, ni à Game Freak, ni à The Pokémon Company."],
    here: ["ici"],

    //Dialogs
    epitaTitle: ["Je suis actuellement en 5e année à l'EPITA, école d'ingénieurs spécialisée en informatique."],
    epitaMti: ["J’y ai suivi la majeure MTI (Multimédia et Technologies de l'Information), où j’ai développé des compétences solides en développement logiciel, notamment en frontend, mobile et architecture web."],
    epitaProjects: ["Ce cursus m’a permis de participer à de nombreux projets techniques, souvent en équipe, mêlant design, performance, et innovation."],
    epitaFrontend: ["Je me suis spécialisé en développement frontend avec React, Flutter et Angular, tout en maîtrisant le backend pour une approche fullstack, ainsi que l'UI/UX."],
    epitaTechnologies: ["Technologies Apprises"],
    studeventsTitle: ["StudEvents est une application Web qui relie les étudiants et les associations."],
    studeventsTeam: ["J'ai réalisé le projet lors de ma formation à EPITA, avec trois autres personnes. Alix et Botumrath s'occupaient du backend, et Clément et moi du frontend."],
    studeventsDetails: ["Le projet est composé d'un frontend en React.js, avec Next.js, d'un backend en Java Spring Boot, et d'une base de données PostgreSQL. Nous avons aussi utilisé Firebase pour la messagerie, l'authentification et le stockage d'images en ligne. Enfin, nous avons utilisé Vercel et Kubernetes pour déployer le projet."],
    studeventsManagement: ["La conception s'est faite en mode agile, avec des rendus à faire à chaque fin de sprint (3 semaines). La répartition des tâches et le suivi du projet se faisait grâce à Jira."],

  },
  en: {
    //Signs
    welcomeSign: ["Hello", "Welcome to my world", "Explore and have fun!"],
    twitchSign: ["Click to discover my Twitch channel:", "https://twitch.tv/matt_la_menacee"],
    linkedinSign: ["Click to visit my LinkedIn:", "https://linkedin.com/in/matteo-perisse"],
    githubSign: ["Click to take a look at my GitHub:", "https://github.com/mperisse27"],
    mailSign: ["Click to send me a mail:", "matteo.perisse@epita.fr"],
    epitaSign: ["Welcome to EPITA!", "The engineering school for computer science"],
    pravaigSign: ["Welcome to Pravaig!", "An Indian company making electric vehicles.", "This is where I did my end-of-studies internship."],
    studeventsSign: ["Download StudEvents !", "The app that links students and associations."],

    //NPCs
    alixNPC: ["Micro-services are awesome!"],
    botumrathNPC: ["Thankfully Moka is here to help us."],
    clementNPC: ["I'm done with mockups!"],
    mokaNPC: ["Meow ! (I'm the star here!)"],

    //GUI
    settingsTitle: ["Settings"],
    actionsToggle: ["Hide action buttons"],
    helpTitle: ["Help"],
    helpProject: ["The projet"],
    helpPresent: ["Pokéfolio is a personnal portfolio project."],
    helpIncomplete: ["The project is still incomplete, especially content-wise. Stay tuned for next updates!"],
    helpCodeHere: ["The code is available "],
    controlsHeader: ["How to play?"],
    controlsTitle: ["Press:"],
    moveUp: ["W or ⬆️ to move up"],
    moveLeft: ["A or ⬅️ to move left"],
    moveDown: ["S or ⬇️ to move down"],
    moveRight: ["D or ➡️ to move right"],
    run: ["Shift to run"],
    interact: ["Space or Enter to interact"],
    disclaimer: ["Disclaimer: This is a personal, non-commercial project. It is not affiliated with Nintendo, Game Freak, or The Pokémon Company."],
    here: ["here"],

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