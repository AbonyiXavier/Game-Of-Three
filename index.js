const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const getGameRandomNumber = async () => {
  let randomNumber = parseInt(Math.random() * 100);
  if (randomNumber < 2) {
    await getGameRandomNumber();
  }
  return randomNumber;
};

// app.get("/playgame", async (req, res) => {
//   try {
//     let currentValue = await getGameRandomNumber();
//     console.log("start", currentValue);

//     const gameOfThree = async (currentValue) => {
//       let allowedNums = [1, -1, 0];
//       for (const num of allowedNums) {
//         console.log(num);
//         if ((Number(currentValue) + num) % 3 === 0) {
//           currentValue = (Number(currentValue) + num) / 3;
//           break;
//         }
//       }
//       console.log("yea", currentValue);

//       if (currentValue === 1) {
//         console.log("WIN!!");
//         return res.send("WIN!");
//       } else {
//           await gameOfThree(currentValue);
//       }
//     };

//     await gameOfThree(currentValue);
//   } catch (error) {
//     console.log(error);
//   }
// });

let numberOfPlayers = 0;

io.on("connection", async (socket) => {
//   console.log("players", Number(numberOfPlayers));

  let player = Number(numberOfPlayers);

  if (Number(numberOfPlayers) > 2) {
    socket.emit("kickout");
    socket.disconnect(true);
    console.log(`Player ${player} with ${socket.id} logged out`);
    return;
  }

  numberOfPlayers += 1;

  socket.emit("player", player);
  console.log(`Player ${numberOfPlayers} with ${socket.id} connected`);

  // Disconnect player
  socket.on("disconnect", () => {
    console.log(`Player ${player} with ${socket.id} disconnected`);
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
          console.log(num);
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

const port = 3000;

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});