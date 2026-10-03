const screens = document.querySelectorAll('.screen');
const correctCode = '2911';
let enteredCode = '';

function showScreen(id) {
  screens.forEach(screen => screen.classList.toggle('active', screen.id === id));
  window.scrollTo(0, 0);
}

function updateCode() {
  document.querySelectorAll('.code-boxes span').forEach((box, i) => {
    box.textContent = enteredCode[i] || '';
    box.classList.toggle('filled', Boolean(enteredCode[i]));
  });

  const unlock = document.getElementById('unlockButton');
  unlock.classList.toggle('hidden', enteredCode.length !== 4);
}

document.getElementById('keypad').addEventListener('click', event => {
  const button = event.target.closest('[data-key]');
  if (!button || enteredCode.length >= 4) return;
  const key = button.dataset.key;
  if (!/\d/.test(key)) return;
  enteredCode += key;
  updateCode();
});

document.getElementById('unlockButton').addEventListener('click', () => {
  const error = document.getElementById('codeError');
  if (enteredCode === correctCode) {
    error.textContent = '';
    showScreen('screen-gifts');
  } else {
    error.textContent = 'Almost... try again ♥';
    enteredCode = '';
    updateCode();
  }
});

document.querySelectorAll('.gift').forEach(gift => {
  gift.addEventListener('click', () => {
    gift.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.3) rotate(-8deg)' },
      { transform: 'scale(0)' }
    ], { duration: 550, easing: 'ease-in-out' });

    setTimeout(() => {
      showScreen('screen-wish');
    }, 500);
  });
});

document.getElementById('blowButton').addEventListener('click', () => {
  const cake = document.getElementById('cake');
  cake.classList.add('blown');
  document.getElementById('wishMessage').textContent = 'Wish granted ♥';
  document.getElementById('blowButton').disabled = true;
  makeConfetti();

  setTimeout(() => showScreen('screen-birthday'), 1800);
});

document.getElementById('birthdayNext').addEventListener('click', () => {
  showScreen('screen-final-card');
});

document.getElementById('backButton').addEventListener('click', () => {
  showScreen('screen-birthday');
});

function makeConfetti() {
  const container = document.getElementById('confetti');
  container.innerHTML = '';
  for (let i = 0; i < 70; i++) {
    const piece = document.createElement('i');
    piece.style.left = Math.random() * 100 + '%';
    piece.style.animationDelay = Math.random() * .7 + 's';
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.style.background = ['#ffd6df', '#fff', '#8fdcff', '#b9a5ff'][i % 4];
    container.appendChild(piece);
  }
  setTimeout(() => container.innerHTML = '', 3500);
}

updateCode();
