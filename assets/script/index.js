'use strict';

// Utility functions
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function selectById(selector, parent = document) {
    return parent.getElementById(selector);
}

function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}

function create(element, parent = document) {
    return parent.createElement(element);
}

function print(...args) {
    console.log(args.join(', '));
}

/* Variables */

let attempts = 0;
let attemptsLeft = 7;
let randomNumber = Math.floor(Math.random() * 100 + 1);

const guess = select('.guess');
const submit = select('.submit');
const hint = select('.hint');
const attemptsText = select('.attempts');
const replayButton = select('#replay-btn');
const attemptsLeftText = select('.attemps-left');

onEvent('click', submit, function() {
    checkGuess();
});

onEvent('keyup', document, function (event) {
    if (submit.style.display !== 'none' && event.key === 'Enter') {
        checkGuess();
    }
});

onEvent('click', replayButton, function() {
    restartGame();
});

function checkGuess() {
    const userValue = Number(guess.value);
    let isWin = false;
    
    if (userValue >= 1 && userValue <= 100) {
    
        attempts++;

        if (userValue === randomNumber) {
            isWin = true;
            gameOver(isWin);
        } else if (userValue < randomNumber) {
            hint.textContent = `${userValue} is too low! Try again.`;
        } else {
            hint.textContent = `${userValue} is too high! Try again.`;
        }
    
        if (attempts >= 7 && !isWin) {
            gameOver(isWin);
        } else {
            attemptsLeft = 7 - attempts;
            attemptsText.textContent = `Attempts: ${attempts}`;
            attemptsLeftText.textContent = attemptsLeft;
        }

        guess.value = '';

    } else {
        hint.textContent = "Please enter a valid number between 1 and 100";
        guess.value = '';
    }
}

function gameOver(isWin) {
    if (isWin) {
        hint.textContent = `Congratulations You Win!\n 
                            You guessed it on ${attempts} attemps!\n
                            Click the restart button to play again!`;
        hint.style.color = '#24f024';
    } else {
        hint.textContent = `You lose! The correct number was ${randomNumber}!\n
                            Click the restart button to play again!`;
        hint.style.color = '#f83d18';
    }

    guess.disabled = true;
    submit.style.display = "none";
    replayButton.style.display = "inline-block";
}

function restartGame() {
    attempts = 0;
    randomNumber = Math.floor(Math.random() * 100 + 1);
    hint.textContent = '';
    hint.style.color = '#fff'
    attemptsText.textContent = '';
    replayButton.style.display = "none";
    submit.style.display = "inline-block";
    attemptsLeft = 7;
    attemptsLeftText.textContent = attemptsLeft;
    guess.disabled = false;
    guess.value = '';
}