const gameBoard = document.querySelector('#game-board');
const rows = document.querySelectorAll('.rows')
let chipContainer;
const startGame = document.querySelector('#start-game');
const startBtn =  document.querySelector('#start-button');
const endGame = document.querySelector('#end-game')
const endGameH2 = document.querySelector('h2')
const endBtn = document.querySelector('#end-button')
let colors
// const playerColors = new Players
const players  = {
  player1: 1,
  player2: 0
}

class Players {
  constructor(color1, color2) {
    this.color1 = color1;
    this.color2 = color2;
  }
  color1(){
    return this.color1
  }
  color2(){
    return this.color2
  }
  
}


class ChipRows {
  //Creates an object with the individual chips divided by rows
  //when the board was first created it was divided up into 7 rows. 
  //I use document.querySelecotrAll to get take these rows and then 
  //spread them out in an array. Each key number coresponds to the row 
  //that the array contains. 
  individualChips() {
    return  {
      1: [...document.querySelectorAll('#row1 .chip-container')],
      2: [...document.querySelectorAll('#row2 .chip-container')],
      3: [...document.querySelectorAll('#row3 .chip-container')],
      4: [...document.querySelectorAll('#row4 .chip-container')],
      5: [...document.querySelectorAll('#row5 .chip-container')],
      6: [...document.querySelectorAll('#row6 .chip-container')],
      7: [...document.querySelectorAll('#row7 .chip-container')]
    }
    }
    //This will create an object to use for checking perpendicular 
    //matches by switching the rows from Y axis to x axis. 
    perpChips() {
      const chips = this.individualChips(); 
      const perpChips = {
        0: [],
        1: [], 
        2: [], 
        3: [], 
        4: [], 
        5: [], 
        6: [], 
        7: [], 
        8: []
      }
      /*
      To do this I use this simple algorithm. It contains 2 loops, 1 nested inside the other. 

      This first loop initializes 'i' to 1. This will be used to access the key of the original
      chips object. 

      The second loop inside initializes 'j' to 0. This second loop is where the reorganization 
      happens. I push on to the new 'perpChips' object of arrays by spreading the old objects
      array accross the new arrays. Each new array in 'perpChip gets one of the values found in the 
      previous 'chips' array. By spread the old array across multiple arrays I am able to change the
      axis of the rows.
      */
      for(let i = 1; i <= 7; i++){
        for(let j = 0; j <= 8; j++){
          perpChips[j].push(chips[i][j])
        }
      }
      return perpChips 
    }
}

const chipRows = new ChipRows;


