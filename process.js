// My javascript thought process without sockiet and express.

function getGameRandomNumber() {
    let randomNumber = parseInt(Math.random() * 100);
    if (randomNumber < 2) {
        getGameRandomNumber();
    } 
    return randomNumber;
  }

  let currentValue = getGameRandomNumber();
//   let currentValue = 56;
  console.log("start", currentValue);  

  function gameOfThree(currentValue) {
      let allowedNums = [1, -1, 0 ]
      for (const num of allowedNums) {
          console.log(num);
          if ((Number(currentValue) + num) % 3 === 0) {
            currentValue = (Number(currentValue) + num) / 3;
            break;
          } 
        }
        console.log(currentValue); 
        if (currentValue === 1) {
            console.log('WIN!!');
            return "WIN!"
        } else {
            gameOfThree(currentValue)
        }        
    }
    
    gameOfThree(currentValue)