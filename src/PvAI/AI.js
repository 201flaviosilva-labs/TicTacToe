import { randomNumber } from "../Utils.js";

export default class AI {
	constructor() {
	}

	minMax(board, isAI = false) { // TODO: Not yet implemented
		// Tutorial from:
		// - https://alialaa.com/blog/tic-tac-toe-js-minimax
		// - https://www.youtube.com/watch?v=ovr2sTYhb1I
		if (board.checkComb("O")) return { evaluation: +10 };
		if (board.checkComb("X")) return { evaluation: -10 };
		if (board.isFull()) return { evaluation: 0 };

		const availableMoves = board.getAvailableMoves();

		const moves = [];

		for (let i = 0; i < availableMoves.length; i++) {
			// GET THE ID OF THE EMPTY SPACE
			const id = availableMoves[i];

			// BACK UP THE SPACE
			const backup = board.state[id];
			// console.log(backup);

			// MAKE THE MOVE FOR THE PLAYER
			board.state[id] = board.actualPlayer;

			// SAVE THE MOVE'S ID AND EVALUATION
			const move = { id: id };

			// THE MOVE EVALUATION
			console.log(this);
			if (isAI) move.evaluation = this.minimax(board, false).evaluation;
			else move.evaluation = this.minimax(board, true).evaluation;

			// RESTORE SPACE
			board.state[id] = backup;

			// SAVE MOVE TO MOVES ARRAY
			moves.push(move);
		}

		// // MINIMAX ALGORITHM
		// let bestMove;

		// if (isAI) {
		// 	// MAXIMIZER
		// 	let bestEvaluation = -Infinity;
		// 	for (let i = 0; i < moves.length; i++) {
		// 		if (moves[i].evaluation > bestEvaluation) {
		// 			bestEvaluation = moves[i].evaluation;
		// 			bestMove = moves[i];
		// 		}
		// 	}
		// } else {
		// 	// MINIMIZER
		// 	let bestEvaluation = +Infinity;
		// 	for (let i = 0; i < moves.length; i++) {
		// 		if (moves[i].evaluation < bestEvaluation) {
		// 			bestEvaluation = moves[i].evaluation;
		// 			bestMove = moves[i];
		// 		}
		// 	}
		// }

		// return bestMove;
	}

	randomMove(board) { // Basic AI
		const availableMoves = board.getAvailableMoves();
		if (availableMoves) {
			const randomPosition = availableMoves[randomNumber(0, availableMoves.length - 1)];
			board.move(randomPosition);
		}
	}
}
