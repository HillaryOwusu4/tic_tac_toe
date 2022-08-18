const itemContent = document.querySelectorAll('.item');
const Winner = document.querySelector('.winn');
const Again = document.querySelector('.game_button');
const wintext = document.querySelector('.gameoverText');
const strikes = document.querySelector('.strike')
const Player_x = 'X';
const Player_y = 'O';
let turn = Player_x;

// let myarr = ['x-hover', 'O-hover']
let randomi = Array(itemContent.length)
randomi.fill(null);

function sethover() {
    itemContent.forEach(item => {
        item.classList.remove('x-hover');
        item.classList.remove('o-hover');
    });

    const hoverClass = `${turn.toLowerCase()}-hover`;
    itemContent.forEach(hover => {
        if (hover.innerText == '') {
            hover.classList.add(hoverClass);
        }
    })

}
sethover();


itemContent.forEach(news => {
    news.addEventListener('click', (event) => {
        if (Winner.classList.contains('visible')) {
            return;
        }
        const itemContents = event.target;
        const itemnumber = itemContents.dataset.number;
        if (itemContents.innerText != '') {
            return;
        }

        if (turn === Player_x) {
            itemContents.innerText = Player_x;
            randomi[itemnumber - 1] = Player_x;
            turn = Player_y;
        } else {
            itemContents.innerText = Player_y;
            randomi[itemnumber - 1] = Player_y;
            turn = Player_x;
        }
        sethover();
        checkWinner();
    })

})

function checkWinner() {
    for (const combinations of winningCombination) {
        const { combo, strikeClass } = combinations;
      
        const tileValue1 = randomi[combo[0] - 1];
        const tileValue2 = randomi[combo[1] - 1];
        const tileValue3 = randomi[combo[2] - 1];
        if (tileValue1 != null && tileValue1 == tileValue2 && tileValue1 == tileValue3) {
            strikes.classList.add(strikeClass)
            gameOver(tileValue1);
            return;
        }
    }
    const allfilled = randomi.every((title) => title !== null);
    if (allfilled) {
        gameOver(null);
    }
}

function gameOver(winnertext) {
    let text = 'Draw';
    if (winnertext != null) {
        text = `winner is ${winnertext}`;

    }
    Winner.classList.add('visible');
    // Winner.className = 'visible';
    wintext.innerText = text;
}

Again.addEventListener('click', () => {
    strikes.className = 'strike'
    Winner.classList.remove('visible');
    randomi.fill(null);
    itemContent.forEach(names => {
        names.innerText = '';
    })
    turn = Player_x
    sethover();

})

const winningCombination = [{ combo: [1, 2, 3], strikeClass: 'strike0' },
    { combo: [4, 5, 6], strikeClass: 'strike1' },
    { combo: [7, 8, 9], strikeClass: 'strike2' },
    { combo: [1, 4, 7], strikeClass: 'strike-col1' },
    { combo: [2, 5, 8], strikeClass: 'strike-col2' },
    { combo: [3, 6, 9], strikeClass: 'strike-col3' },
    { combo: [3, 5, 7], strikeClass: 'strike-diagonal' },
    { combo: [1, 5, 9], strikeClass: 'strike-diagonal2' }
]