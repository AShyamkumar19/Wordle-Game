import {dictionary} from './Dictionary.js';
import { fetchData } from './GetWord.js';
const apiURL = 'https://random-word-api.herokuapp.com/word?length=5';

// state of the game
const state = {
    secret: dictionary[Math.floor(Math.random() * dictionary.length)],
    //secret: fetchData(apiURL),
    grid: Array(6)
        .fill()
        .map(() => Array(5).fill('')),
    currentRow: 0,
    currentCol: 0,
    gameover: false,
};

// updated the grid based on the state
function updateGrid() {
    for (let i = 0; i < state.grid.length; i++) {
        for (let j = 0; j < state.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
        }
    }
}

// draws box in container and add letter
function drawBox(container, row, col, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box${row}${col}`;
    box.textContent = letter;

    container.appendChild(box);
    return box;
}

// draws grid in container
function drawGrid(container) {
    const grid = document.createElement('div');
    grid.className = 'grid';

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            drawBox(grid, i, j);
        }
    }

    container.appendChild(grid);
}

// registers keyboard events (typing)
function registerKeyboardEvents() {
    document.body.onkeydown = (e) => {
        if (state.gameover) {
            return;
        }

        const key = e.key;
        if (key === 'Enter') {
            if (state.currentCol === 5) {
                const word = getCurrentWord();
                if (isWordValid(word)) {
                    revealWord(word);
                    state.currentCol = 0;
                    state.currentRow++;
                }

                else {
                    alert('Invalid word!');
                }
            }
        }

        if (key === 'Backspace') {
            removeLetter();
        }

        if (isLetter(key)) {
            addLetter(key);
        }

        updateGrid();
    }
}

// returns the current word
function getCurrentWord() {
    return state.grid[state.currentRow].reduce((prev, curr) => prev + curr);    
}

// chekcs if word is in the dicitonary 
function isWordValid(word) {
    return dictionary.includes(word);
}

// reveals the word and tells the state of the game
function revealWord(word) {
    const row = state.currentRow;
    const animation_duration = 500; // ms
    const delayIncrement = animation_duration / 2;

    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`);
        const letter = box.textContent;

        setTimeout(() => {
            if (letter === state.secret[i]) {
                box.classList.add('right');
            } else if (state.secret.includes(letter)) {
                box.classList.add('wrong');
            } else {
                box.classList.add('empty');
            }
        }, ((i + 1) * animation_duration) / 2);

        box.classList.add('animated');
        box.style.animationDelay = `${i * delayIncrement}ms`;
    }

    const isWinner = state.secret === word;
    const isLoser = state.currentRow === 5;

    setTimeout(() => {
        if (isWinner) {
            state.gameover = true;
            alert('You win!');
        } else if (isLoser) {
            alert('You lose! The word was ' + state.secret);
        }
    }, animation_duration * 3);
}



// checks if it's a letter
function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i);
}

// adding a letter
function addLetter(letter) {
    if (state.currentCol === 5) {
        return;
    }

    state.grid[state.currentRow][state.currentCol] = letter;
    state.currentCol++;
}

// removing a letter
function removeLetter(letter) {
    if (state.currentCol === 0) {
        return;
    }

    state.grid[state.currentRow][state.currentCol - 1] = '';
    state.currentCol--;
}

// starts the game
function startup() {
    const game = document.getElementById('game');
    drawGrid(game);

    registerKeyboardEvents();

    console.log(state.secret);
}

// calling the startup function 
startup();
