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
let randomNumber = Math.floor(Math.random() * 100 + 1);

const guess = select('.guess');
const submit = select('.submit');
const hint = select('.hint');
const attemptsText = select('.attempts');
const replayButton = select('#replay-btn');

onEvent('click', submit, function() {
    checkGuess();
});

onEvent('keyup', document, function (event) {
    if (submit.style.display !== 'none' && event.key === 'Enter') {
        checkGuess();
        print('Enter key pressed');
    }
});

onEvent('click', replayButton, function() {
    restartGame();
});

function checkGuess() {
    const userValue = Number(guess.value);
    attempts++;

    if (userValue === randomNumber) {
        hint.textContent = `Congratulations, you guessed it on ${attempts} attemps!`;
        submit.style.display = "none";
        replayButton.style.display = "inline-block";
    } else if (userValue < randomNumber) {
        hint.textContent = `${userValue} is too low! Try again.`;
        guess.value = '';
    } else {
        hint.textContent = `${userValue} is too high! Try again.`;
        guess.value = '';
    }

    attemptsText.textContent = `Attempts: ${attempts}`;
}

function restartGame() {
    attempts = 0;
    randomNumber = Math.floor(Math.random() * 100 + 1);
    guess.value = '';
    hint.textContent = '';
    attemptsText.textContent = '';
    replayButton.style.display = "none";
    submit.style.display = "inline-block";
}