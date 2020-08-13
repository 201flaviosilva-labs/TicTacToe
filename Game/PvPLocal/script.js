const boardBtn = document.querySelectorAll("body main div.board button");
const ScoreXSpan = document.getElementById("ScoreXSpan");
const ScoreOSpan = document.getElementById("ScoreOSpan");

let board = [
	"0", "1", "2",
	"3", "4", "5",
	"6", "7", "8"];

const win = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],

	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],

	[0, 4, 8],
	[2, 4, 6]
];

let symbols = ["X", "O"];
let score = { X: 0, O: 0 };
let playerMove = symbols[0];
let gameOver = false;

for (let i = 0; i < boardBtn.length; i++)  boardBtn[i].addEventListener("click", () => move(i));

document.getElementById("Reset").addEventListener("click", () => {
	score.X = 0;
	score.O = 0;
	ScoreXSpan.innerHTML = score.X;
	ScoreOSpan.innerHTML = score.O;
	main();
});

document.getElementById("NewBoard").addEventListener("click", main);
window.onload = () => main();
function main() {
	gameOver = false;
	for (let i = 0; i < boardBtn.length; i++) {
		board[i] = "";
		boardBtn[i].innerHTML = "";
		boardBtn[i].style.backgroundColor = "#252525";
		boardBtn[i].disabled = false;
	}
}

function move(i) {
	console.log("beep");
	if (!gameOver) {
		if (!board[i]) {
			boardBtn[i].innerHTML = playerMove;
			boardBtn[i].disabled = true;
			board[i] = playerMove;
			if (playerMove == symbols[0]) {
				boardBtn[i].style.backgroundColor = "red";
				playerMove = symbols[1];
			}
			else {
				boardBtn[i].style.backgroundColor = "blue";
				playerMove = symbols[0];
			}
			checkWin();
		} else alert("Cell Ocupated");
	} else alert("Game Over!");
}

function checkWin() {
	for (let s of symbols) {
		for (let i = 0; i < win.length; i++) {
			if (board[win[i][0]] == s && board[win[i][1]] == s && board[win[i][2]] == s) {
				boardBtn[win[i][0]].style.backgroundColor = "green";
				boardBtn[win[i][1]].style.backgroundColor = "green";
				boardBtn[win[i][2]].style.backgroundColor = "green";
				gameOver = true;
				if (s == symbols[0]) {
					score.X++;
					ScoreXSpan.innerHTML = score.X;
				}
				else {
					score.O++;
					ScoreOSpan.innerHTML = score.O;
				}
			}
		}
	}
}