class CheckWins {

constructor(color) {
  this.color = color 
}

/*
The way this works is I itterate over all the array verically. When I find a chip that 
conatins the class list of the specified color i start to iterate backwards. There are 9 keys in 
the object that contains the chips. I start going from 0-1-2-3-4-5-6-7-8. This is different from the diagLeft() because 
I am itterating up vs down. I then check the next array item by 1+= the 
index number of the previously confirmed chip. If it passes all 4 rounds that means a match was found. I then call the whoWins()
function and pass in the color that won. I added breaks that will stop execution 
of code if it falls out of the range of either the array or keys. 

I pass in the current player because any chips that they have on the board will have 'player1' or 'player2' in
the class list. I will later on use this for the matching process.  
*/

diagRight(player) {
   //I create a variable that will hold an object containing arrays that correspond to the x axis of the board
  const chips = chipRows.perpChips(); 
    //next I start itterating over this object. 
  
    //This first for loop will go over every key in the object itterating backwards to 0
  for(let i = 0; i <= 8; i++){
     //Once inside this for loop the next conditions will test to see if there is a match inside the array
    for(let j = 0; j <= 6; j++){
      let key = i; 
      let arrIndex = j;

      //from this point forward using the 'i' from the first loop to represent the key in the chips object
        //and 'j' from this second loop to represent the index of the array found at that keys 'value' we start 
        //the process of checking to see if there is a match diagonally.
  
        //first check to see if the current chip from the array has a class list of either 'player1' or 'player2' 
        //(which was passed in earlier as a param). If this is true then I move forward with the checking process
      if(chips[key][arrIndex].classList.contains(player)){
         //to achieve the diagonal matching process I use the following 4 'if statments'.
          
          //first I check to see if the the index is either 0 or 6. I 'break' if this is true because continuing 
          //forward will lead to trying to trying to access a value outside of the array [since the array is only 0-6]
        if(key >= 8 || arrIndex >= 6){
          break
        } else{
            //if the previous condition is false I move forward with the match process. To do this I +1 from the 
            //'key' variable and +1 to the 'arrIndex' (which contains the value of j). This effectivley moves you 
            //one row 'down' and one chip to the 'right'. 
          key+=1; 
          arrIndex+=1;
        }

        //The above process then continues 3 more times
          if(chips[key][arrIndex].classList.contains(player)){
            if(key >= 8 || arrIndex >= 6){
              break
            } else{
              key+=1; 
              arrIndex+=1;
            }
              if(chips[key][arrIndex].classList.contains(player)){
                if(key >= 8 || arrIndex >= 6){
                  break
                } else{
                  key+=1; 
                  arrIndex+=1;
                }
                 //on the third and final time of matching we have a full set of 4 matching chips
                  if(chips[key][arrIndex].classList.contains(player)){
                     //Now I check to see if player 1 wins (by checking to see if the player param is === to 'player1')
                    if(player === 'player1'){
                       //if this is true I call the 'whoWins()' function and pass in player 1 as the winner
                      this.whoWins(4,0)
                    } else {
                      //if else i pass in player2 as the winner. 
                      this.whoWins(0,4)
                    }
                  }
                }
              }
            }
          }
        }
      } 
/*
The way this works is I itterate over all the array verically. When I find a chip that 
conatins the class list of the specified color i start to iterate backwards. There are 9 keys in 
the object that contains the chips. I start going back from 8-7-6-5-4-3-2-1-0. I then check the next array item by 1+= the 
index number of the previously confirmed chip. If it passes all 4 rounds that means a match was found. I then call the whoWins()
function and pass in the color that won. I added breaks that will stop execution 
of code if it falls out of the range of either the array or keys. 

I pass in the current player because any chips that they have on the board will have 'player1' or 'player2' in
the class list. I will later on use this for the matching process.  
*/
diagLeft(player) {
  //I create a variable that will hold an object containing arrays that correspond to the x axis of the board
  const chips = chipRows.perpChips(); 
  //next I start itterating over this object. 

  //This first for loop will go over every key in the object itterating backwards to 0
  for(let i = 8; i >= 0; i-=1){
    //Once inside this for loop the next conditions will test to see if there is a match inside the array
    for(let j = 0; j <= 6; j++){
      let key = i; 
      let arrIndex = j;

      //from this point forward using the 'i' from the first loop to represent the key in the chips object
      //and 'j' from this second loop to represent the index of the array found at that keys 'value' we start 
      //the process of checking to see if there is a match diagonally.

      //first check to see if the current chip from the array has a class list of either 'player1' or 'player2' 
      //(which was passed in earlier as a param). If this is true then I move forward with the checking process
      if(chips[key][arrIndex].classList.contains(player)){
        //to achieve the diagonal matching process I use the following 4 'if statments'.
        
        //first I check to see if the the index is either 0 or 6. I 'break' if this is true because continuing 
        //forward will lead to trying to trying to access a value outside of the array [since the array is only 0-6]
        if(key <= 0 || arrIndex >= 6){
          break
        } else{
          //if the previous condition is false I move forward with the match process. To do this I -1 from the 
          //'key' variable and +1 to the 'arrIndex' (which contains the value of j). This effectivley moves you 
          //one row 'up' and one chip to the 'left'. 
          key-=1; 
          arrIndex+=1;
        }

        //The above process then continues 3 more times
          if(chips[key][arrIndex].classList.contains(player)){
            if(key <= 0 || arrIndex >= 6){
              break
            } else{
              key-=1; 
              arrIndex+=1;
            }
              if(chips[key][arrIndex].classList.contains(player)){
                if(key <= 0 || arrIndex >= 6){
                  break
                } else{
                  key-=1; 
                  arrIndex+=1;
                }
                //on the third and final time of matching we have a full set of 4 matching chips
                  if(chips[key][arrIndex].classList.contains(player)){
                    //Now I check to see if player 1 wins (by checking to see if the player param is === to 'player1')
                    if(player === 'player1'){
                      //if this is true I call the 'whoWins()' function and pass in player 1 as the winner
                      this.whoWins(4,0)
                    } else {
                      //if else i pass in player2 as the winner. 
                      this.whoWins(0,4)
                    }
                  }
                }
              }
            }
          }
        }
      } 

//this check to see if 4 chips have been aligned in a row vertically
//THIS ONE IS DONE AND
verticle() {
  //first I initialize the variable of 'chips' and store the object of arrays inside of it that 
  //conatins all of the y axis rows 
  const chips = chipRows.individualChips();
    /* 
  Next I initialize 2 for loops. 
  
  The first loop is to traverse across every row starting from 1 all the way to 7. I use the
  value of 'i' to access the keys in the chips object which will contain the coresponding array 
  containing the chips. 

  I also initialize 3 variable that will be used in the matching process. They will 
  contain values that will determine who wins. the first 2 will contain the counts to
  determine if player1 or player2 one. The second will contain the previous chip used to
  determin if there is a match in color between the previous chip and the current chip. 
  */ 
  for(let i = 1; i <= 7; i++){
    let player1 = 0;
    let player2 = 0;
    let lastChip;

    //now once inside the loop i use a 'for of' loop to access each individual chips inside of the 
    //the chips array found at the key of 'i' . 

    // First I check if the chip has a class name that signifes it belongs to player1. 
    // if so I check to see if the lastChip varaible has the value that is not of player1. 
    //If the value is not equal to player1 Then I set the player1 vaiable back to 1. 
    //If the player1 variable does have a match to lastChip then I +1 the player1 variable
    //and then set the last chip to player1. Every time the loop happens I check to see if either
    //player1 or player2 has one by calling 'this.whoWins()' and passing in the values of player1
    //and player 2. 

    //I repeat the same process in the else if loop below

    for(let chip of chips[i]){
      if(chip.className === 'chip-container player1') {
        lastChip !== 'player1' ? (player1 = 1) && (lastChip = 'player1') : player1 = player1 + 1;
        this.whoWins(player1, player2)
      } else if(chip.className === 'chip-container player2') {
        lastChip !== 'player2' ? (player2 = 1) && (lastChip = 'player2') : player2 = player2 + 1;
        this.whoWins(player1, player2)
      }
    }
  }
}

//This does almost the same as the vertical() function but it 
//Checks against the perpendicular axis
perp() {
  //first I initialize the variable of 'chips' and store the object of arrays inside of it that 
  //conatins all of the x axis rows 
  const chips = chipRows.perpChips();
  /* 
  Next I initialize 2 for loops. 
  
  The first loop is to traverse across every row starting from 0 all the way to 8. I use the
  value of 'i' to access the keys in the chips object which will contain the coresponding array 
  containing the chips. 

  I also initialize 3 variable that will be used in the matching process. They will 
  contain values that will determine who wins. the first 2 will contain the counts to
  determine if player1 or player2 one. The second will contain the previous chip used to
  determin if there is a match in color between the previous chip and the current chip. 
  */ 
  for(let i = 0; i <= 8; i++){
    let player1 = 0;
    let player2 = 0;
    let lastChip;

    //now once inside the loop i use a 'for of' loop to access each individual chips inside of the 
    //the chips array found at the key of 'i' . 

    // First I check if the chip has a class name that signifes it belongs to player1. 
    // if so I check to see if the lastChip varaible has the value that is not of player1. 
    //If the value is not equal to player1 Then I set the player1 vaiable back to 1. 
    //If the player1 variable does have a match to lastChip then I +1 the player1 variable
    //and then set the last chip to player1. Every time the loop happens I check to see if either
    //player1 or player2 has one by calling 'this.whoWins()' and passing in the values of player1
    //and player 2. 

    //I repeat the same process in the else if loop below

    //And if no matches are found player1 and player2 a set back to 0. 
    for(let chip of chips[i]){
      if(chip.className === 'chip-container player1') {
        lastChip !== 'player1' ? player1 = 1 : player1 = player1 + 1;
        lastChip = 'player1'
        this.whoWins(player1, player2)
      } else if(chip.className === 'chip-container player2') {
        lastChip !== 'player2' ? player2 = 1 : player2 = player2 + 1;
        lastChip = 'player2'
        this.whoWins(player1, player2)
      } else{
        player1 = 0;
        player2 = 0;
      }
    }
  }
} 

//This will check to see if player1 or player2 has won when called. 
//The it does this by evaluating the the 2 params that are passed in. 

//if player1 === 4 then player1 wins and the game ends. Clicks are disabled and the DOM is upated 
//to say player1 wins. The same happens if player2 === 4. 
whoWins(player1, player2) {
  if(player1 === 4){
    endGameH2.innerHTML = 'PLayer 1 Wins!'
    endGame.classList.add('endGame')
    eventListeners.disableClick()
  } else if(player2 === 4){
    endGameH2.innerHTML = 'Player 2 Wins!'
    endGame.classList.add('endGame')
    eventListeners.disableClick()
  }
}

}

