export default class Board {
	constructor() {
		this.init();
	}

	init() {
		this.playersSymbols = ["X", "O"];

		this.actualPlayer = this.playersSymbols[0];

		this.winCom = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],

			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],

			[0, 4, 8],
			[2, 4, 6]
		];

		this.reset();
	}

	reset() {
		this.state = [
			"", "", "",
			"", "", "",
			"", "", ""
		];

		// this.state = ["X", "O", "", "", "O", "", "", "", "O"]; // Basic Start
		// this.state = ["X", "X", "X", "", "O", "", "", "", "O"]; // Win X
		// this.state = ["X", "O", "", "O", "O", "O", "", "X", "O"]; // Win O

		this.isGameOver = false;
		this.winPlayer = null;

		this.printConsoleBoard();
	}

	printConsoleBoard() {
		// Function stole from https://alialaa.com/blog/tic-tac-toe-js
		let formattedString = '';
		this.state.forEach((cell, index) => {
			formattedString += cell ? ` ${cell} |` : '   |';
			if ((index + 1) % 3 === 0) {
				formattedString = formattedString.slice(0, -1);
				if (index < 8) formattedString += '\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n';
			}
		});
		console.log('%c' + formattedString, 'color: #c11dd4;font-size:16px');
	}

	isEmpty() {
		return this.state.every(cell => cell === "");
	}

	isFull() {
		return this.state.every(cell => cell);
	}

	checkGameOver() {
		if (this.isEmpty()) {
			this.isGameOver = false;
			return false;
		}

		for (let i = 0; i < this.playersSymbols.length; i++) {
			this.isGameOver = this.checkComb(this.playersSymbols[i]);
			if (this.isGameOver) return true;
		}

		if (this.isFull()) {
			this.isGameOver = true;
			return true;
		}

		this.isGameOver = false;
		return false;
	}

	checkComb(player) {
		for (let i = 0; i < this.winCom.length; i++) {
			let isWin = true;
			for (let j = 0; j < this.winCom[i].length; j++) {
				const cell = this.winCom[i][j];
				isWin = this.state[cell] === player && isWin;
			}
			if (isWin) {
				this.winPlayer = player;
				return isWin;
			}
		}
		return false;
	}

	getAvailableMoves() {
		if (this.isGameOver) return;

		const availableMoves = [];
		this.state.map((s, i) => {
			if (!s) availableMoves.push(i);
		});
		return availableMoves;
	}

	move(position) {
		if (!this.state[position] && !this.isGameOver) {
			this.state[position] = this.actualPlayer;
			this.update();
			return true;
		}
		return false;
	}

	switchPlayer() {
		if (this.actualPlayer === this.playersSymbols[0]) this.actualPlayer = this.playersSymbols[1];
		else this.actualPlayer = this.playersSymbols[0];
	}

	update() {
		if (this.isGameOver) return;
		this.checkGameOver();
		this.switchPlayer();
		this.printConsoleBoard();
	}
}
