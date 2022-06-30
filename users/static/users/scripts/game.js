let game_mode = sessionStorage.getItem('game_mode');
let width = sessionStorage.getItem('width');
let height = sessionStorage.getItem('height');
let bombs_quantity = sessionStorage.getItem('bombs_quantity');
let time = sessionStorage.getItem('timer');


startGame(width, height, bombs_quantity, game_mode, time);

function startGame(WIDTH, HEIGHT, BOMBS_QUANTITY, GAME_MODE, TIME) {
    const cellsQuantity = WIDTH * HEIGHT;
    let width_px = 750 / HEIGHT;
    if (width_px > 45) width_px = 45;

    const field = document.querySelector('.field');
    console.log(document.getElementById('field').offsetWidth);

    document.getElementById('field').style.gridTemplateColumns = 'repeat(' + width + ', ' + width_px + 'px)';

    field.innerHTML = '<button></button>'.repeat(cellsQuantity);
    let buttons = document.getElementsByTagName('button');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.height = width_px + 'px';
        if (width_px < 15) buttons[i].style.fontSize = 5 + 'px';
        else buttons[i].style.fontSize = (width_px - 15) + 'px';
    }
    const cells = [...field.children];

    let closedCount = cellsQuantity;
    let firstClick = true;
    let bombsFlagged = 0;
    let cellsFlagged = 0;
    let bombs = [...Array(cellsQuantity).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, BOMBS_QUANTITY);

    field.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') {
            console.log(event.button);
            return;
        }
        console.log(event.button);
        const index = cells.indexOf(event.target);
        let column = index % WIDTH;
        let row = Math.floor(index / WIDTH);

        if (firstClick) {
            if (GAME_MODE === "classic") {
               secundomer();
            } else {
                timer(parseInt(TIME));
            }
            excludeBomb(row, column);
            firstClick = false;
        }

        open(row, column);
    });

    field.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        if (firstClick) return;
        const index = cells.indexOf(event.target);
        let column = index % WIDTH;
        let row = Math.floor(index / WIDTH);

        flagCell(row, column);
        return false;
    });

    function isValid(row, column) {
        return row >= 0 &&
            row < HEIGHT &&
            column >= 0 &&
            column < WIDTH;
    }

    function nearBombsQuantity(row, column) {
        let count = 0;
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                if (isBomb(row + y, column + x)) {
                    count++;
                }
            }
        }
        return count;
    }

    function open(row, column) {
        if (!isValid(row, column)) return;

        const index = row * WIDTH + column;
        const cell = cells[index];
        if (cell.classList.contains('flag')) return;
        if (cell.disabled === true) return;

        cell.disabled = true;

        if (isBomb(row, column)) {
            cell.innerHTML = 'X';
            gameOver('lose');
        } else {
            closedCount--;
            const nearBombsCount = nearBombsQuantity(row, column);

            if (nearBombsCount !== 0) {
                cell.innerHTML = nearBombsCount;
                if (closedCount <= BOMBS_QUANTITY) {
                    gameOver('win');
                }
            } else {
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        open(row + y, column + x);
                    }
                }
            }
        }

    }

    function isBomb(row, column) {
        if (!isValid(row, column)) return false;

        const index = row * WIDTH + column;

        return bombs.includes(index);
    }

    function excludeBomb(row, column) {
        if (!isValid(row, column)) return;
        if (!isBomb(row, column)) return;

        const index = row * WIDTH + column;

        for (let i = 0; i < bombs.length; i++){
            if (bombs[i] === index) {
                bombs.splice(i, 1);
                console.log(`bomb has been deleted (${row}, ${column})`);
            }
        }

        let newBombIndex = Math.round(Math.random() * (cellsQuantity - 1));

        while (newBombIndex === index) {
           newBombIndex = Math.round(Math.random() * (cellsQuantity - 1));
        }

        bombs.push(newBombIndex);
        console.log(`bomb has been added (${newBombIndex})`);
    }

    function flagCell(row, column) {
        if (!isValid(row, column)) return;
        const index = row * WIDTH + column;
        const cell = cells[index];

        if (!cell.disabled) {
            cell.classList.toggle('flag');

            if (cell.classList.contains('flag')) {
                //cell is flagged
                cellsFlagged++;
                if (isBomb(row, column)) {
                    bombsFlagged++;
                }
            } else {
                //cell is not flagged
                cellsFlagged--;
                if (isBomb(row, column)) {
                    bombsFlagged--;
                }
            }

            checkFlags();
        }
    }

    function checkFlags() {
        console.log(`bombs remained ${BOMBS_QUANTITY - bombsFlagged}`);
        if (bombsFlagged >= BOMBS_QUANTITY && cellsFlagged === bombsFlagged) {
            gameOver('win');
        }
    }
}

function gameOver(Id) {
    document.getElementById(Id).style.display = 'block';
    timeStop();

}

function RestartGame(Id) {
    document.getElementById(Id).style.display = 'none';
    location.reload();
}
