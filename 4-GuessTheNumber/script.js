let randomNumber = Math.floor(Math.random() * 100) + 1;
let guesses = [];
let maxAttempts = 10;

const guessField = document.getElementById('guessField');
const guessSubmit = document.getElementById('subt');
const resultParas = document.querySelector('.resultParas');
const guessesSpan = document.querySelector('.guesses');
const lastResultSpan = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

guessSubmit.addEventListener('click', checkGuess);

function checkGuess(event) {
  event.preventDefault();
  
  const userGuess = Number(guessField.value);
  guesses.push(userGuess);

  if (userGuess === randomNumber) {
    lowOrHi.textContent = 'Congratulations! You got it right!';
    setGameOver();
  } else if (guesses.length === maxAttempts) {
    lowOrHi.textContent = '!!!GAME OVER!!!';
    setGameOver();
  } else {
    if (userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }

  updateUI();
  guessField.value = '';
  guessField.focus();
}

function updateUI() {
  guessesSpan.textContent = guesses.join(', ');
  lastResultSpan.textContent = maxAttempts - guesses.length;
}

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  resetButton.className = 'resetButton';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  guesses = [];
  randomNumber = Math.floor(Math.random() * 100) + 1;
  lowOrHi.textContent = '';
  guessesSpan.textContent = '';
  lastResultSpan.textContent = maxAttempts;
  
  const resetButton = document.querySelector('.resetButton');
  resetButton.parentNode.removeChild(resetButton);
}
