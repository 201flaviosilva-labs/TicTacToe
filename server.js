const express = require("express")();
const http = require("http").Server(express);
const socket = require("socket.io")(http);

socket.on("connection", () => {
	console.log("connection");
	socket.emit("NewPlayer", "X");
});

http.listen(1000, () => {
	console.log("Beep 1000");
});
