import type { Player } from "./components/player";
import { addEventToVolumeSlider } from "./components/sounds";
import { setLanguage, t, type Lang } from "./utils/i18n";

const addFlagListeners = () => {
  const frButton = document.getElementById('fr-button') as HTMLButtonElement;
  const enButton = document.getElementById('en-button') as HTMLButtonElement;

  const updateLanguageSelection = (lang: Lang) => {
    setLanguage(lang);

    document.querySelectorAll('.language-btn').forEach(btn => {
      btn.classList.remove('ring-white', 'ring-2');
    });

    const selectedBtn = lang === 'fr' ? frButton : enButton;
    selectedBtn.classList.add('ring-white', 'ring-2');

    applyTranslationsToDOM();
  };
  
  frButton.addEventListener('click', () => updateLanguageSelection('fr'));
  enButton.addEventListener('click', () => updateLanguageSelection('en'));
}

function toggleMenu(event: MouseEvent, menuName: string, player?: Player) {
  const menu = document.getElementById(menuName);
  if (menu) menu.classList.toggle('hidden');
  const button = event.currentTarget as HTMLButtonElement;
  button.blur()
  if (player) player.canMove = menu?.classList.contains('hidden') ?? true;
}

function setupMenuOutsideClickHandler() {
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

const setupActionButtons = (activeButtons: Set<string>) => {
  const template = document.getElementById('gui-button-template') as HTMLTemplateElement;
  const buttons: { action: string, icon: string, parent: string, toggle: boolean }[] = [
    { action: 'interact', icon: 'fa-comment', parent: 'action-line1', toggle: false },
    { action: 'up', icon: 'fa-chevron-up', parent: 'action-line1', toggle: false },
    { action: 'sprint', icon: 'fa-angle-double-right', parent: 'action-line1', toggle: true },
    { action: 'left', icon: 'fa-chevron-left', parent: 'action-line2', toggle: false },
    { action: 'down', icon: 'fa-chevron-down', parent: 'action-line2', toggle: false },
    { action: 'right', icon: 'fa-chevron-right', parent: 'action-line2', toggle: false },
  ];

  buttons.forEach(({ action, icon, parent, toggle }) => {
    const clone = template.content.cloneNode(true) as DocumentFragment;
    const button = clone.querySelector('button')!;
    const iconElem = button.querySelector('i')!;
    iconElem.className = `fa ${icon}`;
    if (toggle) {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        if (activeButtons.has(action)) {
          activeButtons.delete(action);
          button.classList.remove('ring-2', 'ring-white');
        } else {
          activeButtons.add(action);
          button.classList.add('ring-2', 'ring-white');
        }
        console.log(button.classList);
      });
    }
    else {
      button.addEventListener('mousedown', (event) => {
        event.preventDefault();
        activeButtons.add(action);
      });
      button.addEventListener('mouseup', (event) => {
        event.preventDefault();
        activeButtons.delete(action);
      });
      button.addEventListener('pointerdown', (event) => {
        event.preventDefault();
        activeButtons.add(action);
      });
      button.addEventListener('pointerup', (event) => {
        event.preventDefault();
        activeButtons.delete(action);
      });
      button.addEventListener('mouseleave', (event) => {
        event.preventDefault();
        activeButtons.delete(action);
      });
    }

    const parentElem = document.getElementById(parent)!;
    parentElem.appendChild(clone);
  });
}

const toggleActionButtons = () => {
  const actionButtons = document.getElementById('action-buttons')!;
  if ((document.getElementById('actions-visible') as HTMLInputElement).checked) {
    actionButtons.classList.add('hidden');
  } else {
    actionButtons.classList.remove('hidden');
  }
}

export function applyTranslationsToDOM() {
  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n!;
    const translated = t(key);
    element.textContent = translated[0];
  });
}

export const setupGui = (activeButtons: Set<string>, player: Player) => {
  applyTranslationsToDOM();
  addEventToVolumeSlider();
  addFlagListeners();
  document.getElementById('settings-toggle')?.addEventListener('click', (event) => toggleMenu(event, "settings-menu"));
  document.getElementById('help-toggle')?.addEventListener('click', (event) => toggleMenu(event, "help-menu"));
  document.getElementById('close-settings')?.addEventListener('click', (event) => toggleMenu(event, "settings-menu"));
  document.getElementById('close-help')?.addEventListener('click', (event) => toggleMenu(event, "help-menu"));
  document.getElementById('close-epita')?.addEventListener('click', (event) => toggleMenu(event, "epita-dialog", player));
  document.getElementById('close-studevents')?.addEventListener('click', (event) => toggleMenu(event, "studevents-dialog", player));
  document.getElementById('actions-visible')?.addEventListener('click', toggleActionButtons);
  setupMenuOutsideClickHandler();

  setupActionButtons(activeButtons);

  const hasVisited = localStorage.getItem("hasVisited");
  if (!hasVisited) {
    document.getElementById('help-menu')?.classList.remove("hidden");
    localStorage.setItem("hasVisited", "true");
  }
}