const boardBtn = document.querySelectorAll("body main div.board button");

let numerado = [
	"0", "1", "2",
	"3", "4", "5",
	"6", "7", "8"];

let board = [
	"", "", "",
	"", "", "",
	"", "", ""];
const win = ["012", "345", "789", "036", "147", "258", "048", "246"];
let points = { X: 0, O: 0 };
let playerMove = "X";

window.onload = () => main();
function main() {
	for (let i = 0; i < boardBtn.length; i++)
		boardBtn[i].addEventListener("click", () => move(i));
}

function move(i) {
	if (!board[i]) {
		boardBtn[i].innerHTML = playerMove;
		if (playerMove == "X") playerMove = "O";
		else playerMove = "X";
		checkWin();
	} else console.log("Ocupado");
}

function checkWin() {
	
}