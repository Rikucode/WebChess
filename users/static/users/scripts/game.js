let game_mode = sessionStorage.getItem('game_mode');
let width = sessionStorage.getItem('width');
let height = sessionStorage.getItem('height');
let bombs_quantity = sessionStorage.getItem('bombs_quantity');
let time = sessionStorage.getItem('timer');


startGame(width, height, bombs_quantity, game_mode, time);

function startGame(WIDTH, HEIGHT, BOMBS_QUANTITY, GAME_MODE, TIME) {
    const field = document.querySelector('.field');
    console.log(document.getElementById('field').offsetWidth);
    // if (GAME_MODE == 'classic') {
    //     document.getElementById('timer').style.display = 'none';
    //     field.style.top = '50%';
    // }
    var width_px = 750 / HEIGHT;
    if (width_px > 45) width_px = 45;
    let par = 'repeat(' + width + ', ' + width_px + 'px)';
    document.getElementById('field').style.gridTemplateColumns = par;
    const cellsQuantity = WIDTH * HEIGHT;
    field.innerHTML = '<button></button>'.repeat(cellsQuantity);
    var buttons = document.getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.height = width_px + 'px';
        if (width_px < 15) buttons[i].style.fontSize = 5 + 'px';
        else buttons[i].style.fontSize = (width_px - 15) + 'px';
    }
    const cells = [...field.children];

    let closedCount = cellsQuantity;
    let firstClick = true;
    let bombs = [...Array(cellsQuantity).keys()]
        .sort(() => Math.random() - 0.5)
        .slice(0, BOMBS_QUANTITY);

    field.addEventListener('click', (event) => {
        if (event.target.tagName != 'BUTTON') {
            console.log(event.button);
            return;
        }
        console.log(event.button);
        const index = cells.indexOf(event.target);
        column = index % WIDTH;
        row = Math.floor(index / WIDTH);

        if (firstClick){
            if (GAME_MODE == "classic") {
               secundomer();
            } else {
                timer(parseInt(TIME));
            }
            firstClick = false;
        }
        //     let i = 0;
        //     while (i < BOMBS_QUANTITY ){
        //         let randomCell = Math.round(Math.random() * (WIDTH * HEIGHT - 1));
        //         if (index == randomCell){
        //             continue;
        //         } 
        //         else 
        //         {   
        //             if (!bombs == undefined){
        //                 if (bombs.includes(randomCell)){
        //                     continue;
        //                 }
        //                 else
        //                 {
        //                     bombs+=randomCell;
        //                     i++;
        //                     continue;
        //                 }
        //             }
        //             else
        //                 {
        //                     bombs+=randomCell;
        //                     i++;
        //                     continue;
        //                 }
        //         }

        //     }
        //     firstClick = false;
        //     console.log(bombs);
        // }

        open(row, column);
    });

    field.addEventListener('contextmenu', (event) => {
        event.preventDefault();

        const index = cells.indexOf(event.target);
        column = index % WIDTH;
        row = Math.floor(index / WIDTH);

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
            return;
        } else {

            closedCount--;
            const nearBombsCount = nearBombsQuantity(row, column);

            if (nearBombsCount != 0) {
                cell.innerHTML = nearBombsCount;
                if (closedCount <= BOMBS_QUANTITY) {
                    gameOver('win');
                }
                return;
            } else {
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        open(row + y, column + x);
                    }
                }
            }
            return;
        }

    }

    function isBomb(row, column) {
        if (!isValid(row, column)) return false;

        const index = row * WIDTH + column;

        return bombs.includes(index);
    }

    function flagCell(row, column) {
        if (!isValid(row, column)) return;
        const index = row * WIDTH + column;
        const cell = cells[index];
        checkFlags();
        if (cell.disabled == false) {
            cell.classList.toggle('flag');
        }
        return;
    }

    function checkFlags() {

        return;
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
