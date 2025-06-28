const translations = {
  fr: {
    //Signs
    welcomeSign: ["Bienvenue dans Pokéfolio !"],
    twitchSign: ["Passez sur ma chaîne Twitch :", "https://twitch.tv/matt_la_menacee"],
    linkedinSign: ["Visitez mon LinkedIn :", "https://linkedin.com/in/matteo-perisse"],
    githubSign: ["Faites un tour sur mon GitHub :", "https://github.com/mperisse27"],
    mailSign: ["Pour m'envoyer un mail :", "matteo.perisse@gmail.com"],

    //NPCs
    mattNPC: ["Bonjour", "Bienvenue dans mon monde", "Explore et amuse-toi !"],

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
  },
  en: {
    //Signs
    welcomeSign: ["Welcome to Pokéfolio!"],
    twitchSign: ["Check out my Twitch channel:", "https://twitch.tv/matt_la_menacee"],
    linkedinSign: ["Visit my LinkedIn:", "https://linkedin.com/in/matteo-perisse"],
    githubSign: ["Take a look at my GitHub:", "https://github.com/mperisse27"],
    mailSign: ["To send me a mail:", "matteo.perisse@gmail.com"],

    //NPCs
    mattNPC: ["Hello", "Welcome to my world", "Explore and have fun!"],

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