//this initializes the class and allows me to access all the properties. 
const checkWinner = new CheckWins

//this function will call 4 other functions that will checkt to see if there are any winners
function checkWin(player) {
checkWinner.diagRight(player);
checkWinner.diagLeft(player);
checkWinner.verticle();
checkWinner.perp();
}



//This class is used to create new chips. 

class AddChip {

//the 2 constructors to pass in are what color the last chip was (which will determine what color 
//the current chip should be), and the event where the click happened in order to find out where to 
//place the new chip.
constructor(lastChip, e) {
  this.lastChip = lastChip
  this.e = e
}
//this should create a new red or yellow chip and append it to the 
//containerCip div. It also adds a class to the container span 
//that says what color is in the div. 



/* 

*/
newChip(chips, color) {
  const newChip = document.createElement('div')
  if(color === colors.color1) {
    newChip.className = colors.color1;
    chips.classList.add('player1');
    checkWin('player1')
  } else {
    newChip.className = colors.color2;
    chips.classList.add('player2');
    checkWin('player2')
  }
  chips.append(newChip);
}

//this function will decied which chip should be selected
whatColor(chips, e) {
if(players.player1 > players.player2) { 
  this.newChip(chips, colors.color1 , e);
  players.player2 = players.player2 + 1; 
} else {
  this.newChip(chips, colors.color2, e)
  players.player1 = players.player1 + 1;
}
}

//This ensures that the last chip is selected on the board. 
//Then it passes in the whatColor() function when the last container 
//is selected to finish deciding what color should go in there

//to accomplish this I initiate 'chip' to = the 'lastChip' param that was passed in. 

//If 'chip' === 'null' then I return. 

//else if 
bottomSelector(lastChip,e) {
let chips = lastChip;
for(let i = 0; i < 9; i++){
if(chips === null) {
  return
} else if(chips.className === 'chip-container') {
  return this.whatColor(chips, e)
} else {
chips = chips.previousSibling
}
}
}

}

