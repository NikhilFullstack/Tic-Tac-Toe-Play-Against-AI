var chance;
var player;
var a11 = 0;
var a12 = 0;
var a13 = 0;
var a21 = 0;
var a22 = 0;
var a23 = 0;
var a31 = 0;
var a32 = 0;
var a33 = 0;
const present = document.querySelector("#present");
const secondLife = document.querySelector("#secondLife");
const a11x = document.querySelector("[a11x]");
const a11o = document.querySelector("[a11o]");
const a12x = document.querySelector("[a12x]");
const a12o = document.querySelector("[a12o]");
const a13x = document.querySelector("[a13x]");
const a13o = document.querySelector("[a13o]");

const a21x = document.querySelector("[a21x]");
const a21o = document.querySelector("[a21o]");
const a22x = document.querySelector("[a22x]");
const a22o = document.querySelector("[a22o]");
const a23x = document.querySelector("[a23x]");
const a23o = document.querySelector("[a23o]");

const a31x = document.querySelector("[a31x]");
const a31o = document.querySelector("[a31o]");
const a32x = document.querySelector("[a32x]");
const a32o = document.querySelector("[a32o]");
const a33x = document.querySelector("[a33x]");
const a33o = document.querySelector("[a33o]");

const winnerpara = document.querySelector("#winnerpara")
function reset() {
    location.reload();
}
//x click player=0
function xclick() {
    player = 0;
    present.classList.add("hidden");
    secondLife.classList.remove("hidden");
    chance = 0;

}

//o click player=1
function oclick() {
    player = 1;
    present.classList.add("hidden");
    secondLife.classList.remove("hidden");
    chance = 1;
}
//if player wins winner=1 if comp wins winner=2
function iswinner() {
    if ((a11 == 1 && a12 == 1 && a13 == 1) || (a21 == 1 && a22 == 1 && a23 == 1) || (a13 == 1 && a23 == 1 && a33 == 1) || (a12 == 1 && a22 == 1 && a32 == 1) ||
        (a31 == 1 && a32 == 1 && a33 == 1) || (a11 == 1 && a22 == 1 && a33 == 1) || (a13 == 1 && a22 == 1 && a31 == 1) || (a11 == 1 && a21 == 1 && a31 == 1)) {
        winner = 1;
        return true;
    }
    if ((a11 == 2 && a12 == 2 && a13 == 2) || (a21 == 2 && a22 == 2 && a23 == 2) || (a13 == 2 && a23 == 2 && a33 == 2) || (a12 == 2 && a22 == 2 && a32 == 2) ||
        (a31 == 2 && a32 == 2 && a33 == 2) || (a11 == 2 && a22 == 2 && a33 == 2) || (a13 == 2 && a22 == 2 && a31 == 2) || (a11 == 2 && a21 == 2 && a31 == 2)) {
        winner = 2;
        return true;
    }
    return false;
}
function ComputerMove() {
    let vec = ["a11", "a12", "a13", "a21", "a22", "a23", "a31", "a32", "a33"];

    //check comp can win in next move
    for (let i = 0; i < vec.length; i++) {
        let e = vec[i];
        if (eval(`${e}==0`)) {
            let flag = 0;
            eval(`${e}=2`)
            if (!iswinner())
                flag = 1;
            if (flag == 1)
                eval(`${e}=0`)
            else {

                // console.log("computerwins")
                return vec[i];
            }
        }
    }

    //block player winning move
    for (let ij = 0; ij < vec.length; ij++) {
        let e = vec[ij];
        if (eval(`${e}==0`)) {
            let flag = 0;

            eval(`${e}=1`);
            if (!iswinner())
                flag = 1;
            if (flag == 1)
                eval(`${e}=0`);
            else {
                eval(`${e}=2`);
                // console.log("Blocked win", e)
                return e;
            }
        }
    }
    //try to take center if it is free
    if (a22 == 0) {
        a22 = 2;
        return "a22";
    }

    //try to take any corner is they are free
    let corner = ["a11", "a13", "a31", "a33"];
    let temparr = [];
    for (let i = 0; i < corner.length; i++) {
        let e = corner[i];
        if (eval(`${e}==0`)) {
            // console.log(e);
            temparr.push(e);
        }
    }
    // console.log(temparr);
    if (temparr.length != 0) {
        let cnt = temparr.length;
        let index = Math.floor(Math.random() * cnt);
        let e = temparr[index];
        // console.log(e, index);
        eval(`${e}=2`);
        // eval(`${e}=2`);
        return e;
    }





    //try to more on rest places
    let middle = ["a12", "a21", "a23", "a32"];
    temparr = [];
    for (let i = 0; i < middle.length; i++) {
        let e = middle[i];
        if (eval(`${e}==0`)) {
            temparr.push(e);
        }
    }
    if (temparr.length != 0) {
        let cnt = temparr.length;
        let index = Math.floor(Math.random() * cnt);
        let e = temparr[index];
        eval(`${e}=2`);
        // eval(`${e}=2`);
        return e;
    }

    // console.log("draw");
    draw();
}
function draw() {
    winnerpara.textContent = "Aww The Game is draw Click on reset it will auto reset in 3 seconds!";
    winnerpara.classList.remove("hidden")
    setTimeout(reset, 2000);
}
function gameover() {
    winnerpara.textContent = "Congoo! You have won the game!";
    winnerpara.classList.remove("hidden");
    setTimeout(reset, 2000);
}

