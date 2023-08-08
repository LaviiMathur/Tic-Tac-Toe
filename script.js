//consts
const turnSound = new Audio("turn.mp3");
const overSound = new Audio("wrong.mp3");
let turn = "X";
let gameOver = false;
let h1 = document.querySelector("h1");
let info = document.getElementById("info");
let reset = document.querySelector(".reset");
let x_Score = document.querySelector(".x_Score");
let o_Score = document.querySelector(".o_Score");
let draw = document.querySelector(".draw");
let line = document.querySelector(".line");
let cells = document.getElementsByClassName("cell");
let arr = Array.from(cells);

//changeTurn
const changeTurn = () => {
  turn === "X" ? (turn = "O") : (turn = "X");
};

function cellClickHandler() {
  let cellText = this.querySelector(".text");
  if (cellText.innerText === "") {
    cellText.innerText = turn;
    turnSound.play();
    checkWin();
    changeTurn();
    if (!gameOver) {
      info.textContent = `${turn}'s Turn`;
    } else {
      overSound.play();
      reset.innerText = "Try again";
    }
  }
  //score update
  if (h1.innerText === "X Won") {
    x_Score.innerHTML++;
  } else if (h1.innerText === "O Won") {
    o_Score.innerHTML++;
  }
}
//check winner

function checkWin() {
  let cellText = document.getElementsByClassName("text");
  const wins = [
    [0, 1, 2, 0, 5, 0],
    [3, 4, 5, 0, 15, 0],
    [6, 7, 8, 0, 25, 0],
    [0, 3, 6, -10, 15, 90],
    [1, 4, 7, 0, 15, 90],
    [2, 5, 8, 10, 15, 90],
    [0, 4, 8, 0, 15, 45],
    [2, 4, 6, 0, 15, 135],
  ];

  wins.forEach(e => {
    if (
      cellText[e[0]].innerText === cellText[e[1]].innerText &&
      cellText[e[1]].innerText === cellText[e[2]].innerText &&
      cellText[e[0]].innerText !== ""
    ) {
      line.style.width = "30vw";
      line.style.transform = `translateX(${e[3]}vw) translateY(${e[4]}vw) rotate(${e[5]}deg)`;
      h1.innerHTML = `${turn} Won`;
      gameOver = true;
      arr.forEach(element => {
        element.removeEventListener("click", cellClickHandler);
      });
    }
  });
}
//gameLogic

arr.forEach(element => {
  element.addEventListener("click", cellClickHandler);
  // function cellClickHandler() {
  //   if (cellText.innerText === "") {
  //     cellText.innerText = turn;
  //     turnSound.play();
  //     checkWin();
  //     changeTurn();
  //     if (!gameOver) {
  //       info.textContent = `${turn}'s Turn`;
  //     } else {
  //       overSound.play();
  //       reset.innerText = "Try again";
  //     }
  //   }
  //   //score update
  //   if (h1.innerText === "X Won") {
  //     x_Score.innerHTML++;
  //   } else if (h1.innerText === "O Won") {
  //     o_Score.innerHTML++;
  //   }
  // }
});
//reset button
reset.addEventListener("click", () => {
  let cellText = document.querySelectorAll(".text");
  Array.from(cellText).forEach(element => {
    element.innerText = "";
    turn = "X";
    info.textContent = `${turn}'s Turn`;
    h1.innerHTML = "Tic Tac Toe";
    gameOver = false;
    reset.innerText = "Reset";
    line.style.width = "0px";
    arr.forEach(element => {
      element.addEventListener("click", cellClickHandler);
    });
  });
});
