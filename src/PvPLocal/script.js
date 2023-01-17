const positionButtons = document.querySelectorAll("button.position");

class Player {
	constructor(symbol, scoreUI, name = "Player " + symbol) {
		this.symbol = symbol;
		this.name = name;
		this.score = 0;
		this.scoreUI = scoreUI;
	}

	setScore(score) {
		this.score = score;
		this.scoreUI.innerHTML = this.score;
	}

	setName(name) {
		this.name = name;
	}
}

const COLORS = {
	win: "green",
	normal: "#252525",
	X: "red",
	O: "blue",
}

const players = [
	new Player("X", document.getElementById("ScoreXSpan")),
	new Player("O", document.getElementById("ScoreOSpan"))
];

const board = [
	"0", "1", "2",
	"3", "4", "5",
	"6", "7", "8"
];

const win = [
	// Horizontal
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],

	// Vertical
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],

	// Diagonal
	[0, 4, 8],
	[2, 4, 6]
];

let gameOver = false;
let moves = 0;

window.onload = () => {
	// Reset buttons
	positionButtons.forEach((btn, index) => btn.addEventListener("click", () => move(index)));
	start();
}

document.getElementById("NewBoard").addEventListener("click", start);
document.getElementById("Reset").addEventListener("click", () => {
	players.forEach(player => player.setScore(0));
	start();
});

function start() {
	gameOver = false;

	positionButtons.forEach(btn => {
		btn.innerHTML = "";
		btn.style.backgroundColor = COLORS.normal;
		btn.disabled = false;
	});

	board.forEach((p, i) => board[i] = "");
}

function move(buttonIndex) {
	if (gameOver) return alert("Game Over!");
	if (board[buttonIndex]) return alert("Cell it's occupied");

	const button = positionButtons[buttonIndex];
	const playerPlaying = moves % 2 ? players[1].symbol : players[0].symbol;

	button.innerHTML = playerPlaying;
	button.disabled = true;
	board[buttonIndex] = playerPlaying;

	if (playerPlaying === players[0].symbol) button.style.backgroundColor = COLORS.X;
	else button.style.backgroundColor = COLORS.O;

	moves++;

	checkWin();
}

function checkWin() {
	for (let i = 0; i < players.length; i++) {
		const player = players[i];
		const { symbol } = player;

		for (let j = 0; j < win.length; j++) {
			const cells = [win[j][0], win[j][1], win[j][2]];

			if (board[cells[0]] === symbol && board[cells[1]] === symbol && board[cells[2]] === symbol) {
				cells.forEach(c => positionButtons[c].style.backgroundColor = COLORS.win);
				gameOver = true;

				player.setScore(player.score + 1);

			}
		}
	}
}