function fun() {
    let comp = ComputerMove();
    // console.log("comp[u move is :", comp);
    let vec = ["a11", "a12", "a13", "a21", "a22", "a23", "a31", "a32", "a33"];
    let origo = [a11o, a12o, a13o, a21o, a22o, a23o, a31o, a32o, a33o];
    let origx = [a11x, a12x, a13x, a21x, a22x, a23x, a31x, a32x, a33x];
    let valg = [a11, a12, a13, a21, a22, a23, a31, a32, a33];

    if (player == 0) {
        for (let i = 0; i < vec.length; i++) {
            let e = vec[i];
            if (comp == e) {
                origo[i].classList.remove("hidden");
                eval(`${e}= 2`);
                // console.log("eval working:", e, valg[i]);
                break;
            }
        }
    }
    else {
        for (let i = 0; i < vec.length; i++) {
            if (comp == vec[i]) {
                origx[i].classList.remove("hidden")
                const ab = vec[i];
                eval(`${ab}= 2`);
                break;
            }
        }
    }
    let test = iswinner();
    if (test == true) {
        if (winner == 2) {
            winnerpara.textContent = "The computer has beaten you! You lose.";
            winnerpara.classList.remove("hidden")
            setInterval(reset,2000);
        }
    }
}
function arr11() {
    if (a11 == 0) {
        a11 = 1;
        if (chance % 2 == 0) {
            a11x.classList.remove("hidden");
        }
        else {
            a11o.classList.remove("hidden");
        }
        let temp = iswinner();
        if (temp != true) {
            fun();
        }
        else {
            gameover();
        }
    }
}
function arr12() {
    if (a12 == 0) {
        a12 = 1;
        if (chance % 2 == 0) {
            a12x.classList.remove("hidden");
        }
        else {
            a12o.classList.remove("hidden");
        }
        let temp = iswinner();

        if (temp != true) {
            fun();
        }
        else {
            gameover();
        }
    }

}
function arr13() {
    if (a13 == 0) {
        a13 = 1;
        if (chance % 2 == 0) {
            a13x.classList.remove("hidden");
        }
        else {
            a13o.classList.remove("hidden");
        }
        let temp = iswinner();

        if (temp != true) {
            fun();
        }
        else {
            gameover();
        }
    }
}
function arr21() {
    if (a21 == 0) {
        a21 = 1;
        if (chance % 2 == 0) {
            a21x.classList.remove("hidden");

        }
        else {
            a21o.classList.remove("hidden");

        }
        let temp = iswinner();

        if (temp != true) {
            fun();
        }
        else {
            gameover();
        }
    }
}
function arr22() {
    if (a22 == 0) {
        a22 = 1;
        if (chance % 2 == 0) {
            a22x.classList.remove("hidden");

        }
        else {
            a22o.classList.remove("hidden");

        }
        let temp = iswinner();

        if (temp != true) {
            fun();
        }
        else {
            gameover();
        }
    }
}
function arr23() {
    if (a23 == 0) {
        a23 = 1;
        if (chance % 2 == 0) {
            a23x.classList.remove("hidden");

        }
        else {
            a23o.classList.remove("hidden");

        }
        let temp = iswinner();

        if (temp != true) {
            fun();
        }
        else {
            gameover();
        }
    }
}
function arr31() {
    if (a31 == 0) {
        a31 = 1;
        if (chance % 2 == 0) {
            a31x.classList.remove("hidden");
        }
        else {
            a31o.classList.remove("hidden");
        }
        let temp = iswinner();

        if (temp != true) {
            fun();
        }
        else {
            gameover();
        }
    }
}
function arr32() {
    if (a32 == 0) {
        a32 = 1;
        if (chance % 2 == 0) {
            a32x.classList.remove("hidden");
        }
        else {
            a32o.classList.remove("hidden");
        }
        let temp = iswinner();

        if (temp != true) {
            fun();
        }
        else {
            gameover();
        }
    }
}

function arr33() {
    if (a33 == 0) {
        a33 = 1;
        if (chance % 2 == 0) {
            a33x.classList.remove("hidden");
        }
        else {
            a33o.classList.remove("hidden");
        }
        let temp = iswinner();

        if (temp != true) {
            fun();
        }
        else {
            gameover();
        }
    }
}

// let val=0.5;
//svg animation
// logo.forEach((e)=>{
//     e.style.strokeDasharray=`${e.getTotalLength()}`;
//     e.style.strokeDashoffset=`${e.getTotalLength()}`;
//     e.classList.add("anim");
//     e.style.animationDuration=val+"s";
//     // val+=0.2;

// })
window.xclick=xclick;
window.oclick=oclick;
window.arr11=arr11;
window.arr12=arr12;
window.arr13=arr13;
window.arr21=arr21;
window.arr22=arr22;
window.arr23=arr23;
window.arr31=arr31;
window.arr32=arr32;
window.arr33=arr33;
window.fun=fun;
window.gameover=gameover;
window.ComputerMove=ComputerMove;
window.iswinner=iswinner;
window.reset=reset;
window.draw=draw;
