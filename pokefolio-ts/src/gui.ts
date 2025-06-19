import { addEventToVolumeSlider } from "./components/sounds";

export const addFlagListeners = (onLanguageChange: (lang: 'fr' | 'en') => void) => {
  const frButton = document.getElementById('fr-button') as HTMLButtonElement;
  const enButton = document.getElementById('en-button') as HTMLButtonElement;

  const updateLanguageSelection = (lang: 'fr' | 'en') => {
    onLanguageChange(lang);

    document.querySelectorAll('.language-btn').forEach(btn => {
      btn.classList.remove('ring-white', 'ring-2');
    });

    const selectedBtn = lang === 'fr' ? frButton : enButton;
    selectedBtn.classList.add('ring-white', 'ring-2');
  };
  
  frButton.addEventListener('click', () => updateLanguageSelection('fr'));
  enButton.addEventListener('click', () => updateLanguageSelection('en'));
}

export function openSettingsMenu(event: MouseEvent) {
  const menu = document.getElementById('settings-menu');
  if (menu) menu.classList.toggle('hidden');
  const button = event.currentTarget as HTMLButtonElement;
  button.blur()
}

export function openHelpMenu(event: MouseEvent) {
  const menu = document.getElementById('help-menu');
  if (menu) menu.classList.toggle('hidden');
  const button = event.currentTarget as HTMLButtonElement;
  button.blur()
}

export function setupMenuOutsideClickHandler() {
  document.addEventListener('click', (event) => {
    const settingsMenu = document.getElementById('settings-menu');
    const helpMenu = document.getElementById('help-menu');
    const settingsToggle = document.getElementById('settings-toggle');
    const helpToggle = document.getElementById('help-toggle');

    const target = event.target as HTMLElement;

    const isClickInsideSettings = settingsMenu?.contains(target);
    const isClickInsideHelp = helpMenu?.contains(target);
    const isClickOnSettingsToggle = settingsToggle?.contains(target);
    const isClickOnHelpToggle = helpToggle?.contains(target);

    if (settingsMenu && !isClickInsideSettings && !isClickOnSettingsToggle) {
      settingsMenu.classList.add('hidden');
    }

    if (helpMenu && !isClickInsideHelp && !isClickOnHelpToggle) {
      helpMenu.classList.add('hidden');
    }
  });
}

export const setupGui = () => {
  addEventToVolumeSlider();
  document.getElementById('settings-toggle')?.addEventListener('click', openSettingsMenu);
  document.getElementById('help-toggle')?.addEventListener('click', openHelpMenu);
  document.getElementById('close-settings')?.addEventListener('click', openSettingsMenu);
  document.getElementById('close-help')?.addEventListener('click', openHelpMenu);
  setupMenuOutsideClickHandler();

  const hasVisited = localStorage.getItem("hasVisited");
  if (!hasVisited) {
    document.getElementById('help-menu')?.classList.remove("hidden");
    localStorage.setItem("hasVisited", "true");
  }
}