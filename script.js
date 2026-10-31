const guestNameInput = document.getElementById('guestNameInput');
const openCardBtn = document.getElementById('openCardBtn');
const backBtn = document.getElementById('backBtn');
const entryScreen = document.getElementById('entryScreen');
const cardScreen = document.getElementById('cardScreen');
const card = document.getElementById('card');
const previewName = document.getElementById('previewName');
const previewMessage = document.getElementById('previewMessage');
const previewFrom = document.getElementById('previewFrom');
const confettiLayer = document.querySelector('.confetti-layer');

const themes = {
  sunset: {
    name: 'theme-sunset',
    colors: ['#ff5ca8', '#ff7d5a', '#ffd166', '#9b5de5', '#00bbf9']
  },
  rose: {
    name: 'theme-rose',
    colors: ['#ff6b9a', '#f4a261', '#ffcad4', '#9d4edd', '#f72585']
  },
  ocean: {
    name: 'theme-ocean',
    colors: ['#00b4d8', '#48cae4', '#90e0ef', '#ffb703', '#a2d2ff']
  },
  purple: {
    name: 'theme-purple',
    colors: ['#8ec5fc', '#d596ff', '#ff9bd2', '#c77dff', '#9bf6ff']
  },
  dark: {
    name: 'theme-dark',
    colors: ['#f72585', '#ffb703', '#90e0ef', '#f8f9fa', '#b5179e']
  }
};

function generateConfetti(colors) {
  confettiLayer.innerHTML = '';
  const pieceCount = 25;

  for (let i = 0; i < pieceCount; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${(Math.random() * 5).toFixed(2)}s`;
    piece.style.animationDuration = `${(4 + Math.random() * 4).toFixed(2)}s`;
    piece.style.transform = `scale(${0.5 + Math.random() * 1.1})`;
    confettiLayer.appendChild(piece);
  }
}

function showCard(name) {
  const safeName = name.trim() || 'Beautiful';
  const finalMessage = `Wow, it's your day today, ${safeName}! You are loved, admired, and celebrated in every way. May your birthday be as beautiful, joyful, and magical as you are.`;

  previewName.textContent = safeName;
  previewMessage.textContent = finalMessage;
  previewFrom.textContent = 'With love';

  const selectedTheme = themes.sunset;
  card.className = `birthday-card ${selectedTheme.name}`;
  generateConfetti(selectedTheme.colors);

  entryScreen.classList.add('hidden');
  cardScreen.classList.remove('hidden');
}

openCardBtn.addEventListener('click', () => {
  const name = guestNameInput.value.trim();

  if (!name) {
    alert('Please enter your name first.');
    guestNameInput.focus();
    return;
  }

  showCard(name);
});

backBtn.addEventListener('click', () => {
  cardScreen.classList.add('hidden');
  entryScreen.classList.remove('hidden');
  guestNameInput.value = '';
  guestNameInput.focus();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !cardScreen.classList.contains('hidden')) {
    return;
  }

  if (event.key === 'Enter' && !entryScreen.classList.contains('hidden')) {
    openCardBtn.click();
  }
});
