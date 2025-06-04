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