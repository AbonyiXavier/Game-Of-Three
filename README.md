# Game-Of-Three
The goal is to implement a game with two independent units – the players – communicating with each other using an API.

# Description
When a player starts, it incepts a random (whole) number and sends it to the second player as an approach to starting the game.
The receiving player can now always choose between adding one of {-1, 0, 1} to get to a number that is divisible by 3. Divide it by three. The resulting whole
number is then sent back to the original sender. The same rules are applied until one player reaches the number 1 (after the division).


# Getting Started

Click link to view diagram of my architecture [url]()

To obtain a copy of this app download or clone the repository at this [url](https://github.com/AbonyiXavier/Game-Of-Three)

# Prerequisites

You must have

- NodeJs Installed
- A browser Installed
- An Internet connection to download the dependencies.

## Installing locally

- (If the repository wasn't cloned)Extract the contents of the downloaded zip file into any suitable location on the computer
- In the command prompt, cd to the root of the directory you extracted the app into
- Run 'npm install' to install all dependencies
- Run 'npm run dev' to start the application
- In a browser address bar navigate to 'http://localhost:3000'


## Built With

- NodeJs
- Express
- Socket.io


## Author

- AbonyiXavier
