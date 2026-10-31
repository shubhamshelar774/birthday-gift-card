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

const VALID_NAME = 'dipalee';

const themes = {
  sunset: {
    name: 'theme-sunset',
    colors: ['#ff5ca8', '#ff7d5a', '#ffd166', '#9b5de5', '#00bbf9']
  }
};

function generateConfetti(colors) {
  confettiLayer.innerHTML = '';
  const pieceCount = 30;

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
  const safeName = name.trim();
  const finalMessage = previewMessage && previewMessage.textContent
    ? previewMessage.textContent.trim()
    : "Wishing the happiest birthday to the girl who completely owns my heart! 💕 Just a quick reminder: I’m never going to stop loving you. Well, okay, I might stop when a battery hits 101%, when time hits 25, or on February 30th—so basically, never! Enjoy your special day...!!";

  previewName.textContent = safeName;
  previewMessage.textContent = finalMessage;
  previewFrom.textContent = 'Forever yours';

  const selectedTheme = themes.sunset;
  card.className = `birthday-card ${selectedTheme.name}`;
  generateConfetti(selectedTheme.colors);

  entryScreen.classList.add('hidden');
  cardScreen.classList.remove('hidden');
  entryScreen.style.display = 'none';
  cardScreen.style.display = 'flex';
}

function showEntryScreen() {
  entryScreen.classList.remove('hidden');
  cardScreen.classList.add('hidden');
  entryScreen.style.display = 'flex';
  cardScreen.style.display = 'none';
}

openCardBtn.addEventListener('click', () => {
  const name = guestNameInput.value.trim();

  if (!name) {
    alert('Please enter your name first.');
    guestNameInput.focus();
    return;
  }

  if (name.toLowerCase() !== VALID_NAME) {
    alert("It's not your birthday yet. Please enter the correct name.");
    guestNameInput.value = '';
    guestNameInput.focus();
    return;
  }

  showCard(name);
});

backBtn.addEventListener('click', () => {
  showEntryScreen();
  guestNameInput.value = '';
  guestNameInput.focus();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && cardScreen && !cardScreen.classList.contains('hidden')) {
    return;
  }

  if (event.key === 'Enter' && entryScreen && !entryScreen.classList.contains('hidden')) {
    openCardBtn.click();
  }
});

showEntryScreen();
