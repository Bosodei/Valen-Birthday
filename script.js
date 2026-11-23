// Personaliza el código de acceso aquí si quieres cambiarlo.
const PASSCODE = '2911';
let enteredCode = '';

const screens = document.querySelectorAll('.screen');
const keypad = document.querySelector('#keypad');
const passwordBoxes = document.querySelectorAll('#passwordDisplay span');
const unlockButton = document.querySelector('#unlockButton');
const errorMessage = document.querySelector('#errorMessage');

function showScreen(screenId) {
  screens.forEach(screen => screen.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) target.classList.add('active');
}

function updatePasswordDisplay() {
  passwordBoxes.forEach((box, index) => {
    box.textContent = enteredCode[index] ? '●' : '';
  });
}
function resetPasscode() {
  enteredCode = '';
  updatePasswordDisplay();
  unlockButton.classList.add('hidden');
  errorMessage.textContent = '';
}
function checkPasscode() {
  if (enteredCode.length !== PASSCODE.length) return;
  if (enteredCode === PASSCODE) {
    errorMessage.textContent = '';
    unlockButton.classList.remove('hidden');
  } else {
    errorMessage.textContent = 'Esa no es la contraseña. Intenta otra vez ♥';
    unlockButton.classList.add('hidden');
    window.setTimeout(resetPasscode, 1100);
  }
}

keypad?.addEventListener('click', event => {
  const button = event.target.closest('button[data-key]');
  if (!button) return;
  const key = button.dataset.key;
  errorMessage.textContent = '';
  unlockButton.classList.add('hidden');
  if (key === 'clear') enteredCode = '';
  else if (key === 'delete') enteredCode = enteredCode.slice(0, -1);
  else if (/^\d$/.test(key) && enteredCode.length < PASSCODE.length) enteredCode += key;
  updatePasswordDisplay();
  checkPasscode();
});
unlockButton?.addEventListener('click', () => showScreen('screen-gifts'));

// Cualquiera de los regalos conduce a la sorpresa del deseo.
const gifts = document.querySelectorAll('.gift');
gifts.forEach(gift => gift.addEventListener('click', () => {
  gift.classList.add('opened');
  gifts.forEach(item => item.disabled = true);
  window.setTimeout(() => showScreen('screen-wish'), 500);
}));

const cake = document.querySelector('#cake');
const blowButton = document.querySelector('#blowButton');
const wishMessage = document.querySelector('#wishMessage');
blowButton?.addEventListener('click', () => {
  if (cake.classList.contains('blown')) return;
  cake.classList.add('blown');
  wishMessage.textContent = 'Tu deseo ya está en camino ♥';
  blowButton.textContent = '♥';
  blowButton.disabled = true;
  window.setTimeout(() => showScreen('screen-birthday'), 1800);
});

document.querySelector('#birthdayNext')?.addEventListener('click', () => showScreen('screen-letter'));
document.querySelector('#backButton')?.addEventListener('click', () => showScreen('screen-birthday'));

// Mantiene la pantalla inicial activa si el HTML no especifica una.
if (!document.querySelector('.screen.active')) showScreen('screen-passcode');
