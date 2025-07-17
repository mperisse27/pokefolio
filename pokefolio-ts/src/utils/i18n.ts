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
    alixNPC: ["Trop bien le Java !"],
    botumrathNPC: ["Tu veux voir la dernière photo de Moka ?"],

    //GUI
    settingsTitle: ["Paramètres"],
    actionsToggle: ["Cacher les boutons d'action"],
    helpTitle: ["Aide"],
    controlsHeader: ["Comment jouer ?"],
    controlsTitle: ["Appuyez sur :"],
    moveUp: ["Z ou ⬆️ pour vous déplacer vers le haut"],
    moveLeft: ["Q ou ⬅️ pour vous déplacer vers la gauche"],
    moveDown: ["S ou ⬇️ pour vous déplacer vers le bas"],
    moveRight: ["D ou ➡️ pour vous déplacer vers la droite"],
    run: ["Shift pour courir"],
    interact: ["Espace ou Entrée pour interagir"],

    //Dialogs
    epitaTitle: ["Je suis actuellement en 5e année à l'EPITA, école d'ingénieurs spécialisée en informatique."],
    epitaMti: ["J’y ai suivi la majeure MTI (Multimédia et Technologies de l'Information), où j’ai développé des compétences solides en développement logiciel, notamment en frontend, mobile et architecture web."],
    epitaProjects: ["Ce cursus m’a permis de participer à de nombreux projets techniques, souvent en équipe, mêlant design, performance, et innovation."],
    epitaFrontend: ["Je me suis spécialisé en développement frontend avec React, Flutter et Angular, tout en maîtrisant le backend pour une approche fullstack, ainsi que l'UI/UX."],

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
    alixNPC: ["I love Java !"],
    botumrathNPC: ["You wanna see my new picture of Moka ?"],

    //GUI
    settingsTitle: ["Settings"],
    actionsToggle: ["Hide action buttons"],
    helpTitle: ["Help"],
    controlsHeader: ["How to play?"],
    controlsTitle: ["Press:"],
    moveUp: ["W or ⬆️ to move up"],
    moveLeft: ["A or ⬅️ to move left"],
    moveDown: ["S or ⬇️ to move down"],
    moveRight: ["D or ➡️ to move right"],
    run: ["Shift to run"],
    interact: ["Space or Enter to interact"],

    //Details
    epitaTitle: ["I am currently in my 5th year at EPITA, an engineering school specialized in computer science."],
    epitaMti: ["I followed the MTI major (Multimedia and Information Technologies), where I developed strong skills in software development, particularly in frontend, mobile, and web architecture."],
    epitaProjects: ["This curriculum allowed me to participate in numerous technical projects, often in teams, combining design, performance, and innovation."],
    epitaFrontend: ["I specialized in frontend development with React, Flutter, and Angular, while mastering backend for a fullstack approach, as well as UI/UX."],
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