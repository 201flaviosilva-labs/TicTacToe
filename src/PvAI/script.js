import Board from "./Board.js";
import AI from "./AI.js";

const board = new Board();
const ai = new AI();

const boardBtn = document.querySelectorAll("body main div.board button");
const ScoreXSpan = document.getElementById("ScoreXSpan");
const ScoreOSpan = document.getElementById("ScoreOSpan");

const score = { X: 0, O: 0 };

for (let i = 0; i < boardBtn.length; i++)  boardBtn[i].addEventListener("click", () => move(i));

document.getElementById("Reset").addEventListener("click", () => {
	score.X = 0;
	score.O = 0;
	ScoreXSpan.innerHTML = score.X;
	ScoreOSpan.innerHTML = score.O;
	board.init(); // Total Reset
	start();
});

document.getElementById("NewBoard").addEventListener("click", start);
window.onload = () => start();
function start() {
	board.reset(); // Partial Reset
	for (let i = 0; i < boardBtn.length; i++) {
		boardBtn[i].innerHTML = "";
		boardBtn[i].style.backgroundColor = "#252525";
		boardBtn[i].disabled = false;
	}

	if (board.actualPlayer === board.playersSymbols[1]) {
		console.log("AI");
		ai.randomMove(board);
		printBoardUI();
	}
}

function move(i) {
	const availableMove = board.move(i); // X
	if (availableMove) ai.randomMove(board);  // O

	printBoardUI();
	checkWin();
}

function printBoardUI() {
	console.log("Beep");
	for (let i = 0; i < board.state.length; i++) {
		const cell = board.state[i];

		boardBtn[i].innerHTML = cell;

		if (cell) boardBtn[i].disabled = true;

		if (board.playersSymbols[0] === cell) boardBtn[i].style.backgroundColor = "red";
		else if (board.playersSymbols[1] === cell) boardBtn[i].style.backgroundColor = "blue";

	}
}

function checkWin() {
	if (board.isGameOver) {
		if (board.winPlayer === board.playersSymbols[0]) {
			score.X++;
			ScoreXSpan.innerHTML = score.X;
		} else {
			score.O++;
			ScoreOSpan.innerHTML = score.O;
		}
	}
}
