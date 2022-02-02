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
    //matches
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
*/

diagRight(player) {
  const chips = chipRows.perpChips(); 
  for(let i = 0; i <= 8; i++){
    for(let j = 0; j <= 6; j++){
      let key = i; 
      let arrIndex = j;
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
              if(chips[key][arrIndex].classList.contains(player)){
                if(key >= 8 || arrIndex >= 6){
                  break
                } else{
                  key+=1; 
                  arrIndex+=1;
                }
                  if(chips[key][arrIndex].classList.contains(player)){
                    if(player === 'player1'){
                      this.whoWins(4,0)
                    } else {
                      this.whoWins(0,4)
                    }}}}}}}} 
/*
The way this works is I itterate over all the array verically. When I find a chip that 
conatins the class list of the specified color i start to iterate backwards. There are 9 keys in 
the object that contains the chips. I start going back from 8-7-6-5-4-3-2-1-0. I then check the next array item by 1+= the 
index number of the previously confirmed chip. If it passes all 4 rounds that means a match was found. I then call the whoWins()
function and pass in the color that won. I added breaks that will stop execution 
of code if it falls out of the range of either the array or keys. 
*/
diagLeft(player) {
  const chips = chipRows.perpChips(); 
  for(let i = 8; i >= 0; i-=1){
    for(let j = 0; j <= 6; j++){
      let key = i; 
      let arrIndex = j;
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
              if(chips[key][arrIndex].classList.contains(player)){
                if(key <= 0 || arrIndex >= 6){
                  break
                } else{
                  key-=1; 
                  arrIndex+=1;
                }
                  if(chips[key][arrIndex].classList.contains(player)){
                    if(player === 'player1'){
                      this.whoWins(4,0)
                    } else {
                      this.whoWins(0,4)
                    }}}}}}}} 

//this check to see if 4 chips have been aligned in a row vertically
//THIS ONE IS DONE AND
verticle() {
  const chips = chipRows.individualChips();
  for(let i = 1; i <= 7; i++){
    let player1 = 0;
    let player2 = 0;
    let lastChip;
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
  const chips = chipRows.perpChips();
  for(let i = 0; i <= 8; i++){
    let player1 = 0;
    let player2 = 0;
    let lastChip;
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

//This will check to see if yellow or red has one when its called from
//one of the bellow checking functions (vertical(), perp(), and diag())
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


const checkWinner = new CheckWins


function checkWin(player) {
checkWinner.diagRight(player);
checkWinner.diagLeft(player);
checkWinner.verticle();
checkWinner.perp();
}




class AddChip {

constructor(lastChip, e) {
  this.lastChip = lastChip
  this.e = e
}
//this should create a new red or yellow chip and append it to the 
//containerCip div. It also adds a class to the container span 
//that says what color is in the div. 



/* 
I need to updated all of the chips and replace the follwoing: 
yellow === player1
red === player2 

AND replace the chip-yellow && chip-red with colors.color1 && colors.color2

Also, updated CSS to remove the "chip-" portion of the chips-red or chips-yellow for example
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