const addChip = new AddChip;


class EventListener {
 
constructor(e){
  this.e = e;
}
//This is the event listener that will be added when enableClicks
//is called and removed when  disableCLicks is called

addEventListener(e) {
  const lastChip = e.target.parentElement.lastElementChild
  addChip.bottomSelector(lastChip, e)
}

//This function will add an event listener to all the chip containers
//and when a block is clicked, will call the whichChip function to see
//if it should be red or yellow
enableClicks() {
for(let row of rows){
  row.addEventListener('click', this.addEventListener)
}
}

disableClick() {
  for(let row of rows){
    row.removeEventListener('click', this.addEventListener)
  }
}
}

const eventListeners = new EventListener

//This adds an event listener on the start button. When the start button
//is clicked, the enableClicks() function will then be called to prevent
//unwanted clicks
startBtn.addEventListener('click', () => {
  startGame.classList.toggle('startGame');
  colors = new Players(document.querySelector('#player1').value, document.querySelector('#player2').value)
  
  eventListeners.enableClicks();
  })
  
  endBtn.addEventListener('click', () => {
    location.reload();
  })


//This will create all the new chips when the DOM is loaded.
 document.addEventListener('DOMContentLoaded', () => {
   for(let row of rows){
      for(let i = 0; i <= 8; i++) {
     const chipContainer = document.createElement('div');
     chipContainer.className = 'chip-container'
     row.append(chipContainer)
  }
   }
   chipContainer = document.querySelectorAll('.chip-container');
 })