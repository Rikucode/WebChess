let h1 = document.getElementsByTagName('h1')[0];
let sec = 0;
let min = 0;
let s;
let t;

function tickSec(){
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
    }
}
//
// function tickTimer(){
//     sec--;
//     if (sec < 0) {
//         sec = 59;
//         min--;
//     }
// }

function inc() {
    tickSec();
    h1.textContent = (min > 9 ? min : "0" + min)
       		 + ":" + (sec > 9 ? sec : "0" + sec);
    secundomer();
}

// function dec() {
//     tickTimer();
//     h1.textContent = (min > 9 ? min : "0" + min)
//        		 + ":" + (sec > 9 ? sec : "0" + sec);
//     if (min <= 0 && sec <= 0) {
//         endOfTime = true;
//     }
//     if (endOfTime) {
//         gameOver();
//         timeStop();
//     }
//     timer();
// }

function secundomer() {
    s = setTimeout(inc, 1000);
}

function timer(min) {
    t = setInterval(() => {
        sec--;
        if (sec < 0) {
            sec = 59;
            min--;
        }
        if (min <= 0 && sec < 0) {
            clearInterval(t);
            gameOver('lose');
        } else {
           h1.textContent = (min > 9 ? min : "0" + min)
        		 + ":" + (sec > 9 ? sec : "0" + sec);
        }
    }, 1000);
}

function timeStop() {
    clearTimeout(t);
    clearTimeout(s);
}


