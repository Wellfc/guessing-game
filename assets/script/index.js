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

let attempts = 0;
let randomNumber = Math.floor(Math.random() * 100 + 1);

const guess = select('.guess');
const submit = select('.submit');
const hint = select('.hint');
const attemptsText = select('.attempts');

onEvent('click', submit, function() {
    checkGuess();
});

function checkGuess() {
    const userValue = Number(guess.value);
    attempts++;

    if (userValue === randomNumber) {
        hint.textContent = `Congratulations, you guessed it! on ${attempts} attemps`;
        attempts = 0;
    } else if (userValue < randomNumber) {
        hint.textContent = "Too low! Try again.";
        guess.value = '';
    } else {
        hint.textContent = "Too high! Try again.";
        guess.value = '';
    }

    attemptsText.textContent = `Attempts: ${attempts}`;
}