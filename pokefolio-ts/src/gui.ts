import type { Player } from "./components/player";
import { addEventToVolumeSlider, toggleSound } from "./components/sounds";
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
  if (menu?.classList.contains('hidden')) { // Add or remove safety for Shift key selecting all text on screen
    document.getElementById("overlay")?.classList.add("select-none");
    document.getElementById("menu-container")?.classList.add("hidden"); //Player is only passed when the menu is an info dialog
  } else {
    document.getElementById("overlay")?.classList.remove("select-none");
    document.getElementById("menu-container")?.classList.remove("hidden"); //Player is only passed when the menu is an info dialog
  }
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

export function toggleSoundButton() {
  const isSoundOn = document.getElementById('sound-icon')?.classList.contains('fa-volume-up') ?? false;
  const soundToggle = document.getElementById('sound-toggle') as HTMLButtonElement;
  soundToggle.blur();
  const soundIcon = document.getElementById('sound-icon') as HTMLButtonElement;
  if (isSoundOn) {
    soundIcon.classList.remove('fa-volume-up');
    soundIcon.classList.add('fa-volume-off');
  } else {
    soundIcon.classList.remove('fa-volume-off');
    soundIcon.classList.add('fa-volume-up');
  }
  toggleSound(isSoundOn);
}

export async function showZonePopup(zoneName: string) {
  const popupText = document.getElementById('zoneTitle');
  if (popupText) {
    popupText.textContent = zoneName;
  }
  const popup = document.getElementById('zonePopup');
  if (popup) {
    popup.classList.remove('opacity-0', 'pointer-events-none');
    popup.classList.add('opacity-100', 'pointer-events-auto');
    await new Promise(resolve => setTimeout(resolve, 2000));
    popup.classList.remove('opacity-100', 'pointer-events-auto');
    popup.classList.add('opacity-0', 'pointer-events-none');
  }
}

export const setupGui = (activeButtons: Set<string>, player: Player) => {
  applyTranslationsToDOM();
  addEventToVolumeSlider();
  addFlagListeners();
  document.getElementById('settings-toggle')?.addEventListener('click', (event) => toggleMenu(event, "settings-menu", player));
  document.getElementById('help-toggle')?.addEventListener('click', (event) => toggleMenu(event, "help-menu", player));
  document.getElementById('achievement-toggle')?.addEventListener('click', (event) => toggleMenu(event, "achievement-menu", player));
  document.getElementById('close-settings')?.addEventListener('click', (event) => toggleMenu(event, "settings-menu", player));
  document.getElementById('close-help')?.addEventListener('click', (event) => toggleMenu(event, "help-menu", player));
  document.getElementById('close-achievement')?.addEventListener('click', (event) => toggleMenu(event, "achievement-menu", player));
  document.getElementById('close-epita')?.addEventListener('click', (event) => toggleMenu(event, "epita-dialog", player));
  document.getElementById('close-studevents')?.addEventListener('click', (event) => toggleMenu(event, "studevents-dialog", player));
  document.getElementById('close-nordon')?.addEventListener('click', (event) => toggleMenu(event, "nordon-dialog", player));
  document.getElementById('close-pravaig')?.addEventListener('click', (event) => toggleMenu(event, "pravaig-dialog", player));
  document.getElementById('close-prologin')?.addEventListener('click', (event) => toggleMenu(event, "prologin-dialog", player));
  document.getElementById('close-contact')?.addEventListener('click', (event) => toggleMenu(event, "contact-dialog", player));
  document.getElementById('sound-toggle')?.addEventListener('click', () => toggleSoundButton());
  document.getElementById('actions-visible')?.addEventListener('click', toggleActionButtons);

  setupActionButtons(activeButtons);

  const hasVisited = localStorage.getItem("hasVisited");
  if (!hasVisited) {
    document.getElementById("help-menu")?.classList.remove("hidden");
    document.getElementById("menu-container")?.classList.remove("hidden");
    localStorage.setItem("hasVisited", "true");
  }
}