const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const getGameRandomNumber = async () => {
  let randomNumber = parseInt(Math.random() * 100);
  if (randomNumber < 2) {
    await getGameRandomNumber();
  }
  return randomNumber;
};


let numberOfPlayers = 0;

io.on("connection", async (socket) => {

  let player = Number(numberOfPlayers);

  if (Number(numberOfPlayers) > 2) {
    socket.emit("kickout");
    socket.disconnect(true);
    console.log(`Player ${player} with ID: ${socket.id} logged out`);
    return;
  }

  numberOfPlayers += 1;

  socket.emit("player", player);
  console.log(`Player ${numberOfPlayers} with ID: ${socket.id} connected`);

  // Disconnect player
  socket.on("disconnect", () => {
    console.log(`Player ${player} with ID: ${socket.id} disconnected`);
  });

  if (player === 1) {
    let playerRandomNumber = await getGameRandomNumber();
    socket.emit("start number", playerRandomNumber);
    console.log(
      `Player ${player} starts with random number ${playerRandomNumber}`
    );
    if (player) {
      const gameOfThree = async (playerRandomNumber) => {
        let allowedNums = [1, -1, 0];
        for (const num of allowedNums) {
          if ((Number(playerRandomNumber) + num) % 3 === 0) {
            playerRandomNumber = (Number(playerRandomNumber) + num) / 3;
            break;
          }
        }
        socket.emit("output from divided number", { data: playerRandomNumber });
        console.log("output from divided number", playerRandomNumber);

        if (playerRandomNumber === 1) {
          socket.emit("game is over", { win: true });
          console.log("WIN!!");
        } else {
          socket.broadcast.emit("number", playerRandomNumber);
          await gameOfThree(playerRandomNumber);
        }
      };

      await gameOfThree(playerRandomNumber);
    }
  }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});


